import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const requestExample = {
  requestId: "REQ-2026-00042",
  requester: "Social Registry",
  provider: "Civil Registry",
  purpose: "Child benefit eligibility verification",
  subjectId: "RWA-DEMO-1048",
  fields: ["birthRegistrationStatus", "dateOfBirth", "guardianLink"],
};

export default function ApiContractPage() {
  return (
    <PageShell
      eyebrow="API contract"
      title="A narrow endpoint is easier to govern"
      summary="The sandbox keeps the first API deliberately small. It verifies a specific fact for a specific purpose and returns an auditable response."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>POST /api/sandbox/verify-registration</CardTitle>
            <CardDescription>
              Submit a data exchange request with purpose and requested fields.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-lg bg-secondary p-4 text-sm leading-6">
              {JSON.stringify(requestExample, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>GET /api/sandbox/openapi</CardTitle>
            <CardDescription>
              Export the machine-readable OpenAPI-style contract for the demo
              endpoint.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href="/api/sandbox/openapi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-md border px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              View OpenAPI JSON
            </a>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
