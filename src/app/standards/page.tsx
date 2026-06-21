import { ExternalLink } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { standards } from "@/lib/data";

export default function StandardsPage() {
  return (
    <PageShell
      eyebrow="Standards and safeguards"
      title="Open tools need clear rules"
      summary="The safest DPI choices are not only about software. They depend on open standards, governance, privacy, inclusion, auditability, and redress."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {standards.map((standard) => (
          <a
            key={standard.id}
            href={standard.link}
            target="_blank"
            rel="noreferrer"
          >
            <Card className="h-full rounded-lg hover:bg-secondary/40">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="secondary">{standard.domain}</Badge>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </div>
                <CardTitle>{standard.name}</CardTitle>
                <CardDescription className="leading-6">
                  {standard.why}
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
