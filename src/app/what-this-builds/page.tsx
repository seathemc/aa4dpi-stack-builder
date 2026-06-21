import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const points = [
  {
    title: "Start with the service",
    body: "A subsidy, license, benefit, payment, clinic visit, or permit is the easiest way to explain why DPI matters.",
  },
  {
    title: "Find the systems behind it",
    body: "Most services need identity, registries, payment rails, data exchange, consent, redress, and auditability.",
  },
  {
    title: "Make it fundable",
    body: "AA4DPI turns scattered systems into a clearer plan that can be governed, tested, financed, and implemented.",
  },
];

export default function WhatThisBuildsPage() {
  return (
    <PageShell
      eyebrow="Plain language"
      title="What is digital public infrastructure?"
      summary="Digital Public Infrastructure is the shared digital foundation that lets public services work across agencies, providers, and communities without rebuilding everything from scratch."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {points.map((point) => (
          <Card key={point.title} className="rounded-lg">
            <CardHeader>
              <CardTitle>{point.title}</CardTitle>
              <CardDescription className="leading-6">{point.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <section className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">
          What that means in practice
        </h2>
        <p>
          DPI is not one website and not one vendor product. It is the shared
          infrastructure that lets a person prove who they are, a ministry check
          the right record, a payment reach the right account, and an oversight
          team see what happened.
        </p>
        <p>
          For example, a farmer subsidy may need a farmer registry, an identity
          check, an eligibility rule, a payment rail, a complaint channel, and an
          audit log. DPI is what lets those pieces work together safely.
        </p>
        <p>
          The goal is not to digitize every form. The goal is to make public
          services more reliable, inclusive, transparent, and easier to scale.
        </p>
      </section>
    </PageShell>
  );
}
