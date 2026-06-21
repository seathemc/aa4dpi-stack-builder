import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { CountryOutputPanel } from "@/components/storyboard-panels";
import { Badge } from "@/components/ui/badge";
import {
  Card,
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
        <CountryOutputPanel country={country} />

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
          <Card className="rounded-lg border-primary/20 bg-accent/25">
            <CardHeader>
              <Badge className="w-fit" variant="secondary">
                Next steps
              </Badge>
              <CardTitle>Export implementation brief</CardTitle>
              <CardDescription>
                The next version should generate a short country brief with
                priority use cases, DPG options, safeguards, and financing gaps.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
