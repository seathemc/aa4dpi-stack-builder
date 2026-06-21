import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function UseCasesPage() {
  return (
    <PageShell
      eyebrow="Use cases"
      title="DPI becomes real through public services"
      summary="The catalogue matters only when it helps solve a delivery problem. These use cases show how DPGs and standards can combine into practical service journeys."
    >
      <div className="grid gap-4">
        {useCases.map((useCase) => (
          <Card key={useCase.id} className="rounded-lg">
            <CardHeader>
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
