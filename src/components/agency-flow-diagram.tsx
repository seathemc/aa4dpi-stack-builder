import { ArrowRight, Network } from "lucide-react";

import type { CountryProfile } from "@/lib/data";
import { cn } from "@/lib/utils";

type AgencyFlow = NonNullable<CountryProfile["agencyFlow"]>;
type AgencyNode = AgencyFlow["nodes"][number];

function nodeTone(type: AgencyNode["type"]) {
  const tones = {
    lead: "border-primary/30 bg-primary/5 text-primary",
    agency: "border-sky-200 bg-sky-50 text-sky-900",
    system: "border-slate-200 bg-slate-50 text-slate-900",
    rail: "border-emerald-200 bg-emerald-50 text-emerald-900",
    safeguard: "border-amber-200 bg-amber-50 text-amber-900",
  } satisfies Record<AgencyNode["type"], string>;

  return tones[type];
}

function NodeCard({ node, compact = false }: { node: AgencyNode; compact?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3 shadow-sm",
        nodeTone(node.type),
        compact ? "min-h-[5.25rem]" : "min-h-[6rem]"
      )}
    >
      <div className="text-xs font-semibold leading-4">{node.label}</div>
      <p className="mt-2 text-[11px] leading-4 opacity-80">
        {node.description}
      </p>
    </div>
  );
}

function findNode(flow: AgencyFlow, id: string) {
  return flow.nodes.find((node) => node.id === id);
}

function isExchangeNode(node: AgencyNode) {
  const text = `${node.id} ${node.label} ${node.description}`.toLowerCase();
  return (
    text.includes("service bus") ||
    text.includes("mesob") ||
    text.includes("apisix") ||
    text.includes("gateway") ||
    text.includes("smart zambia")
  );
}

export function AgencyFlowDiagram({ flow }: { flow: AgencyFlow }) {
  const leadNodes = flow.nodes.filter((node) => node.type === "lead");
  const exchangeNodes = flow.nodes.filter(isExchangeNode);
  const endpointNodes = flow.nodes.filter(
    (node) =>
      !leadNodes.some((lead) => lead.id === node.id) &&
      !exchangeNodes.some((exchange) => exchange.id === node.id)
  );

  return (
    <section className="rounded-lg border bg-background p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
          <Network className="size-4" />
        </div>
        <div>
          <div className="text-sm font-semibold">{flow.title}</div>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">
            {flow.summary}
          </p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1.05fr_auto_1.25fr] lg:items-stretch">
        <div className="rounded-lg border bg-secondary/25 p-3">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Mandate and owners
          </div>
          <div className="grid gap-2">
            {(leadNodes.length ? leadNodes : flow.nodes.slice(0, 1)).map((node) => (
              <NodeCard key={node.id} node={node} compact />
            ))}
          </div>
        </div>

        <div className="hidden items-center text-muted-foreground lg:flex">
          <ArrowRight className="size-4" />
        </div>

        <div className="rounded-lg border bg-secondary/25 p-3">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Exchange layer
          </div>
          <div className="grid gap-2">
            {(exchangeNodes.length ? exchangeNodes : flow.nodes.slice(1, 2)).map((node) => (
              <NodeCard key={node.id} node={node} compact />
            ))}
          </div>
        </div>

        <div className="hidden items-center text-muted-foreground lg:flex">
          <ArrowRight className="size-4" />
        </div>

        <div className="rounded-lg border bg-secondary/25 p-3">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Sector systems and rails
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {endpointNodes.map((node) => (
              <NodeCard key={node.id} node={node} compact />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border bg-background">
        <div className="border-b px-3 py-2 text-xs font-semibold">
          What data moves between them
        </div>
        <div className="grid divide-y">
          {flow.flows.map((edge, index) => {
            const from = findNode(flow, edge.from);
            const to = findNode(flow, edge.to);

            return (
              <div
                key={`${edge.from}-${edge.to}-${index}`}
                className="grid gap-2 px-3 py-3 text-xs sm:grid-cols-[1fr_1.15fr_1fr] sm:items-center"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    From
                  </div>
                  <div className="mt-1 font-medium">{from?.label ?? edge.from}</div>
                </div>
                <div className="rounded-md bg-secondary/50 px-3 py-2 text-muted-foreground">
                  {edge.label}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    To
                  </div>
                  <div className="mt-1 font-medium">{to?.label ?? edge.to}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
