"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { countries, priorities, useCases } from "@/lib/data";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-xs font-medium">
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
  const [maturity, setMaturity] = useState("Building");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "Inclusion",
    "Payments",
    "Data Exchange",
  ]);

  const country = countries.find((item) => item.id === countryId) ?? countries[0];
  const useCase =
    useCases.find((item) => item.id === useCaseId) ?? useCases[0];

  const togglePriority = (priority: string) => {
    setSelectedPriorities((current) =>
      current.includes(priority)
        ? current.filter((item) => item !== priority)
        : [...current, priority].slice(0, 3)
    );
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Start your DPI stack
        </h1>
        <p className="text-sm text-muted-foreground">
          Answer a few questions to generate a recommended stack.
        </p>
      </section>

      <section className="grid gap-5">
        <Field label="Country">
          <select
            value={countryId}
            onChange={(event) => setCountryId(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            {countries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Primary use case">
          <select
            value={useCaseId}
            onChange={(event) => setUseCaseId(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            {useCases.map((item) => (
              <option key={item.id} value={item.id}>
                {item.shortName}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-2">
          <div className="text-xs font-medium">Maturity stage</div>
          <div className="flex flex-wrap gap-2">
            {["Explore", "Building", "Operating", "Scaling"].map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setMaturity(stage)}
                className={`rounded-md border px-4 py-2 text-xs font-medium ${
                  maturity === stage
                    ? "border-primary bg-sky-50 text-primary"
                    : "bg-background text-muted-foreground"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <div className="text-xs font-medium">Priority areas (select up to 3)</div>
          <div className="flex flex-wrap gap-2">
            {priorities.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => togglePriority(priority)}
                className={`rounded-md border px-3 py-2 text-xs font-medium ${
                  selectedPriorities.includes(priority)
                    ? "border-primary bg-sky-50 text-primary"
                    : "bg-background text-muted-foreground"
                }`}
              >
                {priority}
              </button>
            ))}
            <button
              type="button"
              className="rounded-md border bg-background px-3 py-2 text-xs font-medium text-muted-foreground"
            >
              Other
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-sky-50/70 p-4">
          <div className="mb-3 text-xs font-semibold">Your selections</div>
          <div className="grid gap-2 text-xs text-muted-foreground">
            <div className="grid grid-cols-[7rem_1fr]">
              <span>Country</span>
              <span className="text-foreground">{country.name}</span>
            </div>
            <div className="grid grid-cols-[7rem_1fr]">
              <span>Use case</span>
              <span className="text-foreground">{useCase.shortName}</span>
            </div>
            <div className="grid grid-cols-[7rem_1fr]">
              <span>Maturity</span>
              <span className="text-foreground">{maturity}</span>
            </div>
            <div className="grid grid-cols-[7rem_1fr]">
              <span>Priorities</span>
              <div className="flex flex-wrap gap-1">
                {selectedPriorities.map((priority) => (
                  <Badge key={priority} variant="secondary">
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Button asChild className="h-10 justify-between text-xs">
          <Link href="/builder/generated">
            Generate my DPI stack
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
