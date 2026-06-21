import { ExternalLink } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dpgs } from "@/lib/data";

export default function CataloguePage() {
  return (
    <PageShell
      eyebrow="Open DPG catalogue"
      title="Real tools, mapped to DPI layers"
      summary="The catalogue starts with actual open-source repositories. The point is not to recommend one tool everywhere, but to show what exists and where it may fit."
    >
      <div className="grid gap-4">
        {dpgs.map((dpg) => (
          <Card key={dpg.id} className="rounded-lg">
            <CardHeader className="gap-3 md:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-xl">{dpg.name}</CardTitle>
                  <Badge variant="secondary">{dpg.layer}</Badge>
                  <Badge variant="outline">{dpg.maturity}</Badge>
                </div>
                <CardDescription className="max-w-3xl text-base leading-7">
                  {dpg.description}
                </CardDescription>
              </div>
              <a
                href={dpg.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                GitHub
                <ExternalLink className="size-4" />
              </a>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-semibold">Use-case fit</h3>
                <div className="flex flex-wrap gap-2">
                  {dpg.fit.map((fit) => (
                    <Badge key={fit} variant="secondary">
                      {fit}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Standards or patterns</h3>
                <div className="flex flex-wrap gap-2">
                  {dpg.standards.map((standard) => (
                    <Badge key={standard} variant="outline">
                      {standard}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
