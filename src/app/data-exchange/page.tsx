import { PageShell } from "@/components/page-shell";
import { SandboxClient } from "@/components/sandbox-client";
import { DataExchangeDiagram } from "@/components/storyboard-panels";

export default function DataExchangePage() {
  return (
    <PageShell
      eyebrow="Phase 3 sandbox"
      title="Show how data exchange works in code"
      summary="The sandbox demonstrates a narrow, safe exchange: one approved system asks another system for a verified answer, with purpose, minimization, safeguards, and audit visible."
    >
      <DataExchangeDiagram />
      <SandboxClient />
    </PageShell>
  );
}
