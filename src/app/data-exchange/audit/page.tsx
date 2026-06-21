import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const rows = [
  {
    time: "10:04:12",
    requester: "Social Registry",
    purpose: "Child benefit eligibility",
    fields: "3 fields",
    status: "shared",
  },
  {
    time: "10:05:31",
    requester: "Farmer Registry",
    purpose: "Input subsidy delivery",
    fields: "identity status only",
    status: "shared",
  },
  {
    time: "10:07:18",
    requester: "Unknown service",
    purpose: "not supplied",
    fields: "full record",
    status: "blocked",
  },
];

export default function AuditPage() {
  return (
    <PageShell
      eyebrow="Safeguards"
      title="Audit is part of the infrastructure"
      summary="A data exchange layer should make every request inspectable: who asked, why they asked, what was shared, and whether the request was allowed."
    >
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Demo audit trail</CardTitle>
          <CardDescription>
            This is the governance surface a policymaker should be able to
            understand before a system scales.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b text-muted-foreground">
              <tr>
                <th className="py-3 pr-4 font-medium">Time</th>
                <th className="py-3 pr-4 font-medium">Requester</th>
                <th className="py-3 pr-4 font-medium">Purpose</th>
                <th className="py-3 pr-4 font-medium">Data shared</th>
                <th className="py-3 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.time}-${row.requester}`} className="border-b">
                  <td className="py-3 pr-4">{row.time}</td>
                  <td className="py-3 pr-4">{row.requester}</td>
                  <td className="py-3 pr-4">{row.purpose}</td>
                  <td className="py-3 pr-4">{row.fields}</td>
                  <td className="py-3 pr-4">
                    <Badge
                      variant={row.status === "blocked" ? "outline" : "secondary"}
                    >
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </PageShell>
  );
}
