"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UserRound } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cohortCountries, upcomingCountries } from "@/lib/data";

type NavItem = {
  title: string;
  url?: string;
  disabled?: boolean;
  badge?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "Start",
    items: [
      { title: "Read me first", url: "/" },
      { title: "Why now", url: "/why-now" },
      { title: "What is DPI?", url: "/what-this-builds" },
      { title: "The 5Cs", url: "/five-cs" },
      { title: "How AA4DPI works", url: "/how-aa4dpi-helps" },
      { title: "Use cases", url: "/use-cases" },
      { title: "Principles", url: "/principles" },
    ],
  },
  {
    title: "Countries",
    items: [
      { title: "Overview", url: "/countries" },
      ...cohortCountries.map((country) => ({
        title: `${country.flag} ${country.name}`,
        url: `/countries/${country.id}`,
      })),
      ...upcomingCountries.map((country) => ({
        title: `${country.flag} ${country.name}`,
        disabled: true,
        badge: "Soon",
      })),
    ],
  },
  {
    title: "Build + Open DPGs",
    items: [
      { title: "Open DPGs", url: "/catalogue?tab=open" },
      { title: "African DPGs", url: "/catalogue?tab=african" },
      { title: "Stack Builder", url: "/builder" },
      { title: "Data sandbox", url: "/data-exchange" },
      { title: "API playground", url: "/data-exchange/api" },
      { title: "Audit and safeguards", url: "/data-exchange/audit" },
      { title: "Standards", url: "/standards" },
      { title: "Security and privacy", url: "/security-privacy" },
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
    const cleanUrl = url.split("?")[0];
    const queryTab = url.includes("?tab=") ? url.split("?tab=")[1] : null;
    if (queryTab) {
      return pathname === cleanUrl && queryTab === "open";
    }
    return pathname === cleanUrl || pathname.startsWith(`${cleanUrl}/`);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="gap-2">
              <Link href="/">
                <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-white">
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
        <Link
          href="/how-aa4dpi-helps"
          className="mt-2 inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-semibold text-white shadow-sm hover:bg-primary/95"
        >
          Request support
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-2 py-2">
        <Accordion
          type="multiple"
          defaultValue={navGroups.map((group) => group.title)}
          className="grid gap-1"
        >
          {navGroups.map((group) => (
            <AccordionItem key={group.title} value={group.title} className="border-0">
              <AccordionTrigger className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:bg-sidebar-accent">
                {group.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        {item.disabled ? (
                          <SidebarMenuButton
                            disabled
                            className="h-7 rounded-md text-xs opacity-70"
                          >
                            <span className="truncate">{item.title}</span>
                            {item.badge ? (
                              <Badge
                                variant="secondary"
                                className="ml-auto h-4 rounded px-1 text-[9px]"
                              >
                                {item.badge}
                              </Badge>
                            ) : null}
                          </SidebarMenuButton>
                        ) : (
                          <SidebarMenuButton
                            asChild
                            isActive={item.url ? isActive(item.url) : false}
                            className="h-7 rounded-md text-xs"
                          >
                            <Link href={item.url ?? "/"}>
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <Link
          href="/builder"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-xs font-medium shadow-sm hover:bg-secondary"
        >
          <UserRound className="size-3.5" />
          Open Stack Builder
        </Link>
        <div className="sr-only">
          <Menu />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
