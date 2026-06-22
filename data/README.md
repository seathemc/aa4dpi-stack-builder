# Data Registry

This folder contains the first machine-readable AA4DPI registry.

The frontend still imports seed data from `src/lib/data.ts`, but these JSON files
are the start of the public registry that can be validated, reviewed, reused, and
migrated into other repositories later.

## Files

- `open-dpgs.json`: open Digital Public Goods, open-source tools, standards, and
  repository links to evaluate by DPI layer
- `use-cases.json`: reusable DPI use cases and the systems/layers behind them
- `cohort-countries.json`: Cohort 1 country systems, agencies, standards, and
  open questions from the AA4DPI materials

## Generate artifacts

Run:

```bash
npm run generate:kits
```

The generator writes country/use-case starter kits to `generated/stack-kits/`.

## Validation direction

The registry shape is described in `schemas/`. A future PR can wire full JSON
Schema validation into CI once the content model stabilizes.
