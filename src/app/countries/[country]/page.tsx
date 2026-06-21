import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { ProgressBar } from "@/components/progress-bar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { countries } from "@/lib/data";

export function generateStaticParams() {
  return countries.map((country) => ({ country: country.id }));
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: countryId } = await params;
  const country = countries.find((item) => item.id === countryId);

  if (!country) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="Country readiness"
      title={`${country.name} DPI readiness`}
      summary={country.summary}
    >
      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              <Badge>{country.region}</Badge>
              <Badge variant="secondary">{country.maturity}</Badge>
            </div>
            <CardTitle>Readiness signals</CardTitle>
            <CardDescription>
              These prototype metrics show how a country page can combine DPI
              and development delivery indicators.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {country.metrics.map((metric) => (
              <ProgressBar
                key={metric.label}
                label={metric.label}
                value={metric.value}
                note={metric.note}
              />
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
              <CardDescription>
                {country.strengths.join(", ")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Gaps to validate</CardTitle>
              <CardDescription>{country.gaps.join(", ")}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
