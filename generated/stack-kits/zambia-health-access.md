# 🇿🇲 Zambia: Health access and medicine accountability

Zambia: A patient or facility can be identified, services and medicines can be tracked, and public health data can be produced with privacy protected.

## Problem

Patients, facilities, supply chains, insurance schemes, and reporting systems often hold partial records that do not connect safely.

## Outcome

A patient or facility can be identified, services and medicines can be tracked, and public health data can be produced with privacy protected.

## Recommended open DPGs to evaluate

| DPG | Layer | Why it fits |
| --- | --- | --- |
| [DHIS2](https://github.com/dhis2) | Health | DHIS2 maps to health needs for health access and medicine accountability. |
| [OpenMRS](https://github.com/openmrs) | Health | OpenMRS maps to health needs for health access and medicine accountability. |
| [Apache APISIX](https://github.com/apache/apisix) | Data exchange | Apache APISIX maps to data exchange needs for health access and medicine accountability. |
| [Mojaloop](https://github.com/mojaloop) | Payments | Mojaloop maps to payments needs for health access and medicine accountability. |
| [MOSIP](https://github.com/mosip) | Identity | MOSIP maps to identity needs for health access and medicine accountability. |

## Country systems to connect

| Country system | Layer | Status | Note |
| --- | --- | --- | --- |
| Smart Care Pro / DHIS2 / eLMIS | Health | mapped | Patient, facility, medicine, and health-reporting systems. |
| Smart Zambia Government Service Bus | Data exchange | mapped | Service bus pattern for land, health, finance, identity, and other agency exchange. |

## Standards to check

- OpenAPI
- service registry
- FHIR
- geospatial data
- audit logging
- FHIR integrations
- aggregate reporting
- data dictionaries
- OpenHIE patterns
- API gateway policies
- access logging
- ISO 20022 alignment
- interoperable payment APIs
- OpenID Connect
- biometric standards
- API integration

## Open questions

- How will identity, health, and payment data be separated?
