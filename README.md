# AA4DPI Stack Builder

An open-source working prototype for the Africa Accelerator for Digital Public
Infrastructure.

The Stack Builder helps policy teams, partners, and technical communities see how
Digital Public Goods, open standards, safeguards, and country readiness questions
fit together for African DPI use cases.

It does not claim to be national infrastructure. It is a planning and learning
tool: a practical way to move from "DPI is important" to "these are the systems,
standards, safeguards, and investment gaps a country needs to address."

## What this repo includes

- A GitBook-style AA4DPI documentation interface
- An open DPG catalogue with real GitHub repositories
- A use-case-driven DPI Stack Builder
- Seed country readiness profiles
- A runnable data-exchange reference example under `examples/`
- A data exchange sandbox with a working test API route
- Plain-language safeguards and implementation guidance

## Demo path

1. Open the docs home
2. Browse the DPG catalogue
3. Build a stack for a country and use case
4. Review the generated implementation sequence
5. Open the data exchange sandbox
6. Run a test request and inspect the audit trail

## Why this matters

African countries do not need to start every DPI project from zero. There are
usable open-source tools and standards across identity, payments, data exchange,
social protection, health, education, registries, procurement, and service
delivery. The hard part is choosing, combining, governing, financing, and
operating them safely.

AA4DPI can help by turning the ecosystem into practical country pathways.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Data exchange reference

```bash
npm run test:exchange
node examples/data-exchange-reference/demo.mjs
```

The reference example shows how a simple exchange service can check requester
agency, purpose, allowed roles, required fields, response minimization, and
audit logs for Cohort 1-style data flows.

## Status

This is an early public prototype. The data is illustrative and should be
validated before any country-level recommendation is made.
