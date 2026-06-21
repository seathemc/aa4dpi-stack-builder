import { countries, dpgs, useCases } from "@/lib/data";

export type StackInput = {
  countryId: string;
  useCaseId: string;
  maturity: "Early" | "Building" | "Scaling";
  priorities: string[];
};

export function buildStack(input: StackInput) {
  const country =
    countries.find((item) => item.id === input.countryId) ?? countries[0];
  const useCase =
    useCases.find((item) => item.id === input.useCaseId) ?? useCases[0];

  const recommendedDpgs = dpgs.filter((dpg) => {
    if (useCase.layers.includes(dpg.layer)) return true;
    return useCase.systems.some((system) =>
      dpg.fit.some((fit) => system.toLowerCase().includes(fit.split(" ")[0]))
    );
  });

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

  return {
    country,
    useCase,
    recommendedDpgs,
    gaps,
    sequence,
    standards: Array.from(
      new Set(recommendedDpgs.flatMap((dpg) => dpg.standards).slice(0, 10))
    ),
    priorities: input.priorities,
  };
}
