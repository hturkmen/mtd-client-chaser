import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Use service role key for cron jobs (bypasses RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  // Verify cron secret (Vercel Cron)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  // Fetch all active requests with deadlines
  const { data: requests, error } = await supabase
    .from("document_requests")
    .select("*, clients(id, name, email, phone), firms(id, name, email)")
    .in("status", ["pending", "in_progress"])
    .not("deadline", "is", null);

  if (error || !requests) {
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }

  let emailsSent = 0;
  let smsSent = 0;
  let statusUpdated = 0;

  for (const req of requests) {
    const deadline = new Date(req.deadline);
    const daysUntilDeadline = Math.ceil(
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    const lastReminder = req.last_reminder_at
      ? new Date(req.last_reminder_at)
      : null;
    const daysSinceLastReminder = lastReminder
      ? Math.ceil(
          (now.getTime() - lastReminder.getTime()) / (1000 * 60 * 60 * 24)
        )
      : Infinity;

    let shouldSendEmail = false;
    let shouldSendSms = false;
    let isOverdue = false;

    // Deadline logic
    if (daysUntilDeadline < 0) {
      // Overdue
      isOverdue = true;
      if (daysSinceLastReminder >= 3) {
        shouldSendEmail = true;
        shouldSendSms = true;
      }
    } else if (daysUntilDeadline <= 1) {
      // 1 day or less
      shouldSendEmail = true;
      shouldSendSms = true;
    } else if (daysUntilDeadline <= 3 && daysSinceLastReminder >= 3) {
      // 3 days
      shouldSendEmail = true;
    } else if (daysUntilDeadline <= 7 && req.reminder_count === 0) {
      // 7 days, first reminder
      shouldSendEmail = true;
    }

    // Update status to overdue if needed
    if (isOverdue && req.status !== "overdue") {
      await supabase
        .from("document_requests")
        .update({ status: "overdue" })
        .eq("id", req.id);
      statusUpdated++;
    }

    // Send email reminder
    if (shouldSendEmail && req.clients?.email) {
      try {
        // In production, use Resend API here
        // await sendReminderEmail(req, isOverdue);

        await supabase.from("reminder_logs").insert({
          request_id: req.id,
          client_id: req.clients.id,
          channel: "email",
          status: "sent",
          message_preview: isOverdue
            ? `OVERDUE: Documents needed for ${req.title}`
            : `Reminder: Documents needed for ${req.title}`,
        });

        emailsSent++;
      } catch (e) {
        console.error("Failed to send email:", e);
      }
    }

    // Send SMS for overdue or urgent
    if (shouldSendSms && req.clients?.phone) {
      try {
        // In production, use Twilio API here
        // await sendReminderSms(req, isOverdue);

        await supabase.from("reminder_logs").insert({
          request_id: req.id,
          client_id: req.clients.id,
          channel: "sms",
          status: "sent",
          message_preview: `Reminder: Please upload documents for ${req.title}`,
        });

        smsSent++;
      } catch (e) {
        console.error("Failed to send SMS:", e);
      }
    }

    // Update reminder count
    if (shouldSendEmail || shouldSendSms) {
      await supabase
        .from("document_requests")
        .update({
          reminder_count: (req.reminder_count || 0) + 1,
          last_reminder_at: now.toISOString(),
        })
        .eq("id", req.id);

      // Activity log
      await supabase.from("activity_logs").insert({
        firm_id: req.firms?.id,
        client_id: req.clients?.id,
        request_id: req.id,
        action: "reminder_sent",
        details: {
          channels: [
            ...(shouldSendEmail ? ["email"] : []),
            ...(shouldSendSms ? ["sms"] : []),
          ],
          is_overdue: isOverdue,
        },
      });
    }
  }

  return NextResponse.json({
    success: true,
    processed: requests.length,
    emailsSent,
    smsSent,
    statusUpdated,
    timestamp: now.toISOString(),
  });
}
