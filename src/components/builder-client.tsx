"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ProgressBar } from "@/components/progress-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { countries, priorities, useCases } from "@/lib/data";
import { buildStack, type StackInput } from "@/lib/stack-builder";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

export function BuilderClient({
  initialUseCaseId = "farmer-support",
}: {
  initialUseCaseId?: string;
}) {
  const [countryId, setCountryId] = useState("rwanda");
  const [useCaseId, setUseCaseId] = useState(initialUseCaseId);
  const [maturity, setMaturity] = useState<StackInput["maturity"]>("Building");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "Inclusion",
    "Payments",
    "Data exchange",
  ]);

  const stack = useMemo(
    () =>
      buildStack({
        countryId,
        useCaseId,
        maturity,
        priorities: selectedPriorities,
      }),
    [countryId, useCaseId, maturity, selectedPriorities]
  );

  const togglePriority = (priority: string) => {
    setSelectedPriorities((current) =>
      current.includes(priority)
        ? current.filter((item) => item !== priority)
        : [...current, priority]
    );
  };

  return (
    <div className="grid gap-6">
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Build a reference stack</CardTitle>
          <CardDescription>
            Choose a country and use case. The prototype generates the systems,
            candidate DPGs, standards, safeguards, and readiness gaps to discuss.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Field label="Country">
            <select
              value={countryId}
              onChange={(event) => setCountryId(event.target.value)}
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Use case">
            <select
              value={useCaseId}
              onChange={(event) => setUseCaseId(event.target.value)}
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              {useCases.map((useCase) => (
                <option key={useCase.id} value={useCase.id}>
                  {useCase.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Current maturity">
            <select
              value={maturity}
              onChange={(event) =>
                setMaturity(event.target.value as StackInput["maturity"])
              }
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option>Early</option>
              <option>Building</option>
              <option>Scaling</option>
            </select>
          </Field>

          <div className="md:col-span-3">
            <div className="mb-2 text-sm font-medium">Priorities</div>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => togglePriority(priority)}
                  className={`rounded-full border px-3 py-1.5 text-sm ${
                    selectedPriorities.includes(priority)
                      ? "border-primary bg-accent text-accent-foreground"
                      : "bg-background text-muted-foreground"
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{stack.country.name}</Badge>
              <Badge variant="secondary">{stack.useCase.shortName}</Badge>
              <Badge variant="outline">{maturity}</Badge>
            </div>
            <CardTitle className="text-2xl">Generated DPI stack</CardTitle>
            <CardDescription className="max-w-3xl text-base leading-7">
              {stack.useCase.outcome}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {stack.useCase.systems.map((system, index) => (
                <div
                  key={system}
                  className="rounded-lg border bg-secondary/35 p-4"
                >
                  <div className="mb-4 flex size-7 items-center justify-center rounded-full bg-background text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="font-medium">{system}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold">Implementation sequence</h3>
              <div className="grid gap-3">
                {stack.sequence.map((item, index) => (
                  <div
                    key={item.step}
                    className="grid gap-2 rounded-md border bg-background p-3 md:grid-cols-[2rem_1fr_10rem]"
                  >
                    <div className="flex size-7 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                      {index + 1}
                    </div>
                    <div className="text-sm">{item.step}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.owner}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Country readiness</CardTitle>
              <CardDescription>{stack.country.summary}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {stack.country.metrics.map((metric) => (
                <ProgressBar
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  note={metric.note}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Readiness gaps to resolve</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {stack.gaps.slice(0, 6).map((gap) => (
                <div key={gap} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                  <span>{gap}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Candidate DPGs</CardTitle>
            <CardDescription>
              These are starting points for discussion, not automatic
              recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {stack.recommendedDpgs.slice(0, 8).map((dpg) => (
              <a
                key={dpg.id}
                href={dpg.github}
                target="_blank"
                rel="noreferrer"
                className="grid gap-1 rounded-md border p-3 hover:bg-secondary/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{dpg.name}</span>
                  <Badge variant="outline">{dpg.layer}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {dpg.description}
                </p>
              </a>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Standards and safeguards</CardTitle>
            <CardDescription>
              The stack should be evaluated against technical standards and
              trust requirements before adoption.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex flex-wrap gap-2">
              {stack.standards.map((standard) => (
                <Badge key={standard} variant="secondary">
                  {standard}
                </Badge>
              ))}
            </div>
            <div className="grid gap-2">
              {stack.useCase.safeguards.map((safeguard) => (
                <div key={safeguard} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 text-primary" />
                  {safeguard}
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-fit">
              <a href="/data-exchange">
                Open data exchange sandbox
                <ArrowRight />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
