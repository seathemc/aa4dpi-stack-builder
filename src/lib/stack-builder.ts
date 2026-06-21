import {
  cohortCountries,
  countries,
  dpgs,
  useCases,
  type DpgLayer,
} from "@/lib/data";

export type StackInput = {
  countryId: string;
  useCaseId: string;
  maturity: "Early" | "Building" | "Scaling";
  priorities: string[];
};

const systemDpgMap: Record<string, string[]> = {
  farmer: ["openspp", "odk", "openg2p"],
  social: ["openg2p", "openspp", "openfisca"],
  identity: ["mosip", "opencrvs"],
  eligibility: ["openfisca", "openg2p"],
  payment: ["mojaloop", "openg2p"],
  grievance: ["openg2p", "openfn"],
  audit: ["xroad", "openfn"],
  patient: ["openmrs", "dhis2"],
  facility: ["dhis2", "openmrs"],
  claims: ["openmrs", "openfn"],
  health: ["dhis2", "openmrs"],
  learner: ["odk", "openfn"],
  credential: ["openfn"],
  scholarship: ["openfisca", "openfn"],
  business: ["ocds", "openfn"],
  supplier: ["ocds", "openfn"],
  procurement: ["ocds", "openfn"],
  treasury: ["openfn", "openfisca"],
  bank: ["mojaloop", "openfn"],
  status: ["xroad", "openfn"],
  tax: ["openfisca", "openfn"],
  customs: ["openfn", "xroad"],
  trade: ["openfn", "xroad"],
  exchange: ["xroad", "apisix", "openfn"],
  registry: ["openspp", "openg2p", "opencrvs"],
};

function dpgsForSystem(system: string, countryDpgNames: string[]) {
  const normalized = system.toLowerCase();
  const keys = Object.keys(systemDpgMap).filter((key) =>
    normalized.includes(key)
  );
  const ids = keys.flatMap((key) => systemDpgMap[key]);
  const candidates = dpgs.filter((dpg) => ids.includes(dpg.id));

  return candidates
    .sort((a, b) => {
      const aLocal = countryDpgNames.includes(a.name) ? 0 : 1;
      const bLocal = countryDpgNames.includes(b.name) ? 0 : 1;
      return aLocal - bLocal;
    })
    .slice(0, 3);
}

function explainSystem(system: string) {
  const normalized = system.toLowerCase();

  if (normalized.includes("payment")) {
    return "Connect open payment orchestration to the country rails people already use, then test fees, failures, reversals, and reconciliation.";
  }
  if (normalized.includes("identity")) {
    return "Reuse an existing trusted identity or civil-registration check where possible, with an offline path for people who are not covered.";
  }
  if (normalized.includes("registry")) {
    return "Avoid building a new list first. Check whether a programme registry can be cleaned, deduplicated, and reused with consent.";
  }
  if (normalized.includes("eligibility")) {
    return "Turn programme rules into testable logic so eligibility decisions can be reviewed, appealed, and changed without rewriting the whole system.";
  }
  if (normalized.includes("grievance")) {
    return "Make complaints, corrections, and appeals part of the workflow from day one, not an afterthought.";
  }
  if (normalized.includes("audit")) {
    return "Log who asked for what data, for what purpose, and what response was returned.";
  }

  return "Map the system to an open component where useful, then verify local ownership, governance, and integration constraints.";
}

function integrationLayersForSystem(system: string, fallbackLayer: DpgLayer) {
  const normalized = system.toLowerCase();

  if (normalized.includes("procurement") || normalized.includes("treasury")) {
    return ["Operations", "Data exchange"] satisfies DpgLayer[];
  }
  if (normalized.includes("bank")) return ["Payments"] satisfies DpgLayer[];
  if (normalized.includes("supplier")) return ["Registries", "Civil registration"] satisfies DpgLayer[];
  if (normalized.includes("status")) {
    return ["Service delivery", "Data exchange", "Safeguards"] satisfies DpgLayer[];
  }
  if (normalized.includes("payment")) return ["Payments"] satisfies DpgLayer[];
  if (normalized.includes("identity")) {
    return ["Identity", "Civil registration"] satisfies DpgLayer[];
  }
  if (normalized.includes("registry")) return ["Registries"] satisfies DpgLayer[];
  if (normalized.includes("eligibility")) {
    return ["Registries", "Social protection"] satisfies DpgLayer[];
  }
  if (normalized.includes("grievance")) {
    return ["Service delivery", "Safeguards"] satisfies DpgLayer[];
  }
  if (normalized.includes("audit")) {
    return ["Data exchange", "Safeguards"] satisfies DpgLayer[];
  }
  if (normalized.includes("health") || normalized.includes("patient")) {
    return ["Health", "Identity"] satisfies DpgLayer[];
  }

  return [fallbackLayer];
}

function countryUseCaseMatch(
  country: (typeof countries)[number],
  useCaseId: string
) {
  if (!country.countryUseCases?.length) return undefined;

  const keywordsByUseCase: Record<string, string[]> = {
    "farmer-support": ["farmer", "agriculture", "land", "climate"],
    "cash-transfers": ["social", "pension", "payment", "safety", "protection"],
    "health-access": ["health", "patient", "medicine"],
    "education-credentials": ["youth", "jobs", "credential", "skills", "education"],
    "msme-trade": ["trade", "enterprise", "business", "msme", "youth"],
    "procurement-payments": ["procurement", "payment", "supplier", "treasury"],
  };

  const keywords = keywordsByUseCase[useCaseId] ?? [];

  return (
    country.countryUseCases.find((item) => {
      const haystack = `${item.title} ${item.description} ${item.systems.join(" ")}`.toLowerCase();
      return keywords.some((keyword) => haystack.includes(keyword));
    }) ?? country.countryUseCases[0]
  );
}

export function buildStack(input: StackInput) {
  const country =
    cohortCountries.find((item) => item.id === input.countryId) ??
    cohortCountries[0];
  const useCase =
    useCases.find((item) => item.id === input.useCaseId) ?? useCases[0];
  const matchedCountryUseCase = countryUseCaseMatch(country, useCase.id);

  const architectureRows = useCase.systems.map((system, index) => {
    const candidates = dpgsForSystem(system, country.relevantDpgs);
    const fallbackCandidates = dpgs.filter((dpg) => useCase.layers.includes(dpg.layer));
    const recommended = candidates.length
      ? candidates
      : fallbackCandidates.slice(index, index + 2);
    const layer = recommended[0]?.layer ?? useCase.layers[index % useCase.layers.length];
    const integrationLayers = integrationLayersForSystem(system, layer);
    const directIntegrations = country.integrationChecks.filter(
      (check) => integrationLayers.includes(check.layer)
    );
    const localIntegrations = directIntegrations;

    return {
      system,
      step: useCase.sequence[index] ?? system,
      owner:
        index === 0
          ? "programme team"
          : index === 1
            ? "identity or registry owner"
            : index === 2
              ? "policy and delivery team"
              : index === 3
                ? "payment or service operator"
                : "oversight and support team",
      dpgs: recommended,
      localIntegrations: localIntegrations.slice(0, 3),
      why: explainSystem(system),
      standards: Array.from(
        new Set(recommended.flatMap((dpg) => dpg.standards).slice(0, 4))
      ),
    };
  });

  const recommendedDpgs = Array.from(
    new Map(
      architectureRows.flatMap((row) => row.dpgs).map((dpg) => [dpg.id, dpg])
    ).values()
  );

  const gaps = [
    ...country.gaps,
    ...useCase.safeguards.slice(0, 2).map((item) => `confirm ${item}`),
  ];

  const sequence = useCase.sequence.map((step, index) => ({
    step,
    owner:
      index === 0
        ? "programme team"
        : index === 1
          ? "identity or registry owner"
          : index === 2
            ? "policy and delivery team"
            : index === 3
              ? "payment or service operator"
              : "oversight and support team",
  }));

  const relevantIntegrations = country.integrationChecks.filter((check) =>
    useCase.layers.includes(check.layer)
  );
  const readinessAverage = Math.round(
    country.metrics.reduce((sum, metric) => sum + metric.value, 0) /
      country.metrics.length
  );
  const fitScore = Math.min(
    92,
    Math.max(
      38,
      Math.round(
        readinessAverage * 0.72 +
          relevantIntegrations.length * 4 +
          recommendedDpgs.length * 1.5
      )
    )
  );

  return {
    country,
    useCase,
    matchedCountryUseCase,
    recommendedDpgs,
    architectureRows,
    relevantIntegrations,
    fitScore,
    analysis: [
      matchedCountryUseCase
        ? `${country.name}'s strongest fit is ${matchedCountryUseCase.title.toLowerCase()}: ${matchedCountryUseCase.outcome}`
        : `${country.name} has ${country.maturity.toLowerCase()}-stage DPI signals, so the first build should connect existing systems before adding new platforms.`,
      `${useCase.shortName} depends most on ${useCase.layers.slice(0, 3).join(", ").toLowerCase()}, which is why the stack prioritizes those layers first.`,
      relevantIntegrations.length
        ? `The country-specific checks include ${relevantIntegrations
            .slice(0, 3)
            .map((item) => item.name)
            .join(", ")}.`
        : "The first discovery session should identify local payment, registry, and service-channel integrations.",
    ],
    gaps,
    sequence,
    standards: Array.from(
      new Set(recommendedDpgs.flatMap((dpg) => dpg.standards).slice(0, 10))
    ),
    priorities: input.priorities,
  };
}
