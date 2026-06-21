import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Landmark,
  Sprout,
  Store,
} from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCases } from "@/lib/data";

const iconMap = {
  "farmer-support": Sprout,
  "cash-transfers": Landmark,
  "health-access": HeartPulse,
  "education-credentials": GraduationCap,
  "msme-trade": Store,
};

export default function UseCasesPage() {
  return (
    <PageShell
      eyebrow="Use cases"
      title="Use cases turn DPI into something a ministry can build"
      summary="These are not random features. They are common public-service patterns where identity, payments, registries, data exchange, and safeguards need to work together."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Where they come from",
            body: "AA4DPI programme materials, DPI service-catalogue themes, and recurring country priorities such as agriculture, social protection, health, education, and trade.",
          },
          {
            title: "What each use case does",
            body: "Each one starts with a real delivery problem, then maps the systems, DPGs, integrations, standards, and safeguards needed to make it work.",
          },
          {
            title: "How to use them",
            body: "Choose a use case in the Stack Builder to generate a starter kit for a country, including local rails to verify and code to evaluate.",
          },
        ].map((item) => (
          <Card key={item.title} className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription className="leading-6">{item.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <div className="grid gap-4">
        {useCases.map((useCase) => (
          <Card key={useCase.id} className="rounded-lg">
            <CardHeader>
              <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
                {(() => {
                  const Icon =
                    iconMap[useCase.id as keyof typeof iconMap] ?? Landmark;
                  return <Icon className="size-4" />;
                })()}
              </div>
              <div className="flex flex-wrap gap-2">
                {useCase.layers.slice(0, 5).map((layer) => (
                  <Badge key={layer} variant="secondary">
                    {layer}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-2xl">{useCase.name}</CardTitle>
              <CardDescription className="max-w-3xl text-base leading-7">
                {useCase.problem}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-[1fr_auto]">
              <p className="text-sm leading-6 text-muted-foreground">
                <span className="font-medium text-foreground">Outcome: </span>
                {useCase.outcome}
              </p>
              <Link
                href={`/builder?useCase=${useCase.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Build this stack
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
