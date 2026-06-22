import { CheckCircle2 } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pillars = [
  {
    name: "Commitment",
    body: "Clear political and institutional ownership so DPI is not treated as a short-term technology pilot.",
    checks: ["ministerial mandate", "named owner", "service priority"],
  },
  {
    name: "Capacity",
    body: "Government teams, delivery partners, and operators who can design, procure, integrate, and maintain the systems.",
    checks: ["delivery team", "technical skills", "operating model"],
  },
  {
    name: "Capital",
    body: "Financing for implementation, recurrent costs, operations, safeguards, and future expansion.",
    checks: ["funding path", "maintenance budget", "partner alignment"],
  },
  {
    name: "Community",
    body: "An ecosystem of users, civil society, private sector, and open-source contributors who can improve and test the work.",
    checks: ["user feedback", "open contribution", "local partners"],
  },
  {
    name: "Collaboration",
    body: "Cross-agency governance so data can move safely and public services can work across institutional boundaries.",
    checks: ["data-sharing rules", "agency onboarding", "joint roadmap"],
  },
];

export default function FiveCsPage() {
  return (
    <PageShell
      eyebrow="The 5Cs"
      title="AA4DPI looks beyond software"
      summary="A country can have strong code and still fail if the mandate, people, financing, community, or cross-agency operating model is weak."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {pillars.map((pillar, index) => (
          <Card key={pillar.name} className="rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="rounded-md">{index + 1}</Badge>
                <CardTitle className="text-xl">{pillar.name}</CardTitle>
              </div>
              <CardDescription className="leading-6">
                {pillar.body}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {pillar.checks.map((check) => (
                <div key={check} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span>{check}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
