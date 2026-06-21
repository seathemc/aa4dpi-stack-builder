import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
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
  "procurement-payments": ClipboardCheck,
};

const countryExamples = {
  "farmer-support":
    "Sierra Leone's Feed Salone, Ethiopia's agriculture services, and Zambia's land-and-forest work show how farmer records, payments, permits, and advisory services can connect.",
  "cash-transfers":
    "Ethiopia's MESOB wallet roadmap shows how social protection can move from fragmented payout channels toward a verifiable G2P flow.",
  "health-access":
    "Zambia's Smart Care Pro, DHIS2, and eLMIS stack shows why patient records, supply chains, and reporting need to interoperate.",
  "education-credentials":
    "Ethiopia's youth jobs pathway shows how skills records, labor-market data, identity, and finance can become one service flow.",
  "msme-trade":
    "AfCFTA-related trade and Zambia's timber traceability work both need business identity, payment rails, credentials, and provenance data to travel across markets.",
  "procurement-payments":
    "Sierra Leone's CRVS, eGP, IFMIS, and T24 flow shows how procurement, treasury, and settlement can become visible end to end.",
};

export default function UseCasesPage() {
  return (
    <PageShell
      eyebrow="Use cases"
      title="Use cases show what DPI is for"
      summary="DPI only matters when it makes a public service easier, faster, fairer, or more trustworthy. These use cases connect the development problem to the systems that need to work together."
    >
      <section className="rounded-lg border bg-background p-5 shadow-sm">
        <h2 className="text-lg font-semibold">How to read a use case</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Start with the service problem. Then identify the identity check,
          registry, payment route, data exchange, grievance path, and safeguards
          required to make the service work in practice.
        </p>
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
              <div className="space-y-3">
                <p className="text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">Outcome: </span>
                  {useCase.outcome}
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Country signal:{" "}
                  </span>
                  {
                    countryExamples[
                      useCase.id as keyof typeof countryExamples
                    ]
                  }
                </p>
              </div>
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
