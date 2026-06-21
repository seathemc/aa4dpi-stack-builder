import { ArrowRight, CheckCircle2, Database, GitBranch, Shield } from "lucide-react";

import { ProgressBar } from "@/components/progress-bar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CountryProfile, Dpg, UseCase } from "@/lib/data";

export function WorkflowStrip({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="relative rounded-lg border bg-secondary/35 p-4"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex size-7 items-center justify-center rounded-full bg-background text-xs font-semibold">
              {index + 1}
            </div>
            {index < items.length - 1 ? (
              <ArrowRight className="hidden size-4 text-muted-foreground md:block" />
            ) : null}
          </div>
          <div className="font-medium">{item.title}</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CatalogueSnapshot({ dpgs }: { dpgs: Dpg[] }) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Repository matrix</CardTitle>
            <CardDescription>
              Tools grouped by the DPI layer they can support.
            </CardDescription>
          </div>
          <div className="rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
            Search DPGs, standards, use cases
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-3 pr-4 font-medium">Layer</th>
              <th className="py-3 pr-4 font-medium">Tool</th>
              <th className="py-3 pr-4 font-medium">GitHub</th>
              <th className="py-3 pr-4 font-medium">Best fit</th>
              <th className="py-3 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {dpgs.map((dpg) => (
              <tr key={dpg.id} className="border-b last:border-b-0">
                <td className="py-3 pr-4">
                  <Badge variant="secondary">{dpg.layer}</Badge>
                </td>
                <td className="py-3 pr-4 font-medium">{dpg.name}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {dpg.github.replace("https://github.com/", "github.com/")}
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {dpg.fit.slice(0, 2).join(", ")}
                </td>
                <td className="py-3 pr-4">
                  <Badge variant="outline">{dpg.maturity}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function StackArchitecture({
  useCase,
}: {
  useCase: UseCase;
}) {
  return (
    <div className="rounded-lg border bg-secondary/30 p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium">
        <GitBranch className="size-4 text-primary" />
        Generated architecture
      </div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {useCase.systems.map((system, index) => (
          <div key={system} className="relative">
            <div className="min-h-28 rounded-lg border bg-background p-3 shadow-sm">
              <div className="mb-4 flex size-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {index + 1}
              </div>
              <div className="text-sm font-medium leading-5">{system}</div>
            </div>
            {index < useCase.systems.length - 1 ? (
              <ArrowRight className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground xl:block" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReadinessChecklist({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-2 rounded-md border bg-background px-3 py-2 text-sm"
        >
          <CheckCircle2 className="mt-0.5 size-4 text-primary" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function DataExchangeDiagram() {
  const nodes = [
    {
      title: "Social Registry",
      body: "asks a narrow eligibility question",
      icon: Database,
    },
    {
      title: "Exchange Layer",
      body: "checks purpose, permissions, and scope",
      icon: Shield,
    },
    {
      title: "Civil Registry",
      body: "returns only the verified facts allowed",
      icon: Database,
    },
    {
      title: "Audit Log",
      body: "records requester, purpose, fields, and status",
      icon: GitBranch,
    },
  ];

  return (
    <div className="rounded-lg border bg-secondary/30 p-4">
      <div className="grid gap-3 lg:grid-cols-4">
        {nodes.map((node, index) => (
          <div key={node.title} className="relative">
            <div className="min-h-36 rounded-lg border bg-background p-4 shadow-sm">
              <node.icon className="mb-6 size-5 text-primary" />
              <div className="font-medium">{node.title}</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {node.body}
              </p>
            </div>
            {index < nodes.length - 1 ? (
              <ArrowRight className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground lg:block" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CountryOutputPanel({ country }: { country: CountryProfile }) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge>{country.region}</Badge>
          <Badge variant="secondary">{country.maturity}</Badge>
        </div>
        <CardTitle>{country.name} readiness output</CardTitle>
        <CardDescription>{country.summary}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {country.metrics.map((metric) => (
          <ProgressBar
            key={metric.label}
            label={metric.label}
            value={metric.value}
            note={metric.note}
          />
        ))}
      </CardContent>
    </Card>
  );
}
