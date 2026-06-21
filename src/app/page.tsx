import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";

function CubeVisual() {
  return (
    <div className="relative h-28 w-36">
      <div className="absolute bottom-4 left-7 grid grid-cols-2 gap-1">
        {["bg-secondary", "bg-primary/75", "bg-primary", "bg-accent"].map(
          (color, index) => (
            <div
              key={`${color}-${index}`}
              className={`h-10 w-10 rotate-45 rounded-sm border border-white/80 ${color} shadow-sm`}
            />
          )
        )}
      </div>
      <div className="absolute right-2 top-4 h-12 w-12 rotate-45 rounded-sm border bg-white/70 shadow-sm" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <section className="max-w-2xl space-y-4">
        <div className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
          README first
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          DPI connects public investment to real services
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          A country can fund a clinic, subsidy, transfer, or permit and still
          miss the person who needs it. Digital Public Infrastructure helps the
          systems behind that service find the right person, verify the right
          record, route the right payment, and leave an accountable trail.
        </p>
      </section>

      <section className="grid overflow-hidden rounded-lg border bg-background shadow-sm md:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "Trusted systems",
            body: "Identity, registries, data exchange, payments, and audit logs that can work together.",
          },
          {
            icon: UsersRound,
            title: "People-first delivery",
            body: "Services that still work for rural users, offline users, excluded groups, and people who need redress.",
          },
          {
            icon: BarChart3,
            title: "Investment-ready plans",
            body: "Use cases, standards, safeguards, and systems that can be financed and implemented.",
          },
        ].map((item) => (
          <div key={item.title} className="border-b p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
            <item.icon className="mb-6 size-5 text-primary" />
            <h2 className="text-sm font-semibold">{item.title}</h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {item.body}
            </p>
          </div>
        ))}
      </section>

      <section className="grid items-center gap-5 rounded-lg border bg-secondary/60 p-5 shadow-sm md:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            Turn a use case into a DPI starter kit
          </h2>
          <p className="max-w-lg text-sm leading-6 text-muted-foreground">
            Choose a country and a service problem. The Stack Builder suggests
            open tools to evaluate, local systems to connect, safeguards to
            check, and first artifacts a technical team can review.
          </p>
          <Button asChild className="h-9 text-xs">
            <Link href="/builder">
              Open the Stack Builder
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
        <CubeVisual />
      </section>

      <p className="text-xs text-muted-foreground">
        AA4DPI supports country-owned DPI work across readiness, technical
        design, safeguards, financing, and implementation.
      </p>
    </main>
  );
}
