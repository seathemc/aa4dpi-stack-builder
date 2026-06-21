import { GitBranch, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dpgs } from "@/lib/data";

const layerFilters = [
  "All",
  "Identity",
  "Civil Registration",
  "Payments",
  "Data Exchange",
  "Social Protection",
  "Health",
];

export default function CataloguePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">DPG Catalogue</h1>
        <p className="text-sm text-muted-foreground">
          Explore open Digital Public Goods by layer
        </p>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <div className="flex h-9 w-full min-w-0 items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground sm:min-w-80 sm:flex-1">
          <Search className="size-4" />
          Search DPGs...
        </div>
        <Button variant="outline" size="sm" className="w-full text-xs sm:ml-auto sm:w-auto">
          All layers
        </Button>
      </section>

      <section className="flex flex-wrap gap-2">
        {layerFilters.map((filter, index) => (
          <Badge
            key={filter}
            variant={index === 0 ? "default" : "secondary"}
            className="rounded-md px-3 py-1"
          >
            {filter}
          </Badge>
        ))}
      </section>

      <section className="grid gap-3 md:hidden">
        {dpgs.map((dpg) => (
          <article key={dpg.id} className="rounded-lg border bg-background p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-[10px] font-semibold text-primary">
                {dpg.name.slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{dpg.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {dpg.layer}
                </div>
              </div>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                {dpg.maturity}
              </Badge>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              {dpg.description}
            </p>
            <a
              href={dpg.github}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-primary"
            >
              <GitBranch className="size-3.5" />
              Open GitHub
            </a>
          </article>
        ))}
      </section>

      <section className="hidden overflow-hidden rounded-lg border bg-background shadow-sm md:block">
        <table className="w-full text-left text-xs">
          <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">DPG</th>
              <th className="px-4 py-3 font-semibold">Layer</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="px-4 py-3 font-semibold">Maturity</th>
              <th className="px-4 py-3 font-semibold">GitHub</th>
            </tr>
          </thead>
          <tbody>
            {dpgs.map((dpg) => (
              <tr key={dpg.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-md bg-secondary text-[10px] font-semibold text-primary">
                      {dpg.name.slice(0, 2)}
                    </div>
                    <span className="font-semibold">{dpg.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{dpg.layer}</td>
                <td className="max-w-sm px-4 py-3 text-muted-foreground">
                  {dpg.description}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                    {dpg.maturity}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <a href={dpg.github} target="_blank" rel="noreferrer">
                    <GitBranch className="size-4 text-muted-foreground" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {dpgs.length} DPGs</span>
        <span>Open-source tools and standards to evaluate by use case</span>
      </div>
    </main>
  );
}
