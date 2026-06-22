# 🇿🇲 Zambia: Agriculture and farmer support

Zambia: A farmer can be registered once, verified across programmes, paid through trusted rails, and supported through a clear grievance path.

## Problem

Farmers are often enrolled in disconnected programmes, making subsidies, insurance, extension, and payments slow to verify.

## Outcome

A farmer can be registered once, verified across programmes, paid through trusted rails, and supported through a clear grievance path.

## Recommended open DPGs to evaluate

| DPG | Layer | Why it fits |
| --- | --- | --- |
| [OpenSPP](https://github.com/OpenSPP) | Registries | OpenSPP maps to registries needs for agriculture and farmer support. |
| [X-Road](https://github.com/nordic-institute/X-Road) | Data exchange | X-Road maps to data exchange needs for agriculture and farmer support. |
| [Apache APISIX](https://github.com/apache/apisix) | Data exchange | Apache APISIX maps to data exchange needs for agriculture and farmer support. |
| [Mojaloop](https://github.com/mojaloop) | Payments | Mojaloop maps to payments needs for agriculture and farmer support. |
| [MOSIP](https://github.com/mosip) | Identity | MOSIP maps to identity needs for agriculture and farmer support. |

## Country systems to connect

| Country system | Layer | Status | Note |
| --- | --- | --- | --- |
| Community Forest Management Group records | Registries | mapped | Community forest stewardship, eligibility, and reporting records. |
| Smart Zambia Government Service Bus | Data exchange | mapped | Service bus pattern for land, health, finance, identity, and other agency exchange. |
| Timber Traceability System | Registries | mapped | Permit, provenance, revenue, and forest-product traceability records. |
| ZILAS land administration | Registries | mapped | Land administration records, title data, and customary land workflows. |

## Standards to check

- OpenAPI
- service registry
- FHIR
- geospatial data
- audit logging
- Odoo modules
- registry workflows
- API integration
- signed messages
- API gateway policies
- access logging
- ISO 20022 alignment
- interoperable payment APIs
- OpenID Connect
- biometric standards

## Open questions

- How will customary land records be represented?
- What forest provenance data can be shared safely?
