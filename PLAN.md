# AA4DPI Stack Builder plan

## Product goal

Build a public, open-source tool that helps African governments and partners
understand how existing Digital Public Goods can be assembled into safe,
country-owned DPI systems.

The tool should be showable during Open Source Week as actual code, while being
honest about its status: a prototype and reference implementation, not a
production national platform.

## Phase 2.5: Stack Builder prototype

This is the middle ground between a catalogue and a full DPG.

### What ships

- Public GitHub repo
- GitBook-style frontend
- Open DPG catalogue
- Country and use-case selectors
- Generated DPI stack output
- Standards and safeguards mapping
- Country readiness view
- Exportable implementation brief concept

### User flow

1. A policymaker opens the AA4DPI docs home.
2. They learn what DPI is in plain language.
3. They open the DPG catalogue and see real open-source tools.
4. They launch the Stack Builder.
5. They select a country, a use case, maturity, and priorities.
6. The app generates a practical stack: systems, DPGs, standards, safeguards,
   risks, and implementation sequence.

## Phase 3: Data Exchange Sandbox

The next real-code step is an open-source sandbox for safe government data
exchange.

### What it should prove

- Agencies can exchange verified answers without creating one giant central
  database.
- Every request has a purpose, requesting agency, data scope, authorization
  decision, and audit log.
- API contracts can be exported as OpenAPI.
- Safeguards are visible in the workflow, not added later.

### First sandbox flow

Social Registry asks Civil Registry:

> Is this birth registration valid for this household benefit application?

The sandbox should show:

- request payload
- authorization check
- signed response
- data minimization
- audit entry
- redress/grievance reference

## What this is not

- Not a production data exchange layer
- Not an official UNDP system
- Not a replacement for national architecture decisions
- Not a country scorecard without validation

## What it can become

- A DPG catalogue and evaluation tool
- A country readiness workspace
- A safeguards-by-design demonstrator
- A reference implementation for data exchange API patterns
- A training tool for ministries, UNDP country offices, partners, and local
  implementers
