import { ArrowRight, Banknote, Cable, Globe2, Landmark } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pressures = [
  {
    title: "Public services are more digital, but still fragmented",
    body: "People may have a digital ID, a mobile wallet, a farmer record, a benefit file, and a health record, but those systems often do not work together.",
    icon: Cable,
  },
  {
    title: "Governments need better value from digital spending",
    body: "One-off portals and pilots are hard to maintain. Shared infrastructure lets new services reuse what already exists.",
    icon: Banknote,
  },
  {
    title: "Regional integration needs interoperable systems",
    body: "Trade, migration, payments, credentials, and climate markets all require trusted exchange across institutions and borders.",
    icon: Globe2,
  },
  {
    title: "Trust has become a design requirement",
    body: "Digital systems must show how data is used, who can access it, how errors are fixed, and how people can seek redress.",
    icon: Landmark,
  },
];

export default function WhyNowPage() {
  return (
    <PageShell
      eyebrow="Why now"
      title="Africa does not need more disconnected digital projects"
      summary="The opportunity is to turn existing systems, open-source tools, and country demand into infrastructure that can support many services at once."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {pressures.map((pressure) => (
          <Card key={pressure.title} className="rounded-lg">
            <CardHeader>
              <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
                <pressure.icon className="size-4" />
              </div>
              <CardTitle className="text-lg">{pressure.title}</CardTitle>
              <CardDescription className="leading-6">
                {pressure.body}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <Badge variant="secondary" className="w-fit rounded-md">
            AA4DPI role
          </Badge>
          <CardTitle>Move from projects to reusable public infrastructure</CardTitle>
          <CardDescription className="max-w-3xl leading-6">
            AA4DPI helps countries identify the use cases that matter, map the
            systems already in place, select open tools where they make sense,
            and define the safeguards needed before implementation.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          {[
            "Find the service problem",
            "Map the systems behind it",
            "Turn the result into an implementable plan",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <ArrowRight className="size-4 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
