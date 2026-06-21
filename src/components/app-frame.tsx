"use client";

import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const labels: Record<string, string> = {
  catalogue: "DPG Catalogue",
  builder: "Stack Builder",
  generated: "Generated Stack",
  "data-exchange": "Data Exchange Sandbox",
  api: "API Playground",
  audit: "Audit & Safeguards",
  standards: "Interoperability",
  countries: "Country Readiness",
  rwanda: "Rwanda",
};

function BreadcrumbLabel() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const current = parts.length ? parts[parts.length - 1] : "Home";
  const label = labels[current] ?? current.replaceAll("-", " ");

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>DPG Stack Builder</span>
      {parts.length ? (
        <>
          <span>›</span>
          <span className="text-foreground">{label}</span>
        </>
      ) : null}
    </div>
  );
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <BreadcrumbLabel />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
