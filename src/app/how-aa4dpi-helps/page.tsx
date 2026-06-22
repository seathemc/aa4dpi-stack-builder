import Link from "next/link";
import { ArrowRight, ClipboardList, Network, Route, UsersRound } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const levels = [
  {
    title: "Country",
    body: "Work with government and UNDP Country Offices to choose a priority use case, map the systems already in place, and design an implementation path.",
    icon: ClipboardList,
  },
  {
    title: "Regional",
    body: "Compare patterns across peer countries so teams can reuse lessons, standards, suppliers, open tools, and operating models.",
    icon: Network,
  },
  {
    title: "Continental",
    body: "Build shared assets for Africa: service catalogues, reference architectures, reusable code, standards, and evidence.",
    icon: UsersRound,
  },
];

const pathways = [
  {
    title: "Accelerator track",
    body: "For countries ready to move quickly on a defined use case, with named owners and a near-term implementation window.",
  },
  {
    title: "Demand-driven support",
    body: "For countries and partners still shaping the use case, mapping existing systems, or preparing a future cohort.",
  },
];

const services = [
  "DPI readiness and use-case assessment",
  "Reference architecture and open DPG review",
  "Standards, safeguards, and interoperability checks",
  "Country implementation roadmap",
  "Partner and financing alignment",
  "Reusable documentation and open-source assets",
];

export default function HowAa4dpiHelpsPage() {
  return (
    <PageShell
      eyebrow="AA4DPI"
      title="How AA4DPI helps countries move from interest to implementation"
      summary="AA4DPI turns a development priority into a clearer digital public infrastructure plan: what problem to solve, what systems to connect, what open tools to evaluate, and what safeguards to put in place."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {levels.map((level) => (
          <Card key={level.title} className="rounded-lg">
            <CardHeader>
              <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
                <level.icon className="size-4" />
              </div>
              <CardTitle>{level.title}</CardTitle>
              <CardDescription className="leading-6">{level.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <Badge variant="secondary" className="w-fit rounded-md">
              Two pathways
            </Badge>
            <CardTitle>Not every country starts in the same place</CardTitle>
            <CardDescription className="leading-6">
              The programme can support countries with a mature priority and
              countries still defining the right entry point.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {pathways.map((pathway) => (
              <div key={pathway.title} className="rounded-lg border p-4">
                <div className="font-semibold">{pathway.title}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {pathway.body}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <Badge variant="secondary" className="w-fit rounded-md">
              Services
            </Badge>
            <CardTitle>What AA4DPI can produce</CardTitle>
            <CardDescription className="leading-6">
              The work should end with practical artifacts a ministry, Country
              Office, delivery partner, or technical team can use.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Route className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{service}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border bg-secondary/60 p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Request support or join the ecosystem</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Share country demand, programme priorities, or partner interest so
              AA4DPI can route the request to the right next step.
            </p>
          </div>
          <Button asChild className="w-full text-xs sm:w-auto">
            <Link href="/builder">
              Start with the Stack Builder
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
