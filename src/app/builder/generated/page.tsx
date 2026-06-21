import { Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const rows = [
  {
    layer: "Farmer Registry",
    purpose: "Register farmers and farms",
    dpg: "OpenCRVS + OpenSPP",
    standards: "JSON Schema, ISO 11799",
  },
  {
    layer: "Identity Check",
    purpose: "Verify identity and prevent duplicates",
    dpg: "MOSIP",
    standards: "OIDC, DID, ISO 29115",
  },
  {
    layer: "Eligibility Rules",
    purpose: "Define program rules and targeting logic",
    dpg: "OpenG2P",
    standards: "DUN, FHIR, Open Policy",
  },
  {
    layer: "Payment Rail",
    purpose: "Deliver payments securely",
    dpg: "Mojaloop",
    standards: "ISO 20022, FSPIOP",
  },
  {
    layer: "Data Exchange",
    purpose: "Share data across agencies safely",
    dpg: "X-Road",
    standards: "OpenID Connect, REST, JSON",
  },
  {
    layer: "Grievance",
    purpose: "Capture and resolve citizen feedback",
    dpg: "OpenG2P",
    standards: "OAS 3.0, ITU-T X.709",
  },
  {
    layer: "Audit & Monitoring",
    purpose: "Track usage, performance, and outcomes",
    dpg: "OpenMRS + DHIS2",
    standards: "IHI, DOI, OpenLineage",
  },
];

const checks = [
  ["Rwanda", "62%", "Building stage"],
  ["Policy alignment", "ok", ""],
  ["Legal & privacy", "ok", ""],
  ["Institutional capacity", "watch", ""],
  ["Technical infrastructure", "ok", ""],
  ["Data quality", "watch", ""],
  ["Interoperability", "ok", ""],
  ["Security & trust", "watch", ""],
  ["Sustainability", "ok", ""],
];

export default function GeneratedStackPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Your DPI stack for Rwanda - Farmer Support
            </h1>
            <Badge className="bg-emerald-50 text-emerald-700">Building</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            A layered architecture and recommended DPGs
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_15rem]">
        <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Layer</th>
                <th className="px-4 py-3 font-semibold">Recommended DPG(s)</th>
                <th className="px-4 py-3 font-semibold">Key standards</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.layer} className="border-b last:border-b-0">
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{row.layer}</div>
                        <div className="mt-1 text-muted-foreground">
                          {row.purpose}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold">{row.dpg}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.standards}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-4 text-xs font-semibold">Readiness checklist</div>
          <div className="mb-5 grid place-items-center">
            <div className="grid size-24 place-items-center rounded-full border-[10px] border-sky-200 bg-background text-center">
              <div>
                <div className="text-2xl font-semibold text-primary">62%</div>
                <div className="text-[10px] text-muted-foreground">
                  Building stage
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-2 text-xs">
            {checks.slice(1).map(([label, status]) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">{label}</span>
                <span
                  className={`size-2 rounded-full ${
                    status === "ok" ? "bg-emerald-500" : "bg-amber-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </aside>
      </section>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="text-xs">
          <Download className="size-3.5" />
          Download stack brief
        </Button>
      </div>
    </main>
  );
}
