"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BookOpen,
  Boxes,
  CircleHelp,
  Clock3,
  FileCheck2,
  Flag,
  Handshake,
  Home,
  Layers3,
  Lightbulb,
  MapPinned,
  Scale,
  ShieldCheck,
  Table2,
  UserRound,
} from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { RequestFormDialog } from "@/components/request-form-dialog";
import { cohortCountries, upcomingCountries } from "@/lib/data";

type NavItem = {
  title: string;
  url?: string;
  disabled?: boolean;
  badge?: string;
  icon?: React.ElementType;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "Start",
    items: [
      { title: "Request support", url: "/request-support", icon: Handshake },
      { title: "Read me first", url: "/", icon: Home },
      { title: "Why now", url: "/why-now", icon: Clock3 },
      { title: "What is DPI?", url: "/what-this-builds", icon: CircleHelp },
      { title: "The 5Cs", url: "/five-cs", icon: Layers3 },
      { title: "How AA4DPI works", url: "/how-aa4dpi-helps", icon: Handshake },
      { title: "Use cases", url: "/use-cases", icon: Lightbulb },
      { title: "Principles", url: "/principles", icon: Scale },
    ],
  },
  {
    title: "Countries",
    items: [
      { title: "Overview", url: "/countries", icon: MapPinned },
      ...cohortCountries.map((country) => ({
        title: `${country.flag} ${country.name}`,
        url: `/countries/${country.id}`,
        badge: "C1",
        icon: Flag,
      })),
      ...upcomingCountries.map((country) => ({
        title: `${country.flag} ${country.name}`,
        disabled: true,
        badge: "C2",
        icon: Flag,
      })),
    ],
  },
  {
    title: "Build + Open DPGs",
    items: [
      { title: "Open DPGs", url: "/catalogue?tab=open", icon: Boxes },
      { title: "African DPGs", url: "/catalogue?tab=african", icon: Table2 },
      { title: "Stack Builder", url: "/builder", icon: BookOpen },
      { title: "Standards", url: "/standards", icon: FileCheck2 },
      { title: "Security and privacy", url: "/security-privacy", icon: ShieldCheck },
    ],
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    if (url === "/countries") return pathname === "/countries";
    if (url === "/builder") {
      return pathname === "/builder" || pathname.startsWith("/builder/");
    }
    const cleanUrl = url.split("?")[0];
    const queryTab = url.includes("?tab=") ? url.split("?tab=")[1] : null;
    if (queryTab) {
      const currentTab = searchParams.get("tab") ?? "open";
      return pathname === cleanUrl && currentTab === queryTab;
    }
    return pathname === cleanUrl || pathname.startsWith(`${cleanUrl}/`);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="AA4DPI" className="gap-2">
              <Link href="/">
                <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-primary text-[10px] font-semibold text-white">
                  AA
                </div>
                <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-semibold">AA4DPI</span>
                  <span className="text-[10px] text-muted-foreground">
                    Digital Public Infrastructure
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <RequestFormDialog defaultType="country">
          <Button
            size="sm"
            className="mt-2 h-8 w-full text-xs group-data-[collapsible=icon]:hidden"
          >
            Request support
          </Button>
        </RequestFormDialog>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-2 py-2">
        <Accordion
          type="multiple"
          defaultValue={navGroups.map((group) => group.title)}
          className="grid gap-1"
        >
          {navGroups.map((group) => (
            <AccordionItem key={group.title} value={group.title} className="border-0">
              <AccordionTrigger className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:bg-sidebar-accent group-data-[collapsible=icon]:hidden">
                {group.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2 group-data-[collapsible=icon]:pb-0">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon ?? BookOpen;

                      return (
                        <SidebarMenuItem key={item.title}>
                          {item.disabled ? (
                            <SidebarMenuButton
                              disabled
                              tooltip={`${item.title} - coming soon`}
                              className="h-7 rounded-md text-xs opacity-70"
                            >
                              <Icon className="size-3.5" />
                              <span className="truncate">{item.title}</span>
                              {item.badge ? (
                                <Badge
                                  variant="secondary"
                                  className="ml-auto h-4 rounded px-1 text-[9px] group-data-[collapsible=icon]:hidden"
                                >
                                  {item.badge}
                                </Badge>
                              ) : null}
                            </SidebarMenuButton>
                          ) : (
                            <SidebarMenuButton
                              asChild
                              tooltip={item.title}
                              isActive={item.url ? isActive(item.url) : false}
                              className="h-7 rounded-md text-xs"
                            >
                              <Link href={item.url ?? "/"}>
                                <Icon className="size-3.5" />
                                <span>{item.title}</span>
                                {item.badge ? (
                                  <Badge
                                    variant="secondary"
                                    className="ml-auto h-4 rounded px-1 text-[9px] group-data-[collapsible=icon]:hidden"
                                  >
                                    {item.badge}
                                  </Badge>
                                ) : null}
                              </Link>
                            </SidebarMenuButton>
                          )}
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Open Stack Builder">
              <Link href="/builder">
                <UserRound className="size-3.5" />
                <span>Open Stack Builder</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
