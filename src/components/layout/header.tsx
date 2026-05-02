"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  firmName?: string;
  userEmail?: string;
}

export function Header({ firmName, userEmail }: HeaderProps) {
  const initials = firmName
    ? firmName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      <div />
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{firmName}</p>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </div>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
