import Link from "next/link";
import { ArrowRight, DatabaseZap, GitBranch, ShieldCheck } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { WorkflowStrip } from "@/components/storyboard-panels";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    title: "Open DPG catalogue",
    body: "Real repositories grouped by identity, payments, data exchange, registries, health, and delivery.",
  },
  {
    title: "Stack Builder",
    body: "Select a country and use case, then generate the DPI layers, standards, and gaps.",
  },
  {
    title: "Data Exchange Sandbox",
    body: "Run a narrow verified exchange and inspect the API contract, response, and audit record.",
  },
];

export default function Home() {
  return (
    <PageShell
      eyebrow="Open prototype"
      title="Build safer DPI with open tools"
      summary="AA4DPI Stack Builder is a public working prototype for turning Digital Public Goods, standards, safeguards, and country context into practical DPI reference stacks for Africa."
    >
      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-lg border-primary/20">
          <CardHeader>
            <div className="mb-2 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              AA4DPI docs home
            </div>
            <CardTitle className="text-2xl">What this helps answer</CardTitle>
            <CardDescription className="text-base leading-7">
              If a country wants to improve farmer support, social protection,
              health access, education credentials, or MSME trade, what systems
              need to connect, what DPGs already exist, what standards matter,
              and what safeguards should be designed from the start?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/builder">
                Open the Stack Builder
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/catalogue">Browse DPG catalogue</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg bg-secondary/35">
          <CardHeader>
            <CardTitle className="text-xl">Demo route</CardTitle>
            <CardDescription className="text-sm leading-6">
              The story is intentionally simple: explain the ecosystem, assemble
              a stack, then prove one narrow data exchange in code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="rounded-md border bg-background px-3 py-2">
                1. Browse tools and standards
              </div>
              <div className="rounded-md border bg-background px-3 py-2">
                2. Generate a country/use-case stack
              </div>
              <div className="rounded-md border bg-background px-3 py-2">
                3. Run a data exchange sandbox request
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <WorkflowStrip items={steps} />

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-lg">
          <CardHeader>
            <GitBranch className="size-5 text-primary" />
            <CardTitle>Phase 2.5</CardTitle>
            <CardDescription>
              A working Stack Builder that maps countries and use cases to DPGs,
              standards, safeguards, and implementation steps.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <DatabaseZap className="size-5 text-primary" />
            <CardTitle>Phase 3</CardTitle>
            <CardDescription>
              A data exchange sandbox that demonstrates API contracts, verified
              responses, consent checks, and audit logs.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <ShieldCheck className="size-5 text-primary" />
            <CardTitle>Why it matters</CardTitle>
            <CardDescription>
              Safeguards, inclusion, and trust are shown as design constraints,
              not as policy language added after technical choices are made.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </PageShell>
  );
}
