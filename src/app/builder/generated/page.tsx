import Link from "next/link";
import {
  Bot,
  Cable,
  CheckCircle2,
  Download,
  FileCode2,
  GitBranch,
  PlugZap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildStack, type StackInput } from "@/lib/stack-builder";

function maturityForBuilder(value?: string): StackInput["maturity"] {
  if (value === "Explore") return "Early";
  if (value === "Scaling" || value === "Operating") return "Scaling";
  return "Building";
}

const starterArtifacts = [
  {
    title: "OpenAPI contract",
    body: "The minimum API shape needed to test verification, registry lookup, payment routing, and audit logging.",
    icon: FileCode2,
    href: "/data-exchange/api",
  },
  {
    title: "Adapter checklist",
    body: "What each local rail or national system must expose before it can be safely connected.",
    icon: Cable,
    href: "/data-exchange",
  },
  {
    title: "Safeguards log",
    body: "Purpose, consent, access, response, and redress records for every sensitive data exchange.",
    icon: ShieldCheck,
    href: "/data-exchange/audit",
  },
  {
    title: "DPG code shortlist",
    body: "Open repositories to review, fork, test, or adapt before writing custom code.",
    icon: GitBranch,
    href: "/catalogue",
  },
];

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
    countryId: params.country ?? "kenya",
    useCaseId: params.useCase ?? "farmer-support",
    maturity: maturityForBuilder(params.maturity),
    priorities: params.priorities
      ? params.priorities.split(",").filter(Boolean)
      : ["Inclusion", "Payments", "Data exchange"],
  });

  const watchItems = stack.gaps.slice(0, 6);
  const hasMpesa = stack.relevantIntegrations.some((item) =>
    item.name.toLowerCase().includes("m-pesa")
  );
  const paymentUseCase = stack.useCase.layers.includes("Payments");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <span>{stack.country.flag}</span>
              {stack.country.name}
            </Badge>
            <Badge className="bg-emerald-50 text-emerald-700">
              {stack.country.maturity}
            </Badge>
            <Badge variant="secondary">{stack.useCase.shortName}</Badge>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Generated DPI starter kit
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            A country-specific implementation kit for {stack.country.name}: open
            DPGs to evaluate, local integrations to check, standards to apply,
            and the first artifacts a technical team would need to start building.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link href={`/builder?country=${stack.country.id}&useCase=${stack.useCase.id}`}>
              Change inputs
            </Link>
          </Button>
          <Button size="sm" className="text-xs">
            <Download className="size-3.5" />
            Download stack brief
          </Button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_17rem]">
        <div className="rounded-lg border bg-background p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-secondary text-primary">
              <Bot className="size-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">Generated analysis</div>
              <div className="text-xs text-muted-foreground">
                Heuristic fit score based on use case, country readiness, DPG
                match, and local integration checks.
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {stack.analysis.map((item) => (
              <div key={item} className="rounded-md border bg-secondary/35 p-3">
                <Sparkles className="mb-3 size-4 text-primary" />
                <p className="text-xs leading-5 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-4 text-xs font-semibold">Fit score</div>
          <div className="mb-5 grid place-items-center">
            <div className="grid size-24 place-items-center rounded-full border-[10px] border-secondary bg-background text-center">
              <div>
                <div className="text-2xl font-semibold text-primary">
                  {stack.fitScore}
                </div>
                <div className="text-[10px] text-muted-foreground">of 100</div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 text-xs">
            {stack.country.metrics.slice(0, 4).map((metric) => (
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

      <Tabs defaultValue="architecture" className="gap-5">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 sm:w-fit">
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="checks">Checks</TabsTrigger>
          <TabsTrigger value="kit">Starter kit</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture">
          <section className="overflow-hidden rounded-lg border bg-background shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">System</th>
                  <th className="px-4 py-3 font-semibold">DPGs / code to evaluate</th>
                  <th className="px-4 py-3 font-semibold">Local integrations</th>
                  <th className="px-4 py-3 font-semibold">Why this matters</th>
                </tr>
              </thead>
              <tbody>
                {stack.architectureRows.map((row, index) => (
                  <tr key={`${row.system}-${index}`} className="border-b last:border-b-0">
                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-3">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{row.system}</div>
                          <div className="mt-1 text-muted-foreground">{row.step}</div>
                          <div className="mt-2 text-[10px] text-muted-foreground">
                            Owner: {row.owner}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {row.dpgs.map((dpg) => (
                          <Badge key={dpg.id} variant="secondary" className="rounded-md">
                            {dpg.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2 text-muted-foreground">
                        {row.standards.join(", ") || "OpenAPI, audit logging"}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="grid gap-2">
                        {row.localIntegrations.length ? (
                          row.localIntegrations.map((item) => (
                            <div key={item.name} className="rounded-md border px-2 py-1.5">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-muted-foreground">{item.kind}</div>
                            </div>
                          ))
                        ) : (
                          <span className="text-muted-foreground">
                            Identify local owner during discovery
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="max-w-xs px-4 py-3 align-top leading-5 text-muted-foreground">
                      {row.why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </TabsContent>

        <TabsContent value="integrations">
          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <PlugZap className="size-4 text-primary" />
                Local integrations to check
              </div>
              <div className="grid gap-3">
                {stack.relevantIntegrations.map((item) => (
                  <div key={item.name} className="rounded-md border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-semibold">{item.name}</div>
                      <Badge variant="secondary">{item.layer}</Badge>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Cable className="size-4 text-primary" />
                Payment rail logic
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                The stack should connect to the rails people already use in the
                selected country. That may be a private wallet, instant payment
                system, bank rail, or government payment service.
              </p>
              {paymentUseCase ? (
                <div className="mt-4 rounded-md border bg-secondary/40 p-3 text-xs leading-5 text-muted-foreground">
                  {hasMpesa
                    ? "M-Pesa is included because it is listed as a local payment integration for this country in the prototype data."
                    : `M-Pesa is not shown as the default payment check for ${stack.country.name}. The kit uses the local rails listed for this country instead; M-Pesa can be added if local evidence confirms it is relevant.`}
                </div>
              ) : null}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="checks">
          <section className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-3 text-sm font-semibold">What to validate next</div>
              <div className="grid gap-2 text-xs text-muted-foreground">
                {watchItems.map((item) => (
                  <div key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-3 text-sm font-semibold">Where the use case came from</div>
              <p className="text-sm leading-6 text-muted-foreground">
                These use cases are the public-service patterns AA4DPI has been
                discussing: agriculture, social protection, health, education,
                financial inclusion, and MSME or cross-border trade. The builder
                turns each pattern into systems, DPGs, integrations, and safeguards.
              </p>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="kit">
          <section className="grid gap-4 md:grid-cols-4">
            {starterArtifacts.map((artifact) => (
              <Link
                key={artifact.title}
                href={artifact.href}
                className="rounded-lg border bg-background p-4 shadow-sm transition hover:bg-secondary/40"
              >
                <artifact.icon className="mb-4 size-5 text-primary" />
                <div className="text-sm font-semibold">{artifact.title}</div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {artifact.body}
                </p>
              </Link>
            ))}
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
