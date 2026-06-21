import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";

function CubeVisual() {
  return (
    <div className="relative h-28 w-36">
      <div className="absolute bottom-4 left-7 grid grid-cols-2 gap-1">
        {["bg-sky-200", "bg-sky-500", "bg-blue-700", "bg-sky-300"].map(
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
        <div className="inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-sky-700">
          Welcome
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Build safer DPI with open tools
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          AA4DPI curates, connects, and helps implement open Digital Public
          Infrastructure across Africa.
        </p>
      </section>

      <section className="grid overflow-hidden rounded-lg border bg-background shadow-sm md:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "Open by design",
            body: "Open source, open standards, open governance.",
          },
          {
            icon: UsersRound,
            title: "Built for inclusion",
            body: "Interoperable systems that put people first.",
          },
          {
            icon: BarChart3,
            title: "Proven impact",
            body: "Read implementations that improve lives at scale.",
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

      <section className="grid items-center gap-5 rounded-lg border bg-sky-50/60 p-5 shadow-sm md:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Design and deploy your DPI stack</h2>
          <p className="max-w-lg text-sm leading-6 text-muted-foreground">
            Use the Stack Builder to assemble the right open tools for your
            country priority and maturity stage.
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
        Trusted by governments, UN agencies, and partners across Africa.
      </p>
    </main>
  );
}
