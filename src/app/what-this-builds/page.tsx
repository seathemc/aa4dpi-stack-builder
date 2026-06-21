import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const points = [
  {
    title: "A planning tool",
    body: "It helps teams discuss the systems, open-source tools, standards, safeguards, and investment gaps behind a DPI use case.",
  },
  {
    title: "A shared language layer",
    body: "It translates open-source and DPI architecture into language that policy, programme, finance, and technical teams can use together.",
  },
  {
    title: "A path to real implementation",
    body: "It identifies which parts can use existing DPGs, which parts need national systems, and which safeguards must be designed before scale.",
  },
];

export default function WhatThisBuildsPage() {
  return (
    <PageShell
      eyebrow="Plain language"
      title="This is not a national platform"
      summary="The Stack Builder is a public prototype that helps countries and partners understand what they may need to build, buy, adapt, govern, or finance."
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
          What digital public infrastructure means here
        </h2>
        <p>
          DPI is the set of shared digital systems that lets people, businesses,
          and public institutions interact safely at scale. In practice, this
          can include identity, civil registration, payments, registries, data
          exchange, credentials, consent, grievance channels, and audit logs.
        </p>
        <p>
          The important question is not whether a country has a single product.
          The question is whether the systems behind public services can work
          together in a trusted, inclusive, and accountable way.
        </p>
      </section>
    </PageShell>
  );
}
