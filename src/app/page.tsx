import Link from "next/link";
import { ArrowRight, DatabaseZap, GitBranch, ShieldCheck } from "lucide-react";

import { PageShell } from "@/components/page-shell";
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
    title: "Catalogue what exists",
    body: "Start from real DPGs and open standards, not blank diagrams.",
  },
  {
    title: "Assemble by use case",
    body: "Show how identity, payments, registries, data exchange, and safeguards work together.",
  },
  {
    title: "Make gaps visible",
    body: "Surface the readiness, financing, governance, and implementation work needed before scale.",
  },
];

export default function Home() {
  return (
    <PageShell
      eyebrow="Open prototype"
      title="Build safer DPI with open tools"
      summary="AA4DPI Stack Builder is a public working prototype for turning Digital Public Goods, standards, safeguards, and country context into practical DPI reference stacks for Africa."
    >
      <section className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
        <Card className="rounded-lg">
          <CardHeader>
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

        <Card className="rounded-lg border-primary/30 bg-accent/40">
          <CardHeader>
            <CardTitle className="text-xl">Showable this week</CardTitle>
            <CardDescription className="text-sm leading-6">
              A real open-source repo with working code, structured data, and a
              frontend that explains the concept without claiming to be national
              infrastructure.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step.title} className="rounded-lg">
            <CardHeader>
              <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-muted-foreground">
                {index + 1}
              </div>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription className="leading-6">{step.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

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
