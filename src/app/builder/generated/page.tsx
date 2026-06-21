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
import { evidenceLevel, evidenceTone } from "@/lib/evidence";
import { buildStack, type StackInput } from "@/lib/stack-builder";

function maturityForBuilder(value?: string): StackInput["maturity"] {
  if (value === "Explore") return "Early";
  if (value === "Scaling" || value === "Operating") return "Scaling";
  return "Building";
}

const starterArtifacts = [
  {
    title: "OpenAPI contract",
    body: "API shape for verification, registry lookup, payment routing, and audit logging.",
    icon: FileCode2,
    href: "/data-exchange/api",
  },
  {
    title: "Adapter checklist",
    body: "What each national system or local rail must expose before it can connect safely.",
    icon: Cable,
    href: "/data-exchange",
  },
  {
    title: "Safeguards log",
    body: "Purpose, consent, access, response, redress, and audit records for sensitive exchange.",
    icon: ShieldCheck,
    href: "/data-exchange/audit",
  },
  {
    title: "DPG shortlist",
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
  const stackSignal = evidenceLevel(stack.fitScore);

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
            A country-specific implementation kit for {stack.country.name}:
            open DPGs to evaluate, local systems to connect, standards to apply,
            and first artifacts a technical team would need to start building.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link
              href={`/builder?country=${stack.country.id}&useCase=${stack.useCase.id}`}
            >
              Change inputs
            </Link>
          </Button>
          <Button size="sm" className="text-xs">
            <Download className="size-3.5" />
            Download stack brief
          </Button>
        </div>
      </section>

      <Tabs defaultValue="overview" className="gap-5">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-lg p-1 sm:w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="checks">Checks</TabsTrigger>
          <TabsTrigger value="kit">Starter kit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-5">
          <section className="grid gap-5 lg:grid-cols-[1fr_17rem]">
            <div className="rounded-lg border bg-background p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-secondary text-primary">
                  <Bot className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    Generated analysis
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Based on selected country, use case, readiness signals,
                    local integrations, and open-source fit.
                  </div>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {stack.analysis.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border bg-secondary/35 p-3"
                  >
                    <Sparkles className="mb-3 size-4 text-primary" />
                    <p className="text-xs leading-5 text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-4 text-xs font-semibold">
                Recommendation signal
              </div>
              <Badge className={`mb-5 rounded-md ${evidenceTone(stackSignal)}`}>
                {stackSignal}
              </Badge>
              <p className="mb-5 text-xs leading-5 text-muted-foreground">
                Draft signal based on selected use case, country evidence, and
                open-source fit. It should guide validation, not replace it.
              </p>
              <div className="grid gap-3 text-xs">
                {stack.country.metrics.slice(0, 4).map((metric) => (
                  <div key={metric.label} className="grid gap-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">
                        {metric.label}
                      </span>
                      <Badge
                        className={`rounded-md ${evidenceTone(
                          evidenceLevel(metric.value)
                        )}`}
                      >
                        {evidenceLevel(metric.value)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          {stack.matchedCountryUseCase ? (
            <section className="rounded-lg border bg-background p-5 shadow-sm">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Country use case match
              </div>
              <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <h2 className="text-xl font-semibold">
                    {stack.matchedCountryUseCase.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {stack.matchedCountryUseCase.description}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Outcome:
                    </span>{" "}
                    {stack.matchedCountryUseCase.outcome}
                  </p>
                </div>
                <div className="grid content-start gap-2">
                  <div className="text-xs font-semibold">Systems to connect</div>
                  <div className="flex flex-wrap gap-2">
                    {stack.matchedCountryUseCase.systems.map((system) => (
                      <Badge
                        key={system}
                        variant="secondary"
                        className="rounded-md"
                      >
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {stack.country.implementationFocus?.length ? (
            <section className="grid gap-3 md:grid-cols-3">
              {stack.country.implementationFocus.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border bg-background p-4 shadow-sm"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm leading-6">{item.value}</p>
                </div>
              ))}
            </section>
          ) : null}
        </TabsContent>

        <TabsContent value="architecture">
          <section className="grid gap-3">
            {stack.architectureRows.map((row, index) => (
              <article
                key={`${row.system}-${index}`}
                className="grid gap-4 rounded-lg border bg-background p-4 shadow-sm lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.15fr]"
              >
                <div className="flex gap-3">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{row.system}</div>
                    <div className="mt-1 text-xs leading-5 text-muted-foreground">
                      {row.step}
                    </div>
                    <div className="mt-2 text-[10px] text-muted-foreground">
                      Owner: {row.owner}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    DPGs / code
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {row.dpgs.map((dpg) => (
                      <Badge
                        key={dpg.id}
                        variant="secondary"
                        className="rounded-md"
                      >
                        {dpg.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Local checks
                  </div>
                  <div className="grid gap-1.5 text-xs">
                    {row.localIntegrations.length ? (
                      row.localIntegrations.map((item) => (
                        <div key={item.name}>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground">
                            {" "}
                            · {item.kind}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted-foreground">
                        Identify local owner during discovery
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  {row.why}
                </p>
              </article>
            ))}
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
                The kit checks the rails people already use in the selected
                country. That may be a wallet, instant payment system, bank
                rail, government payment service, or a payment layer still under
                development.
              </p>
              {paymentUseCase ? (
                <div className="mt-4 rounded-md border bg-secondary/40 p-3 text-xs leading-5 text-muted-foreground">
                  {hasMpesa
                    ? "M-Pesa appears because it is listed as a local payment integration for this country."
                    : `M-Pesa is not shown as the default payment check for ${stack.country.name}. The kit uses the local rails listed for this country instead; M-Pesa can be added if local evidence confirms it is relevant.`}
                </div>
              ) : null}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="checks">
          <section className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-3 text-sm font-semibold">
                What to validate next
              </div>
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
              <div className="mb-3 text-sm font-semibold">
                Standards to apply
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.standards.map((standard) => (
                  <Badge
                    key={standard}
                    variant="secondary"
                    className="rounded-md"
                  >
                    {standard}
                  </Badge>
                ))}
              </div>
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
