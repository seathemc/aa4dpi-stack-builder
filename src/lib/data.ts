export type DpgLayer =
  | "Identity"
  | "Civil registration"
  | "Payments"
  | "Data exchange"
  | "Registries"
  | "Social protection"
  | "Health"
  | "Education"
  | "Service delivery"
  | "Safeguards"
  | "Operations";

export type Dpg = {
  id: string;
  name: string;
  layer: DpgLayer;
  github: string;
  description: string;
  fit: string[];
  maturity: "Established" | "Growing" | "Reference" | "Specialized";
  standards: string[];
};

export type UseCase = {
  id: string;
  name: string;
  shortName: string;
  problem: string;
  outcome: string;
  layers: DpgLayer[];
  systems: string[];
  safeguards: string[];
  sequence: string[];
};

export type CountryProfile = {
  id: string;
  name: string;
  region: string;
  maturity: "Early" | "Building" | "Scaling";
  summary: string;
  strengths: string[];
  gaps: string[];
  metrics: {
    label: string;
    value: number;
    note: string;
  }[];
};

export type Standard = {
  id: string;
  name: string;
  domain: string;
  link: string;
  why: string;
};

export const dpgs: Dpg[] = [
  {
    id: "mosip",
    name: "MOSIP",
    layer: "Identity",
    github: "https://github.com/mosip",
    description:
      "Modular open-source foundational identity platform for enrollment, identity repository, authentication, and integrations.",
    fit: ["identity verification", "beneficiary onboarding", "credential checks"],
    maturity: "Established",
    standards: ["OpenID Connect", "biometric standards", "API integration"],
  },
  {
    id: "opencrvs",
    name: "OpenCRVS",
    layer: "Civil registration",
    github: "https://github.com/opencrvs",
    description:
      "Civil registration platform for births, deaths, and vital events.",
    fit: ["legal identity", "birth registration", "vital statistics"],
    maturity: "Established",
    standards: ["civil registration workflows", "API integration"],
  },
  {
    id: "mojaloop",
    name: "Mojaloop",
    layer: "Payments",
    github: "https://github.com/mojaloop",
    description:
      "Open-source reference model and software for interoperable inclusive instant payment systems.",
    fit: ["cash transfers", "merchant payments", "low-cost payment rails"],
    maturity: "Established",
    standards: ["ISO 20022 alignment", "interoperable payment APIs"],
  },
  {
    id: "xroad",
    name: "X-Road",
    layer: "Data exchange",
    github: "https://github.com/nordic-institute/X-Road",
    description:
      "Secure data exchange layer for approved organizations to exchange signed, logged messages.",
    fit: ["agency-to-agency exchange", "audit logs", "trusted service queries"],
    maturity: "Established",
    standards: ["signed messages", "service registry", "audit logging"],
  },
  {
    id: "openg2p",
    name: "OpenG2P",
    layer: "Social protection",
    github: "https://github.com/openg2p",
    description:
      "Open platform for registries, eligibility, enrollment, and government-to-person benefit delivery.",
    fit: ["cash transfers", "social registry", "benefit delivery"],
    maturity: "Growing",
    standards: ["registry APIs", "payment integration", "eligibility rules"],
  },
  {
    id: "openspp",
    name: "OpenSPP",
    layer: "Registries",
    github: "https://github.com/OpenSPP",
    description:
      "Modular social protection platform with registries and programme operations, including farmer registry patterns.",
    fit: ["farmer support", "social protection", "programme registries"],
    maturity: "Growing",
    standards: ["Odoo modules", "registry workflows", "API integration"],
  },
  {
    id: "dhis2",
    name: "DHIS2",
    layer: "Health",
    github: "https://github.com/dhis2",
    description:
      "Health information system used for reporting, analytics, public health programmes, and facility data.",
    fit: ["health access", "public health reporting", "programme dashboards"],
    maturity: "Established",
    standards: ["FHIR integrations", "aggregate reporting", "data dictionaries"],
  },
  {
    id: "openmrs",
    name: "OpenMRS",
    layer: "Health",
    github: "https://github.com/openmrs",
    description:
      "Open-source electronic medical record system for patient-level care.",
    fit: ["patient records", "referrals", "facility workflows"],
    maturity: "Established",
    standards: ["FHIR", "OpenHIE patterns"],
  },
  {
    id: "openfn",
    name: "OpenFn",
    layer: "Operations",
    github: "https://github.com/OpenFn",
    description:
      "Workflow and integration platform for connecting systems and automating public-sector processes.",
    fit: ["system integration", "workflow automation", "data movement"],
    maturity: "Specialized",
    standards: ["workflow definitions", "connectors", "API integration"],
  },
  {
    id: "openfisca",
    name: "OpenFisca",
    layer: "Operations",
    github: "https://github.com/openfisca/openfisca-core",
    description:
      "Rules-as-code engine for tax, benefits, eligibility, and policy simulation.",
    fit: ["eligibility rules", "subsidies", "benefit policy simulation"],
    maturity: "Established",
    standards: ["rules-as-code", "policy modeling"],
  },
  {
    id: "odk",
    name: "ODK",
    layer: "Service delivery",
    github: "https://github.com/getodk",
    description:
      "Open-source field data collection tools for offline surveys and programme operations.",
    fit: ["field enrollment", "offline verification", "monitoring"],
    maturity: "Established",
    standards: ["XForms", "offline data collection"],
  },
  {
    id: "ocds",
    name: "Open Contracting",
    layer: "Operations",
    github: "https://github.com/open-contracting",
    description:
      "Open Contracting Data Standard and tools for publishing and analyzing procurement data.",
    fit: ["procurement transparency", "supplier participation", "public spending"],
    maturity: "Established",
    standards: ["OCDS"],
  },
];

export const useCases: UseCase[] = [
  {
    id: "farmer-support",
    name: "Agriculture and farmer support",
    shortName: "Farmer support",
    problem:
      "Farmers are often enrolled in disconnected programmes, making subsidies, insurance, extension, and payments slow to verify.",
    outcome:
      "A farmer can be registered once, verified across programmes, paid through trusted rails, and supported through a clear grievance path.",
    layers: [
      "Registries",
      "Identity",
      "Payments",
      "Data exchange",
      "Service delivery",
      "Safeguards",
    ],
    systems: [
      "Farmer registry",
      "Identity verification",
      "Eligibility rules",
      "Payment rail",
      "Grievance workflow",
      "Audit log",
    ],
    safeguards: [
      "clear consent and purpose",
      "offline enrollment path",
      "appeal and correction process",
      "audit trail for subsidy delivery",
    ],
    sequence: [
      "Register farmer and farm profile",
      "Verify identity or civil registration where required",
      "Check eligibility against programme rules",
      "Route approved payment or input voucher",
      "Record delivery, complaint, and outcome evidence",
    ],
  },
  {
    id: "cash-transfers",
    name: "Social protection and cash transfers",
    shortName: "Cash transfers",
    problem:
      "Benefits can miss eligible households when identity, social registries, eligibility rules, and payment systems do not work together.",
    outcome:
      "A household can be identified, assessed, enrolled, paid, and given a way to challenge errors.",
    layers: [
      "Social protection",
      "Identity",
      "Payments",
      "Data exchange",
      "Safeguards",
    ],
    systems: [
      "Social registry",
      "Eligibility engine",
      "Payment switch",
      "Case management",
      "Complaint and appeal channel",
    ],
    safeguards: [
      "do-no-harm exclusion review",
      "payment failure handling",
      "redress channel",
      "minimal data sharing between agencies",
    ],
    sequence: [
      "Identify potential households",
      "Confirm eligibility",
      "Enroll beneficiary with consent and notice",
      "Pay through inclusive channels",
      "Reconcile failures and resolve complaints",
    ],
  },
  {
    id: "health-access",
    name: "Health access and insurance",
    shortName: "Health access",
    problem:
      "Patients, facilities, insurance schemes, and public health systems often hold partial records that do not connect safely.",
    outcome:
      "A patient can be identified, referred, covered, treated, and counted in public health data with privacy protected.",
    layers: ["Health", "Identity", "Payments", "Data exchange", "Safeguards"],
    systems: [
      "Patient record",
      "Facility registry",
      "Claims workflow",
      "Health data exchange",
      "Public health reporting",
    ],
    safeguards: [
      "strong health privacy controls",
      "role-based access",
      "patient redress path",
      "data minimization for claims",
    ],
    sequence: [
      "Identify patient and facility",
      "Check coverage or eligibility",
      "Record service and referral",
      "Submit claim or payment request",
      "Send aggregate indicators for planning",
    ],
  },
  {
    id: "education-credentials",
    name: "Education records and credentials",
    shortName: "Education credentials",
    problem:
      "Learners struggle to carry trusted records between schools, scholarship programmes, employers, and borders.",
    outcome:
      "A learner can receive portable credentials that institutions can verify without manual paperwork.",
    layers: ["Education", "Identity", "Registries", "Data exchange", "Safeguards"],
    systems: [
      "Learner registry",
      "Credential issuer",
      "Scholarship workflow",
      "Verification service",
    ],
    safeguards: [
      "student consent",
      "age-appropriate privacy",
      "credential revocation rules",
      "anti-fraud verification",
    ],
    sequence: [
      "Create learner record",
      "Issue credential",
      "Share credential with consent",
      "Verify institution and status",
      "Use record for scholarship or employment pathway",
    ],
  },
  {
    id: "msme-trade",
    name: "MSMEs and cross-border trade",
    shortName: "MSME trade",
    problem:
      "Small firms face duplicated paperwork, weak trust, expensive payments, and fragmented border services.",
    outcome:
      "A firm can prove its identity, pay digitally, share trusted credentials, and access trade services more easily.",
    layers: [
      "Registries",
      "Payments",
      "Data exchange",
      "Service delivery",
      "Safeguards",
    ],
    systems: [
      "Business registry",
      "Tax or customs profile",
      "Payment rail",
      "Credential wallet",
      "Trade service workflow",
    ],
    safeguards: [
      "commercial data protection",
      "clear dispute process",
      "anti-fraud controls",
      "cross-border data-sharing rules",
    ],
    sequence: [
      "Verify business identity",
      "Issue or check trade credential",
      "Route payment or fee",
      "Share permitted customs or tax data",
      "Record service outcome and dispute options",
    ],
  },
];

export const countries: CountryProfile[] = [
  {
    id: "rwanda",
    name: "Rwanda",
    region: "East Africa",
    maturity: "Scaling",
    summary:
      "Strong public service digitization and high policy focus make Rwanda a good demo country for integrated DPI use cases.",
    strengths: ["digital services", "financial inclusion", "coordinated delivery"],
    gaps: ["cross-system safeguards evidence", "public API visibility"],
    metrics: [
      { label: "Identity readiness", value: 78, note: "strong coverage base" },
      { label: "Payment reach", value: 74, note: "digital finance momentum" },
      { label: "Registry quality", value: 68, note: "needs use-case validation" },
      { label: "API readiness", value: 61, note: "integration evidence needed" },
      { label: "Safeguards maturity", value: 58, note: "map by use case" },
    ],
  },
  {
    id: "nigeria",
    name: "Nigeria",
    region: "West Africa",
    maturity: "Building",
    summary:
      "Large-scale identity and payments activity creates major DPI potential, with coordination and inclusion as central challenges.",
    strengths: ["identity scale", "payments ecosystem", "private innovation"],
    gaps: ["federated coordination", "last-mile inclusion", "data exchange governance"],
    metrics: [
      { label: "Identity readiness", value: 72, note: "large register" },
      { label: "Payment reach", value: 70, note: "diverse providers" },
      { label: "Registry quality", value: 52, note: "fragmented by programme" },
      { label: "API readiness", value: 49, note: "coordination needed" },
      { label: "Safeguards maturity", value: 46, note: "trust and redress gaps" },
    ],
  },
  {
    id: "malawi",
    name: "Malawi",
    region: "Southern Africa",
    maturity: "Building",
    summary:
      "Useful country for showing how inclusion and offline access shape digital ID, social protection, and service delivery.",
    strengths: ["legal identity momentum", "inclusion focus", "partner alignment"],
    gaps: ["offline access", "payment reach", "operational resilience"],
    metrics: [
      { label: "Identity readiness", value: 64, note: "verification path emerging" },
      { label: "Payment reach", value: 43, note: "last mile matters" },
      { label: "Registry quality", value: 55, note: "programme alignment needed" },
      { label: "API readiness", value: 38, note: "early exchange layer" },
      { label: "Safeguards maturity", value: 57, note: "inclusion work visible" },
    ],
  },
  {
    id: "south-africa",
    name: "South Africa",
    region: "Southern Africa",
    maturity: "Building",
    summary:
      "Strong institutional capacity and digital roadmap work make data exchange, safeguards, and trust architecture the right focus.",
    strengths: ["institutional capacity", "service delivery base", "digital roadmap"],
    gaps: ["interoperability at scale", "public trust", "cross-agency delivery"],
    metrics: [
      { label: "Identity readiness", value: 76, note: "strong foundations" },
      { label: "Payment reach", value: 67, note: "mature finance system" },
      { label: "Registry quality", value: 63, note: "agency alignment needed" },
      { label: "API readiness", value: 58, note: "roadmap in progress" },
      { label: "Safeguards maturity", value: 62, note: "embed in architecture" },
    ],
  },
  {
    id: "tanzania",
    name: "Tanzania",
    region: "East Africa",
    maturity: "Scaling",
    summary:
      "Interoperable payments momentum makes Tanzania a strong example for payments-linked public service delivery.",
    strengths: ["instant payments", "mobile money", "regional relevance"],
    gaps: ["registry integration", "evidence by use case", "redress workflows"],
    metrics: [
      { label: "Identity readiness", value: 65, note: "connect to services" },
      { label: "Payment reach", value: 82, note: "strong rail momentum" },
      { label: "Registry quality", value: 54, note: "needs mapping" },
      { label: "API readiness", value: 55, note: "payments-first opportunity" },
      { label: "Safeguards maturity", value: 48, note: "show user protections" },
    ],
  },
];

export const standards: Standard[] = [
  {
    id: "dpg-standard",
    name: "DPG Standard",
    domain: "Public-good screen",
    link: "https://github.com/DPGAlliance/DPG-Standard",
    why: "Checks open licensing, documentation, privacy, harm prevention, and SDG relevance.",
  },
  {
    id: "govstack",
    name: "GovStack building blocks",
    domain: "Architecture",
    link: "https://specs.govstack.global/",
    why: "Explains how reusable government components can fit together.",
  },
  {
    id: "openapi",
    name: "OpenAPI",
    domain: "API contracts",
    link: "https://github.com/OAI/OpenAPI-Specification",
    why: "Makes service interfaces understandable and testable.",
  },
  {
    id: "openid",
    name: "OpenID Connect",
    domain: "Identity claims",
    link: "https://openid.net/developers/specs/",
    why: "Common pattern for authentication and identity claims.",
  },
  {
    id: "vc",
    name: "W3C Verifiable Credentials",
    domain: "Credentials",
    link: "https://www.w3.org/TR/vc-data-model-2.0/",
    why: "Portable proofs for learner, business, farmer, and eligibility credentials.",
  },
  {
    id: "fhir",
    name: "HL7 FHIR",
    domain: "Health exchange",
    link: "https://hl7.org/fhir/",
    why: "Health data exchange standard for records, referrals, claims, and reporting.",
  },
];

export const priorities = [
  "Inclusion",
  "Payments",
  "Identity",
  "Data exchange",
  "Safeguards",
  "Financing",
] as const;
