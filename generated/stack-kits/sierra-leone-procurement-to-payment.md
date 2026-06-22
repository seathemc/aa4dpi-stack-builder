# 🇸🇱 Sierra Leone: Transparent procurement-to-payment

Sierra Leone: A supplier can be verified once, see contract and payment status, receive settlement through a trusted rail, and challenge delays or errors.

## Problem

Small suppliers can win contracts and still wait months for payment because procurement, treasury, identity, and banking systems do not share status.

## Outcome

A supplier can be verified once, see contract and payment status, receive settlement through a trusted rail, and challenge delays or errors.

## Recommended open DPGs to evaluate

| DPG | Layer | Why it fits |
| --- | --- | --- |
| [Open Contracting](https://github.com/open-contracting) | Operations | Open Contracting maps to operations needs for transparent procurement-to-payment. |
| [Mojaloop](https://github.com/mojaloop) | Payments | Mojaloop maps to payments needs for transparent procurement-to-payment. |
| [X-Road](https://github.com/nordic-institute/X-Road) | Data exchange | X-Road maps to data exchange needs for transparent procurement-to-payment. |
| [Apache APISIX](https://github.com/apache/apisix) | Data exchange | Apache APISIX maps to data exchange needs for transparent procurement-to-payment. |
| [OpenCRVS](https://github.com/opencrvs) | Civil registration | OpenCRVS maps to civil registration needs for transparent procurement-to-payment. |

## Country systems to connect

| Country system | Layer | Status | Note |
| --- | --- | --- | --- |
| eGP / NPPA | Operations | mapped | Electronic procurement, supplier, award, and contract records. |
| IFMIS | Operations | mapped | Treasury approval, budget execution, and payment instruction. |
| Temenos T24 / Bank settlement | Payments | mapped | Settlement confirmation and payment status for supplier payments. |
| Government Service Bus / X-Road 7.7.1 environments | Data exchange | mapped | Secure data exchange layer connecting approved agencies through service contracts. |

## Standards to check

- X-Road service registry
- OCDS
- OpenAPI
- audit logging
- data-sharing agreements
- ISO 20022 alignment
- interoperable payment APIs
- signed messages
- service registry
- API gateway policies
- access logging
- civil registration workflows
- API integration

## Open questions

- Who signs cross-agency data-sharing agreements?
- What supplier payment status can be made visible?
