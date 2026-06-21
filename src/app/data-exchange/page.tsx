import { DatabaseZap } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { SandboxClient } from "@/components/sandbox-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DataExchangePage() {
  return (
    <PageShell
      eyebrow="Phase 3 sandbox"
      title="Show how data exchange works in code"
      summary="The sandbox demonstrates a narrow, safe exchange: one approved system asks another system for a verified answer, with purpose, minimization, safeguards, and audit visible."
    >
      <section className="grid gap-4 md:grid-cols-4">
        {["Requester", "Permission check", "Provider", "Audit log"].map(
          (item, index) => (
            <Card key={item} className="rounded-lg">
              <CardHeader>
                <DatabaseZap className="size-5 text-primary" />
                <CardTitle className="text-base">{item}</CardTitle>
                <CardDescription>Step {index + 1}</CardDescription>
              </CardHeader>
            </Card>
          )
        )}
      </section>
      <SandboxClient />
    </PageShell>
  );
}
