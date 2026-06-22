# 🇪🇹 Ethiopia: One-stop digital public services

Ethiopia: A person can start one service journey, verify identity once, submit only required data, pay or receive funds, and track status.

## Problem

People are forced to move between disconnected portals, offices, and payment channels to complete a single public service.

## Outcome

A person can start one service journey, verify identity once, submit only required data, pay or receive funds, and track status.

## Recommended open DPGs to evaluate

| DPG | Layer | Why it fits |
| --- | --- | --- |
| [Apache APISIX](https://github.com/apache/apisix) | Data exchange | Apache APISIX maps to data exchange needs for one-stop digital public services. |
| [X-Road](https://github.com/nordic-institute/X-Road) | Data exchange | X-Road maps to data exchange needs for one-stop digital public services. |
| [ODK](https://github.com/getodk) | Service delivery | ODK maps to service delivery needs for one-stop digital public services. |
| [Mojaloop](https://github.com/mojaloop) | Payments | Mojaloop maps to payments needs for one-stop digital public services. |
| [MOSIP](https://github.com/mosip) | Identity | MOSIP maps to identity needs for one-stop digital public services. |

## Country systems to connect

| Country system | Layer | Status | Note |
| --- | --- | --- | --- |
| MESOB one-stop service platform | Service delivery | mapped | Citizen-facing service gateway and service orchestration layer. |
| MESOB Pay / wallet roadmap | Payments | roadmap | Future sovereign payment gateway or wallet for public service flows. |
| APISIX integration gateway | Data exchange | mapped | API routing, authorization, audit logging, and ministry data access. |
| Community Service Centers | Service delivery | mapped | Assisted access points for people who cannot use digital channels alone. |
| Fayda Digital ID | Identity | mapped | Authentication and remote identity verification for service users. |
| OpenAgriNet | Registries | mapped | Agriculture records and service integration opportunity. |

## Standards to check

- OpenID Connect
- OpenAPI
- API gateway policies
- access logging
- wallet regulation
- signed messages
- service registry
- audit logging
- XForms
- offline data collection
- ISO 20022 alignment
- interoperable payment APIs
- biometric standards
- API integration

## Open questions

- Which services should be first through MESOB?
- What data can ministries expose through the gateway?
