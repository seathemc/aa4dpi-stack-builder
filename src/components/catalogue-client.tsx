"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ExternalLink, GitBranch, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { africanDpgs, dpgs, type AfricanDpg, type Dpg } from "@/lib/data";

const allValue = "all";

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function includesText(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

function DpgInitials({ name }: { name: string }) {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-[10px] font-semibold text-primary">
      {name
        .split(" ")
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)}
    </div>
  );
}

function ClearFiltersButton({
  onClear,
  show,
}: {
  onClear: () => void;
  show: boolean;
}) {
  if (!show) return null;

  return (
    <Button variant="outline" size="sm" onClick={onClear} className="h-9 text-xs">
      Clear filters
    </Button>
  );
}

function OpenDpgMobileCard({ dpg }: { dpg: Dpg }) {
  return (
    <article className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <DpgInitials name={dpg.name} />
        <div className="min-w-0 flex-1">
          <div className="font-semibold">{dpg.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{dpg.layer}</div>
        </div>
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
          {dpg.maturity}
        </Badge>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        {dpg.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {dpg.fit.slice(0, 3).map((fit) => (
          <Badge key={fit} variant="secondary" className="rounded-md">
            {fit}
          </Badge>
        ))}
      </div>
      <Button asChild size="sm" variant="outline" className="mt-4 h-8 text-xs">
        <a href={dpg.github} target="_blank" rel="noreferrer">
          <GitBranch className="size-3.5" />
          Open code
        </a>
      </Button>
    </article>
  );
}

function AfricanDpgMobileCard({ item }: { item: AfricanDpg }) {
  const href = item.codeHref ?? item.evidenceHref;
  const external = href.startsWith("http");

  return (
    <article className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-md">
              {item.countryFlag ? `${item.countryFlag} ` : ""}
              {item.country}
            </Badge>
            <Badge variant="secondary" className="rounded-md">
              {item.type}
            </Badge>
          </div>
          <h3 className="mt-3 text-base font-semibold">{item.name}</h3>
        </div>
        <Badge className="rounded-md">{item.status}</Badge>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        {item.note}
      </p>
      <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Layer: </span>
          {item.layer}
        </div>
        <div>
          <span className="font-medium text-foreground">Use case fit: </span>
          {item.useCaseFit}
        </div>
        <div>
          <span className="font-medium text-foreground">Owner: </span>
          {item.owners}
        </div>
      </div>
      <Button asChild size="sm" variant="outline" className="mt-4 h-8 text-xs">
        {external ? (
          <a href={href} target="_blank" rel="noreferrer">
            {item.codeHref ? "Open code" : "Open evidence"}
            <ExternalLink className="size-3.5" />
          </a>
        ) : (
          <Link href={href}>
            Open evidence
            <ExternalLink className="size-3.5" />
          </Link>
        )}
      </Button>
    </article>
  );
}

export function CatalogueClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "african" ? "african" : "open";
  const [tab, setTab] = useState(initialTab);
  const [query, setQuery] = useState("");
  const [layer, setLayer] = useState(allValue);
  const [country, setCountry] = useState(allValue);
  const [status, setStatus] = useState(allValue);
  const [kind, setKind] = useState(allValue);

  const openLayers = useMemo(() => unique(dpgs.map((dpg) => dpg.layer)), []);
  const africanLayers = useMemo(
    () => unique(africanDpgs.map((item) => item.layer)),
    []
  );
  const africanCountries = useMemo(
    () => unique(africanDpgs.map((item) => item.country)),
    []
  );
  const africanStatuses = useMemo(
    () => unique(africanDpgs.map((item) => item.status)),
    []
  );
  const africanKinds = useMemo(
    () => unique(africanDpgs.map((item) => item.type)),
    []
  );

  const filteredOpenDpgs = useMemo(() => {
    return dpgs.filter((dpg) => {
      const matchesQuery =
        !query ||
        [
          dpg.name,
          dpg.layer,
          dpg.description,
          dpg.maturity,
          ...dpg.fit,
          ...dpg.standards,
        ].some((value) => includesText(value, query));
      const matchesLayer = layer === allValue || dpg.layer === layer;

      return matchesQuery && matchesLayer;
    });
  }, [layer, query]);

  const filteredAfricanDpgs = useMemo(() => {
    return africanDpgs.filter((item) => {
      const matchesQuery =
        !query ||
        [
          item.name,
          item.type,
          item.country,
          item.layer,
          item.useCaseFit,
          item.status,
          item.owners,
          item.note,
          ...item.standards,
        ].some((value) => includesText(value, query));
      const matchesLayer = layer === allValue || item.layer === layer;
      const matchesCountry = country === allValue || item.country === country;
      const matchesStatus = status === allValue || item.status === status;
      const matchesKind = kind === allValue || item.type === kind;

      return (
        matchesQuery &&
        matchesLayer &&
        matchesCountry &&
        matchesStatus &&
        matchesKind
      );
    });
  }, [country, kind, layer, query, status]);

  const activeLayers = tab === "african" ? africanLayers : openLayers;
  const filtersAreActive =
    query || layer !== allValue || country !== allValue || status !== allValue || kind !== allValue;

  const handleTabChange = (value: string) => {
    setTab(value);
    setLayer(allValue);
    setCountry(allValue);
    setStatus(allValue);
    setKind(allValue);
    router.replace(`/catalogue?tab=${value}`, { scroll: false });
  };

  const clearFilters = () => {
    setQuery("");
    setLayer(allValue);
    setCountry(allValue);
    setStatus(allValue);
    setKind(allValue);
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
      <section className="space-y-2">
        <div className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
          Build + Open DPGs
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          DPG Catalogue
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Use the catalogue to compare reusable open tools, country systems, and
          African implementation signals by layer, country, and use case.
        </p>
      </section>

      <Tabs value={tab} onValueChange={handleTabChange} className="gap-5">
        <TabsList className="h-auto w-full flex-wrap gap-1 rounded-lg p-1 sm:w-fit">
          <TabsTrigger value="open">Open DPGs</TabsTrigger>
          <TabsTrigger value="african">African DPGs</TabsTrigger>
        </TabsList>

        <section className="grid gap-3 rounded-lg border bg-background p-3 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  tab === "african"
                    ? "Search countries, systems, layers..."
                    : "Search DPGs, standards, layers..."
                }
                className="pl-9"
              />
            </div>
            <Select value={layer} onValueChange={setLayer}>
              <SelectTrigger className="h-9 w-full text-xs lg:w-[190px]">
                <SelectValue placeholder="All layers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={allValue}>All layers</SelectItem>
                {activeLayers.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ClearFiltersButton onClear={clearFilters} show={Boolean(filtersAreActive)} />
          </div>

          {tab === "african" ? (
            <div className="grid gap-3 sm:grid-cols-3">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allValue}>All countries</SelectItem>
                  {africanCountries.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allValue}>All types</SelectItem>
                  {africanKinds.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allValue}>All status</SelectItem>
                  {africanStatuses.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </section>

        <TabsContent value="open" className="grid gap-4">
          <section className="grid gap-3 md:hidden">
            {filteredOpenDpgs.map((dpg) => (
              <OpenDpgMobileCard key={dpg.id} dpg={dpg} />
            ))}
          </section>

          <section className="hidden overflow-hidden rounded-lg border bg-background shadow-sm md:block">
            <table className="w-full text-left text-xs">
              <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">DPG</th>
                  <th className="px-4 py-3 font-semibold">Layer</th>
                  <th className="px-4 py-3 font-semibold">Fit</th>
                  <th className="px-4 py-3 font-semibold">Standards</th>
                  <th className="px-4 py-3 font-semibold">Maturity</th>
                  <th className="px-4 py-3 font-semibold">Code</th>
                </tr>
              </thead>
              <tbody>
                {filteredOpenDpgs.map((dpg) => (
                  <tr key={dpg.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-start gap-2">
                        <DpgInitials name={dpg.name} />
                        <div>
                          <div className="font-semibold">{dpg.name}</div>
                          <div className="mt-1 max-w-xs leading-5 text-muted-foreground">
                            {dpg.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-muted-foreground">
                      {dpg.layer}
                    </td>
                    <td className="max-w-xs px-4 py-3 align-top text-muted-foreground">
                      {dpg.fit.join(", ")}
                    </td>
                    <td className="max-w-xs px-4 py-3 align-top text-muted-foreground">
                      {dpg.standards.join(", ")}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                        {dpg.maturity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 align-top">
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
            <span>
              Showing {filteredOpenDpgs.length} of {dpgs.length} open DPGs
            </span>
            <span>Use these as candidates to evaluate, not automatic answers</span>
          </div>
        </TabsContent>

        <TabsContent value="african" className="grid gap-4">
          <section className="grid gap-3 md:hidden">
            {filteredAfricanDpgs.map((item) => (
              <AfricanDpgMobileCard key={item.id} item={item} />
            ))}
          </section>

          <section className="hidden overflow-hidden rounded-lg border bg-background shadow-sm md:block">
            <table className="w-full text-left text-xs">
              <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Country</th>
                  <th className="px-4 py-3 font-semibold">Layer</th>
                  <th className="px-4 py-3 font-semibold">Use case fit</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredAfricanDpgs.map((item) => {
                  const href = item.codeHref ?? item.evidenceHref;
                  const external = href.startsWith("http");
                  const label = item.codeHref ? "Code" : "Evidence";

                  return (
                    <tr key={item.id} className="border-b last:border-b-0">
                      <td className="max-w-xs px-4 py-3 align-top">
                        <div className="font-semibold">{item.name}</div>
                        <div className="mt-1 leading-5 text-muted-foreground">
                          {item.note}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <Badge variant="secondary" className="rounded-md">
                          {item.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {item.countryFlag ? `${item.countryFlag} ` : ""}
                        {item.country}
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {item.layer}
                      </td>
                      <td className="max-w-xs px-4 py-3 align-top text-muted-foreground">
                        {item.useCaseFit}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <Badge className="rounded-md">{item.status}</Badge>
                      </td>
                      <td className="px-4 py-3 align-top">
                        {external ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-primary"
                          >
                            {label}
                            <ExternalLink className="size-3.5" />
                          </a>
                        ) : (
                          <Link
                            href={href}
                            className="inline-flex items-center gap-1 font-medium text-primary"
                          >
                            {label}
                            <ExternalLink className="size-3.5" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredAfricanDpgs.length} of {africanDpgs.length} African DPG mappings
            </span>
            <span>Open code is linked where public repositories are verified</span>
          </div>
        </TabsContent>
      </Tabs>

      {((tab === "open" && filteredOpenDpgs.length === 0) ||
        (tab === "african" && filteredAfricanDpgs.length === 0)) ? (
        <section className="rounded-lg border bg-background p-6 text-sm text-muted-foreground shadow-sm">
          No results match those filters.
        </section>
      ) : null}
    </main>
  );
}
