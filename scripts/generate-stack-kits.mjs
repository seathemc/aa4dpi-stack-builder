import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(rootDir, "data");
const outputDir = path.join(rootDir, "generated", "stack-kits");
const generatedAt = "registry-v1";

async function readJson(fileName) {
  const contents = await readFile(path.join(dataDir, fileName), "utf8");
  return JSON.parse(contents);
}

function normalize(value) {
  return value.toLowerCase();
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function scoreDpgForUseCase(dpg, useCase, country) {
  const haystack = normalize(
    [
      dpg.name,
      dpg.layer,
      dpg.summary,
      dpg.useCaseFit.join(" "),
      dpg.standards.join(" "),
      dpg.implementationNotes.join(" "),
    ].join(" ")
  );
  const countryText = normalize(
    country.systems.map((system) => `${system.name} ${system.layer} ${system.note}`).join(" ")
  );

  let score = 0;

  if (useCase.layers.includes(dpg.layer)) score += 4;
  for (const keyword of useCase.keywords) {
    if (haystack.includes(keyword)) score += 2;
    if (countryText.includes(keyword) && haystack.includes(keyword)) score += 1;
  }
  for (const fit of dpg.useCaseFit) {
    if (useCase.keywords.some((keyword) => normalize(fit).includes(keyword))) {
      score += 2;
    }
  }

  return score;
}

function countrySystemsForUseCase(country, useCase) {
  const scored = country.systems
    .map((system) => {
    const text = normalize(`${system.name} ${system.layer} ${system.note}`);
      const keywordScore = useCase.keywords.filter((keyword) =>
        text.includes(keyword)
      ).length;
      const layerScore = useCase.layers.includes(system.layer) ? 1 : 0;

      return {
        system,
        score: keywordScore * 3 + layerScore,
      };
    })
    .filter((item) => item.score >= 2)
    .sort((a, b) => b.score - a.score || a.system.name.localeCompare(b.system.name));

  return scored.length
    ? scored.map((item) => item.system)
    : country.systems
        .filter((system) => useCase.layers.includes(system.layer))
        .slice(0, 4);
}

function openQuestionsForUseCase(country, useCase) {
  const selected = country.openQuestions.filter((question) => {
    const text = normalize(question);
    const keywordMatch = useCase.keywords.some((keyword) => text.includes(keyword));
    const exchangeMatch =
      useCase.layers.includes("Data exchange") && text.includes("data-sharing");

    return keywordMatch || exchangeMatch;
  });

  return selected.length ? selected : country.openQuestions;
}

function buildStackKit({ country, useCase, dpgs }) {
  const scored = dpgs
    .map((dpg) => ({
      dpg,
      score: scoreDpgForUseCase(dpg, useCase, country),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.dpg.name.localeCompare(b.dpg.name));

  const recommendedDpgs = scored.slice(0, 5).map(({ dpg }) => ({
    id: dpg.id,
    name: dpg.name,
    layer: dpg.layer,
    repository: dpg.repository,
    reason: `${dpg.name} maps to ${dpg.layer.toLowerCase()} needs for ${useCase.name.toLowerCase()}.`,
  }));
  const countrySystems = countrySystemsForUseCase(country, useCase);

  return {
    id: `${country.id}-${useCase.id}`,
    country: {
      id: country.id,
      name: country.name,
      flag: country.flag,
      cohort: country.cohort,
      region: country.region,
    },
    useCase: {
      id: useCase.id,
      name: useCase.name,
      problem: useCase.problem,
      outcome: useCase.outcome,
      layers: useCase.layers,
      systems: useCase.systems,
    },
    summary: `${country.name}: ${useCase.outcome}`,
    recommendedDpgs,
    countrySystems,
    standardsToCheck: unique([
      ...country.standardsToCheck,
      ...recommendedDpgs.flatMap((item) => {
        const dpg = dpgs.find((candidate) => candidate.id === item.id);
        return dpg?.standards ?? [];
      }),
    ]),
    openQuestions: openQuestionsForUseCase(country, useCase),
    generatedAt,
  };
}

function markdownTable(rows, columns) {
  const header = `| ${columns.map((column) => column.label).join(" | ")} |`;
  const divider = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => {
    const cells = columns.map((column) => String(column.value(row)).replace(/\n/g, " "));
    return `| ${cells.join(" | ")} |`;
  });
  return [header, divider, ...body].join("\n");
}

function renderMarkdown(kit) {
  const dpgTable = markdownTable(kit.recommendedDpgs, [
    { label: "DPG", value: (item) => `[${item.name}](${item.repository})` },
    { label: "Layer", value: (item) => item.layer },
    { label: "Why it fits", value: (item) => item.reason },
  ]);
  const systemsTable = markdownTable(kit.countrySystems, [
    { label: "Country system", value: (item) => item.name },
    { label: "Layer", value: (item) => item.layer },
    { label: "Status", value: (item) => item.status },
    { label: "Note", value: (item) => item.note },
  ]);

  return `# ${kit.country.flag} ${kit.country.name}: ${kit.useCase.name}

${kit.summary}

## Problem

${kit.useCase.problem}

## Outcome

${kit.useCase.outcome}

## Recommended open DPGs to evaluate

${dpgTable}

## Country systems to connect

${systemsTable}

## Standards to check

${kit.standardsToCheck.map((standard) => `- ${standard}`).join("\n")}

## Open questions

${kit.openQuestions.map((question) => `- ${question}`).join("\n")}
`;
}

async function main() {
  const [dpgs, countries, useCases] = await Promise.all([
    readJson("open-dpgs.json"),
    readJson("cohort-countries.json"),
    readJson("use-cases.json"),
  ]);
  const useCasesById = new Map(useCases.map((useCase) => [useCase.id, useCase]));
  const kits = [];

  await mkdir(outputDir, { recursive: true });

  for (const country of countries) {
    for (const useCaseId of country.priorityUseCases) {
      const useCase = useCasesById.get(useCaseId);
      if (!useCase) {
        throw new Error(`Unknown use case "${useCaseId}" for ${country.name}`);
      }
      const kit = buildStackKit({ country, useCase, dpgs });
      kits.push(kit);
      await writeFile(
        path.join(outputDir, `${kit.id}.json`),
        `${JSON.stringify(kit, null, 2)}\n`
      );
      await writeFile(path.join(outputDir, `${kit.id}.md`), renderMarkdown(kit));
    }
  }

  const index = `# Generated AA4DPI stack kits

These starter kits are generated from:

- \`data/open-dpgs.json\`
- \`data/cohort-countries.json\`
- \`data/use-cases.json\`

They are planning artifacts, not implementation approvals.

${kits
  .map(
    (kit) =>
      `- [${kit.country.name}: ${kit.useCase.name}](./${kit.id}.md) - ${kit.recommendedDpgs.length} DPGs, ${kit.countrySystems.length} country systems`
  )
  .join("\n")}
`;

  await writeFile(path.join(outputDir, "README.md"), index);
  console.log(`Generated ${kits.length} stack kits in ${path.relative(rootDir, outputDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
