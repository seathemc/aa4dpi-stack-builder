# Data

The prototype currently stores seed data in `src/lib/data.ts` so the frontend can
import it directly with TypeScript types.

The intended public data model has four object families:

- DPGs and open-source tools
- use-case reference stacks
- country readiness profiles
- standards and safeguards

As the repo matures, these can move into JSON files validated by the schemas in
`schemas/`.
