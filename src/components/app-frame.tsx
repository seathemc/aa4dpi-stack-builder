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
  catalogue: "DPG catalogue",
  builder: "Stack Builder",
  "data-exchange": "Data Exchange Sandbox",
  standards: "Standards and safeguards",
  countries: "Country readiness",
};

function BreadcrumbLabel() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const current = parts.length ? parts[parts.length - 1] : "Home";
  const label = labels[current] ?? current.replaceAll("-", " ");

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Home</span>
      {parts.length ? (
        <>
          <span>/</span>
          <span className="capitalize text-foreground">{label}</span>
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
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <BreadcrumbLabel />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
