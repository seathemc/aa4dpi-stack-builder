"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { countries } from "@/lib/data";

const labels: Record<string, string> = {
  catalogue: "DPG Catalogue",
  builder: "Stack Builder",
  generated: "Generated Stack",
  "data-exchange": "Data Exchange Sandbox",
  api: "API Playground",
  audit: "Audit & Safeguards",
  standards: "Interoperability",
  countries: "Country Readiness",
  "why-now": "Why Now",
  "five-cs": "The 5Cs",
  "how-aa4dpi-helps": "How AA4DPI Works",
  "what-this-builds": "What Is DPI",
  "use-cases": "Use Cases",
  principles: "Principles",
  "security-privacy": "Security & Privacy",
};

function BreadcrumbLabel() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const current = parts.length ? parts[parts.length - 1] : "Home";
  const country = countries.find((item) => item.id === current);
  const label =
    country?.name ??
    labels[current] ??
    current
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  return (
    <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
      <span className="hidden shrink-0 sm:inline">AA4DPI</span>
      {parts.length ? (
        <>
          <span className="hidden sm:inline">›</span>
          <span className="truncate text-foreground">{label}</span>
        </>
      ) : (
        <span className="truncate text-foreground sm:hidden">Home</span>
      )}
    </div>
  );
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Suspense fallback={null}>
        <AppSidebar />
      </Suspense>
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-2 border-b bg-background/95 px-3 backdrop-blur sm:gap-3 sm:px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-1 h-4 sm:mr-2" />
          <BreadcrumbLabel />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
