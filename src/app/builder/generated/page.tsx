import { Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildStack, type StackInput } from "@/lib/stack-builder";

function maturityForBuilder(value?: string): StackInput["maturity"] {
  if (value === "Explore") return "Early";
  if (value === "Scaling" || value === "Operating") return "Scaling";
  return "Building";
}

export default async function GeneratedStackPage({
  searchParams,
}: {
  searchParams: Promise<{
    country?: string;
    useCase?: string;
    maturity?: string;
    priorities?: string;
  }>;
}) {
  const params = await searchParams;
  const stack = buildStack({
    countryId: params.country ?? "rwanda",
    useCaseId: params.useCase ?? "farmer-support",
    maturity: maturityForBuilder(params.maturity),
    priorities: params.priorities
      ? params.priorities.split(",").filter(Boolean)
      : ["Inclusion", "Payments", "Data exchange"],
  });

  const rows = stack.sequence.map((item, index) => {
    const dpg =
      stack.recommendedDpgs[index % stack.recommendedDpgs.length] ??
      stack.recommendedDpgs[0];

    return {
      layer: stack.useCase.systems[index] ?? item.step,
      purpose: item.step,
      owner: item.owner,
      dpg: dpg?.name ?? "National system",
      standards: dpg?.standards.slice(0, 2).join(", ") ?? "OpenAPI",
    };
  });

  const watchItems = stack.gaps.slice(0, 5);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Your DPI stack for {stack.country.name} - {stack.useCase.shortName}
            </h1>
            <Badge className="bg-emerald-50 text-emerald-700">
              {stack.country.maturity}
            </Badge>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            A reference architecture that connects the use case, likely open
            Digital Public Goods, standards to check, and country readiness
            signals before implementation.
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_16rem]">
        <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Layer</th>
                <th className="px-4 py-3 font-semibold">Recommended DPG</th>
                <th className="px-4 py-3 font-semibold">Owner</th>
                <th className="px-4 py-3 font-semibold">Standards to check</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.layer}-${index}`} className="border-b last:border-b-0">
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
                  <td className="px-4 py-3 text-muted-foreground">{row.owner}</td>
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
            <div className="grid size-24 place-items-center rounded-full border-[10px] border-secondary bg-background text-center">
              <div>
                <div className="text-2xl font-semibold text-primary">
                  {stack.country.readiness}%
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {stack.country.maturity}
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 text-xs">
            {stack.country.metrics.slice(0, 5).map((metric) => (
              <div key={metric.label} className="grid gap-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-semibold">{metric.value}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-3 text-xs font-semibold">Priority use case</div>
          <p className="text-sm leading-6 text-muted-foreground">
            {stack.useCase.outcome}
          </p>
        </div>
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-3 text-xs font-semibold">What to validate next</div>
          <div className="grid gap-2 text-xs text-muted-foreground">
            {watchItems.map((item) => (
              <div key={item}>- {item}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Download className="size-3.5" />
          Download stack brief
        </Button>
      </div>
    </main>
  );
}
