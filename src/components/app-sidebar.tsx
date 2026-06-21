"use client";

import * as React from "react";
import {
  BookOpen,
  Boxes,
  ChevronRight,
  DatabaseZap,
  FileCode2,
  GitBranch,
  Globe2,
  Home,
  Layers3,
  Map,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type Icon = React.ComponentType<{ className?: string }>;

type NavItem = {
  title: string;
  url: string;
  icon: Icon;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const topItems: NavItem[] = [
  { title: "Start here", url: "/", icon: Home },
  { title: "DPG catalogue", url: "/catalogue", icon: Boxes },
  { title: "Stack Builder", url: "/builder", icon: GitBranch },
];

const navGroups: NavGroup[] = [
  {
    title: "Understand DPI",
    items: [
      { title: "What this builds", url: "/what-this-builds", icon: Layers3 },
      { title: "Use cases", url: "/use-cases", icon: Map },
      { title: "Standards and safeguards", url: "/standards", icon: ShieldCheck },
    ],
  },
  {
    title: "Phase 3 sandbox",
    items: [
      { title: "Data exchange", url: "/data-exchange", icon: DatabaseZap },
      { title: "API contract", url: "/data-exchange/api", icon: FileCode2 },
      { title: "Audit and consent", url: "/data-exchange/audit", icon: BookOpen },
    ],
  },
  {
    title: "Country readiness",
    items: [
      { title: "Rwanda", url: "/countries/rwanda", icon: Globe2 },
      { title: "Nigeria", url: "/countries/nigeria", icon: Globe2 },
      { title: "Malawi", url: "/countries/malawi", icon: Globe2 },
      { title: "South Africa", url: "/countries/south-africa", icon: Globe2 },
      { title: "Tanzania", url: "/countries/tanzania", icon: Globe2 },
    ],
  },
];

function SidebarNavGroup({
  group,
  isActive,
}: {
  group: NavGroup;
  isActive: (url: string) => boolean;
}) {
  const active = group.items.some((item) => isActive(item.url));
  const [open, setOpen] = React.useState(active);

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span>{group.title}</span>
          <ChevronRight
            className={`transition-transform ${open ? "rotate-90" : ""}`}
          />
        </button>
      </SidebarGroupLabel>
      {open ? (
        <SidebarGroupContent>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      ) : null}
    </SidebarGroup>
  );
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                  AA
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">AA4DPI</span>
                  <span className="text-xs text-muted-foreground">
                    Stack Builder
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {navGroups.map((group) => (
          <SidebarNavGroup key={group.title} group={group} isActive={isActive} />
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
