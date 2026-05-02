import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileCheck,
  Send,
  BarChart3,
  Check,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <FileCheck className="h-6 w-6" />
            <span className="text-lg font-bold">MTD Client Chaser</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button>Start free trial</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Built for UK accountants
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Stop chasing clients
            <br />
            for documents
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            MTD ITSA means 5x more deadlines. Automate the chase with smart
            reminders, magic upload links, and deadline tracking — so you can
            focus on the work that matters.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-base px-8">
                Start free 14-day trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            No credit card required
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">The problem</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            UK accountants spend{" "}
            <span className="font-semibold text-foreground">
              5-10 hours per week
            </span>{" "}
            emailing and calling clients for missing documents. With MTD for
            Income Tax starting April 2026, quarterly reporting means this
            problem just got 5x worse.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                1. Create a checklist
              </h3>
              <p className="text-muted-foreground">
                Use pre-built UK tax templates or create your own. SA100, MTD
                ITSA quarterly, Corporation Tax, VAT — all ready to go.
              </p>
            </div>
            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Send className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                2. Send a magic link
              </h3>
              <p className="text-muted-foreground">
                Your client gets a simple upload page — no login required. They
                can upload from their phone in minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                3. Track progress
              </h3>
              <p className="text-muted-foreground">
                See who&apos;s submitted, who&apos;s overdue, and let automatic
                reminders do the chasing for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            Built for UK accountants
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                title: "Automatic reminders",
                desc: "Email and SMS reminders at 7 days, 3 days, 1 day before deadline — and after if overdue.",
              },
              {
                icon: Zap,
                title: "Magic upload links",
                desc: "No client login needed. One click from email to upload. Works on mobile.",
              },
              {
                icon: FileCheck,
                title: "UK tax templates",
                desc: "Pre-built checklists for SA100, MTD ITSA quarterly, Corporation Tax, VAT, and more.",
              },
              {
                icon: Users,
                title: "CSV import",
                desc: "Import your entire client list from a CSV. Map columns and go.",
              },
              {
                icon: BarChart3,
                title: "Deadline dashboard",
                desc: "See overdue clients at a glance. Never miss a filing deadline.",
              },
              {
                icon: Shield,
                title: "GDPR compliant",
                desc: "Your data stays in the EU. Secure file uploads. Row-level security.",
              },
            ].map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6 flex gap-4">
                  <feature.icon className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4" id="pricing">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            Simple pricing
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Start with a 14-day free trial. No credit card required.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div>
                  <span className="text-3xl font-bold">£29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {[
                    "Up to 50 clients",
                    "100 email reminders/month",
                    "All templates",
                    "Magic link uploads",
                    "Email support",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button variant="outline" className="w-full">
                    Start free trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-md">
              <CardHeader>
                <Badge className="w-fit mb-1">Most Popular</Badge>
                <CardTitle>Pro</CardTitle>
                <div>
                  <span className="text-3xl font-bold">£59</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {[
                    "Unlimited clients",
                    "Unlimited email reminders",
                    "100 SMS reminders/month",
                    "All templates",
                    "Magic link uploads",
                    "Priority support",
                    "Custom branding",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full">Start free trial</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to stop chasing clients?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join UK accountants who save hours every week with automated document
            collection.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8"
            >
              Start your free 14-day trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileCheck className="h-5 w-5" />
            <span className="font-semibold">MTD Client Chaser</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for UK accountants. GDPR compliant. Your data stays in the EU.
          </p>
        </div>
      </footer>
    </div>
  );
}
