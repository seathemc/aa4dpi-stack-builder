"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UserRound } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cohortCountries } from "@/lib/data";

type NavItem = {
  title: string;
  url: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "Start here",
    items: [
      { title: "README First", url: "/" },
      { title: "How AA4DPI Helps", url: "/how-aa4dpi-helps" },
    ],
  },
  {
    title: "Understand DPI",
    items: [
      { title: "What is DPI", url: "/what-this-builds" },
      { title: "Building Blocks", url: "/building-blocks" },
      { title: "Principles", url: "/principles" },
    ],
  },
  {
    title: "DPG Stack Builder",
    items: [
      { title: "DPG Catalogue", url: "/catalogue" },
      { title: "Stack Builder", url: "/builder" },
    ],
  },
  {
    title: "Use cases",
    items: [{ title: "All Use Cases", url: "/use-cases" }],
  },
  {
    title: "Data Exchange Sandbox",
    items: [
      { title: "Data Exchange", url: "/data-exchange" },
      { title: "API Playground", url: "/data-exchange/api" },
      { title: "Audit & Safeguards", url: "/data-exchange/audit" },
    ],
  },
  {
    title: "Standards",
    items: [
      { title: "Interoperability", url: "/standards" },
      { title: "Security & Privacy", url: "/security-privacy" },
    ],
  },
  {
    title: "Country Readiness",
    items: [
      { title: "Country Overview", url: "/countries" },
      ...cohortCountries.map((country) => ({
        title: `${country.flag} ${country.name}`,
        url: `/countries/${country.id}`,
      })),
    ],
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    if (url === "/builder") {
      return pathname === "/builder" || pathname.startsWith("/builder/");
    }
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="gap-2">
              <Link href="/">
                <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-primary-foreground">
                  AA
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-sm font-semibold">AA4DPI</span>
                  <span className="text-[10px] text-muted-foreground">
                    Digital Public Infrastructure
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {navGroups.map((group) => (
          <SidebarGroup key={group.title} className="py-2">
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className="h-7 rounded-md text-xs"
                    >
                      <Link href={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <Link
          href="/builder"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-xs font-medium shadow-sm hover:bg-secondary"
        >
          <UserRound className="size-3.5" />
          Request Access / Join
        </Link>
        <div className="sr-only">
          <Menu />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
