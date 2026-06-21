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
  flag: string;
  region: string;
  maturity: "Early" | "Building" | "Scaling";
  readiness: number;
  relevantDpgs: string[];
  priorityUseCases: string[];
  publicSystems: string[];
  integrationChecks: {
    name: string;
    layer: DpgLayer;
    kind: "national system" | "payment rail" | "private rail" | "service channel";
    note: string;
  }[];
  summary: string;
  strengths: string[];
  gaps: string[];
  metrics: {
    label: string;
    value: number;
    note: string;
  }[];
  countryData?: {
    label: string;
    value: string;
    year: string;
    source: string;
    note: string;
  }[];
  implementationFocus?: {
    label: string;
    value: string;
  }[];
  countryUseCases?: {
    title: string;
    description: string;
    systems: string[];
    outcome: string;
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
    id: "apisix",
    name: "Apache APISIX",
    layer: "Data exchange",
    github: "https://github.com/apache/apisix",
    description:
      "Open-source API gateway for routing, authentication, observability, and policy controls across services.",
    fit: ["API gateway", "service orchestration", "data exchange"],
    maturity: "Established",
    standards: ["OpenAPI", "API gateway policies", "access logging"],
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
  {
    id: "procurement-payments",
    name: "Transparent procurement-to-payment",
    shortName: "Procurement to payment",
    problem:
      "Small suppliers can win contracts and still wait months for payment because procurement, treasury, identity, and banking systems do not share status.",
    outcome:
      "A supplier can be verified once, see contract and payment status, receive settlement through a trusted rail, and challenge delays or errors.",
    layers: [
      "Registries",
      "Civil registration",
      "Payments",
      "Data exchange",
      "Operations",
      "Safeguards",
    ],
    systems: [
      "Supplier registry",
      "Procurement system",
      "Treasury or IFMIS",
      "Bank settlement rail",
      "Public status and audit log",
    ],
    safeguards: [
      "supplier consent and notice",
      "minimal validation tokens",
      "procurement audit trail",
      "payment dispute channel",
    ],
    sequence: [
      "Verify supplier and beneficial ownership",
      "Record awarded contract",
      "Confirm delivery and treasury approval",
      "Settle payment through bank or wallet rail",
      "Publish permitted status and audit evidence",
    ],
  },
];

export const countries: CountryProfile[] = [
  {
    id: "rwanda",
    name: "Rwanda",
    flag: "🇷🇼",
    region: "East Africa",
    maturity: "Scaling",
    readiness: 62,
    relevantDpgs: ["OpenSPP", "X-Road", "OpenG2P", "DHIS2"],
    priorityUseCases: ["Farmer support", "Financial inclusion", "Public services"],
    publicSystems: ["Irembo-style service delivery", "financial inclusion use cases"],
    integrationChecks: [
      {
        name: "MTN MoMo",
        layer: "Payments",
        kind: "private rail",
        note: "Check merchant, wallet, bulk disbursement, and public-service payment APIs.",
      },
      {
        name: "Airtel Money",
        layer: "Payments",
        kind: "private rail",
        note: "Check reach, reconciliation, reversals, and beneficiary support flows.",
      },
      {
        name: "Irembo",
        layer: "Service delivery",
        kind: "service channel",
        note: "Check where farmer or household services can reuse existing digital service workflows.",
      },
      {
        name: "National ID / civil registry",
        layer: "Identity",
        kind: "national system",
        note: "Check verification rules, consent, and offline exception handling.",
      },
    ],
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
    flag: "🇳🇬",
    region: "West Africa",
    maturity: "Building",
    readiness: 58,
    relevantDpgs: ["MOSIP", "OpenCRVS", "Mojaloop", "OpenFn"],
    priorityUseCases: ["Identity", "Payments", "Social protection"],
    publicSystems: ["national identity ecosystem", "payments ecosystem"],
    integrationChecks: [
      {
        name: "NIN / NIMC",
        layer: "Identity",
        kind: "national system",
        note: "Check identity verification coverage, API access, and consent controls.",
      },
      {
        name: "BVN",
        layer: "Identity",
        kind: "national system",
        note: "Check when bank-linked identity signals are appropriate for public-service delivery.",
      },
      {
        name: "NIBSS / instant payment rails",
        layer: "Payments",
        kind: "payment rail",
        note: "Check payout routing, account resolution, payment failure handling, and settlement.",
      },
      {
        name: "State programme registries",
        layer: "Registries",
        kind: "national system",
        note: "Check duplication, data-sharing permissions, and federal-state coordination.",
      },
    ],
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
    flag: "🇲🇼",
    region: "Southern Africa",
    maturity: "Building",
    readiness: 51,
    relevantDpgs: ["OpenCRVS", "OpenG2P", "ODK", "X-Road"],
    priorityUseCases: ["Legal identity", "Offline verification", "Social protection"],
    publicSystems: ["national registration", "offline verification priorities"],
    integrationChecks: [
      {
        name: "National Registration Bureau",
        layer: "Identity",
        kind: "national system",
        note: "Check verification coverage, offline exception rules, and civil registration links.",
      },
      {
        name: "Mobile money providers",
        layer: "Payments",
        kind: "private rail",
        note: "Check rural cash-out points, beneficiary support, and payment reversals.",
      },
      {
        name: "Social Cash Transfer systems",
        layer: "Social protection",
        kind: "national system",
        note: "Check registry quality, targeting data, grievance workflow, and audit trail.",
      },
    ],
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
    flag: "🇿🇦",
    region: "Southern Africa",
    maturity: "Building",
    readiness: 64,
    relevantDpgs: ["X-Road", "OpenFn", "OpenFisca", "Open Contracting"],
    priorityUseCases: ["Data exchange", "Service delivery", "Safeguards"],
    publicSystems: ["digital roadmap", "foundational data exchange work"],
    integrationChecks: [
      {
        name: "Department of Home Affairs identity systems",
        layer: "Identity",
        kind: "national system",
        note: "Check identity verification rules, exception handling, and privacy controls.",
      },
      {
        name: "PayShap / bank payment rails",
        layer: "Payments",
        kind: "payment rail",
        note: "Check low-value payouts, account resolution, fees, and reconciliation.",
      },
      {
        name: "SASSA grant systems",
        layer: "Social protection",
        kind: "national system",
        note: "Check eligibility, beneficiary support, payment failure handling, and appeals.",
      },
      {
        name: "Public-service portals",
        layer: "Service delivery",
        kind: "service channel",
        note: "Check if existing channels can expose status, complaints, and service outcomes.",
      },
    ],
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
    flag: "🇹🇿",
    region: "East Africa",
    maturity: "Scaling",
    readiness: 60,
    relevantDpgs: ["Mojaloop", "OpenG2P", "OpenSPP", "DHIS2"],
    priorityUseCases: ["Instant payments", "Farmer support", "Health access"],
    publicSystems: ["instant payment momentum", "mobile money ecosystem"],
    integrationChecks: [
      {
        name: "M-Pesa Tanzania",
        layer: "Payments",
        kind: "private rail",
        note: "Check wallet disbursements, merchant acceptance, agent reach, and reconciliation.",
      },
      {
        name: "Tigo Pesa / Airtel Money",
        layer: "Payments",
        kind: "private rail",
        note: "Check interoperability, failure handling, and beneficiary support.",
      },
      {
        name: "National ID authority systems",
        layer: "Identity",
        kind: "national system",
        note: "Check verification API access and offline enrollment paths.",
      },
      {
        name: "Health and agriculture programme systems",
        layer: "Registries",
        kind: "national system",
        note: "Check whether existing registries can be reused before new ones are created.",
      },
    ],
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
  {
    id: "kenya",
    name: "Kenya",
    flag: "🇰🇪",
    region: "East Africa",
    maturity: "Scaling",
    readiness: 66,
    relevantDpgs: ["Mojaloop", "OpenSPP", "OpenFn", "ODK"],
    priorityUseCases: ["Financial inclusion", "Farmer support", "MSME services"],
    publicSystems: ["mobile money ecosystem", "digital government services"],
    integrationChecks: [
      {
        name: "M-Pesa",
        layer: "Payments",
        kind: "private rail",
        note: "Check wallet payouts, merchant payments, account lookup, reversal, and reconciliation APIs.",
      },
      {
        name: "eCitizen",
        layer: "Service delivery",
        kind: "service channel",
        note: "Check if public-service journeys can use existing account, payment, and status flows.",
      },
      {
        name: "National identity systems",
        layer: "Identity",
        kind: "national system",
        note: "Check verification, consent, and exception handling for people without documentation.",
      },
      {
        name: "Business and tax registries",
        layer: "Registries",
        kind: "national system",
        note: "Check MSME verification and cross-border trade service needs.",
      },
    ],
    summary:
      "Kenya is useful for showing how payment reach and private innovation can connect to public-service DPI use cases.",
    strengths: ["payments ecosystem", "digital entrepreneurship", "service demand"],
    gaps: ["registry integration", "public API evidence", "cross-agency safeguards"],
    metrics: [
      { label: "Identity readiness", value: 69, note: "coverage and verification path" },
      { label: "Payment reach", value: 86, note: "strong payment ecosystem" },
      { label: "Registry quality", value: 58, note: "needs use-case mapping" },
      { label: "API readiness", value: 60, note: "integration potential" },
      { label: "Safeguards maturity", value: 55, note: "trust layer to validate" },
    ],
  },
  {
    id: "ghana",
    name: "Ghana",
    flag: "🇬🇭",
    region: "West Africa",
    maturity: "Building",
    readiness: 57,
    relevantDpgs: ["MOSIP", "Mojaloop", "OpenG2P", "Open Contracting"],
    priorityUseCases: ["Identity", "Payments", "Public procurement"],
    publicSystems: ["digital identity ecosystem", "payments interoperability priorities"],
    integrationChecks: [
      {
        name: "Ghana Card",
        layer: "Identity",
        kind: "national system",
        note: "Check verification coverage, consent, and agency access rules.",
      },
      {
        name: "GhIPSS / mobile money interoperability",
        layer: "Payments",
        kind: "payment rail",
        note: "Check account routing, fees, settlement, and bulk public-service payments.",
      },
      {
        name: "Ghana.gov service channel",
        layer: "Service delivery",
        kind: "service channel",
        note: "Check payment, status, and user-support integration points.",
      },
    ],
    summary:
      "Ghana is a strong candidate for demonstrating identity, payments, and public service integration patterns.",
    strengths: ["identity foundations", "financial services", "institutional capacity"],
    gaps: ["verified DPG mapping", "social registry integration", "audit visibility"],
    metrics: [
      { label: "Identity readiness", value: 70, note: "identity base to map" },
      { label: "Payment reach", value: 65, note: "interoperability opportunity" },
      { label: "Registry quality", value: 54, note: "programme alignment needed" },
      { label: "API readiness", value: 50, note: "evidence to collect" },
      { label: "Safeguards maturity", value: 52, note: "public trust review" },
    ],
  },
  {
    id: "egypt",
    name: "Egypt",
    flag: "🇪🇬",
    region: "North Africa",
    maturity: "Building",
    readiness: 59,
    relevantDpgs: ["OpenFn", "OpenFisca", "Open Contracting", "DHIS2"],
    priorityUseCases: ["Service delivery", "Benefits", "Health data"],
    publicSystems: ["digital government services", "large-scale public administration"],
    integrationChecks: [
      {
        name: "Digital Egypt service channels",
        layer: "Service delivery",
        kind: "service channel",
        note: "Check where citizen-facing services, forms, payments, and status tracking already exist.",
      },
      {
        name: "Meeza / banking payment rails",
        layer: "Payments",
        kind: "payment rail",
        note: "Check low-value payouts, fees, account routing, and reconciliation.",
      },
      {
        name: "Takaful and Karama benefit systems",
        layer: "Social protection",
        kind: "national system",
        note: "Check eligibility logic, grievance channels, and payment failure workflows.",
      },
    ],
    summary:
      "Egypt is useful for showing how large public administration systems can be assessed for open standards and interoperability.",
    strengths: ["scale", "public administration capacity", "service delivery base"],
    gaps: ["open-source fit validation", "standards mapping", "data exchange governance"],
    metrics: [
      { label: "Identity readiness", value: 68, note: "national systems to map" },
      { label: "Payment reach", value: 58, note: "benefit flows to validate" },
      { label: "Registry quality", value: 61, note: "large administrative base" },
      { label: "API readiness", value: 52, note: "interoperability review needed" },
      { label: "Safeguards maturity", value: 55, note: "governance mapping needed" },
    ],
  },
  {
    id: "zambia",
    name: "Zambia",
    flag: "🇿🇲",
    region: "Southern Africa",
    maturity: "Building",
    readiness: 57,
    relevantDpgs: ["MOSIP", "DHIS2", "OpenMRS", "OpenFn", "ODK"],
    priorityUseCases: [
      "Land and climate",
      "Forest governance",
      "Health interoperability",
      "Agriculture",
    ],
    publicSystems: [
      "Smart Zambia Government Service Bus",
      "ZILAS land administration",
      "Timber Traceability System",
      "Community Forest Management Group records",
      "Smart Care Pro electronic health record",
      "DHIS2 and eLMIS health reporting",
      "MOSIP-supported digital ID rollout",
    ],
    integrationChecks: [
      {
        name: "ZILAS land administration",
        layer: "Registries",
        kind: "national system",
        note: "Check title records, customary land workflows, revenue collection, and links to climate or agriculture planning.",
      },
      {
        name: "Smart Care Pro",
        layer: "Health",
        kind: "national system",
        note: "Check patient records, facility use, medicine accountability, referrals, and interoperability with DHIS2 and eLMIS.",
      },
      {
        name: "MOSIP digital ID programme",
        layer: "Identity",
        kind: "national system",
        note: "Check rollout status, verification APIs, safeguards, and how identity can reduce duplicate patient or beneficiary records.",
      },
      {
        name: "Smart Zambia service bus",
        layer: "Data exchange",
        kind: "national system",
        note: "Check whether land, health, finance, and identity systems can exchange only the data required for each service.",
      },
      {
        name: "Timber Traceability System",
        layer: "Data exchange",
        kind: "national system",
        note: "Check permit monitoring, province coverage, revenue flows, exporter requirements, and links to land and community forest records.",
      },
      {
        name: "Community Forest Management Group records",
        layer: "Registries",
        kind: "national system",
        note: "Check mapped forest groups, tenure claims, reporting channels, and eligibility for climate finance or carbon-market payments.",
      },
      {
        name: "MTN, Airtel, Zamtel and bank rails",
        layer: "Payments",
        kind: "private rail",
        note: "Check cash transfer, agro-input, health payment, reconciliation, agent reach, and beneficiary support flows.",
      },
    ],
    summary:
      "Zambia is the Cohort 1 example for land, climate, and natural-resource governance: the opportunity is to connect ZILAS, forest traceability, community forest records, and public-service rails.",
    strengths: ["Smart Zambia coordination", "executive-level land priority", "forest traceability entry point"],
    gaps: ["customary land complexity", "province coverage gaps", "identity and safeguards design"],
    metrics: [
      { label: "Identity readiness", value: 55, note: "MOSIP-supported rollout still needs operational depth" },
      { label: "Payment reach", value: 59, note: "banks and MNOs available for public-service flows" },
      { label: "Registry quality", value: 62, note: "ZILAS and health records give concrete systems to connect" },
      { label: "API readiness", value: 53, note: "service bus pattern needs use-case validation" },
      { label: "Safeguards maturity", value: 56, note: "land, health, and ID safeguards must be explicit" },
    ],
    countryData: [
      { label: "Population", value: "21.3M", year: "2024", source: "World Bank", note: "Total population" },
      { label: "GDP", value: "$25.3B", year: "2024", source: "World Bank", note: "Current US dollars" },
      { label: "GDP per capita", value: "$1,187", year: "2024", source: "World Bank", note: "Current US dollars" },
      { label: "GDP growth", value: "3.8%", year: "2024", source: "World Bank", note: "Annual real GDP growth" },
      { label: "Internet use", value: "17.1%", year: "2024", source: "World Bank", note: "Individuals using the internet" },
      { label: "Mobile subscriptions", value: "108.7 / 100 people", year: "2024", source: "World Bank", note: "Mobile cellular subscriptions" },
      { label: "Electricity access", value: "51.1%", year: "2023", source: "World Bank", note: "Share of population with access" },
    ],
    implementationFocus: [
      { label: "Lead systems", value: "ZILAS, Timber Traceability System, Smart Zambia GSB" },
      { label: "Priority sectors", value: "Land, climate resilience, forestry, agriculture" },
      { label: "Key question", value: "Can land and forest records support revenue, climate payments, and community trust without creating another silo?" },
    ],
    countryUseCases: [
      {
        title: "Land records for agriculture and climate resilience",
        description:
          "Connect land records, geospatial data, climate risk, and agriculture services so secure tenure can support investment, planning, and smallholder resilience.",
        systems: ["ZILAS", "customary land workflows", "climate risk data", "agriculture services", "payment or revenue systems"],
        outcome:
          "Farmers, planners, and investors can verify land information faster while government improves land revenue and climate project delivery.",
      },
      {
        title: "Forest governance and timber traceability",
        description:
          "Scale timber traceability through the Government Service Bus, connect community forest records to land systems, and support legal timber, non-timber products, and climate finance.",
        systems: ["Timber Traceability System", "Smart Zambia GSB", "CFMG records", "ZILAS", "permit and revenue systems"],
        outcome:
          "Communities, forestry officials, and private operators can verify provenance, report activity, and connect forest stewardship to payments or market access.",
      },
      {
        title: "Health records and medicine accountability",
        description:
          "Use Smart Care Pro, DHIS2, eLMIS, and identity checks to reduce duplicate records, improve medicine traceability, and automate reporting.",
        systems: ["Smart Care Pro", "DHIS2", "eLMIS", "MOSIP digital ID", "facility records"],
        outcome:
          "Facilities can record patient care, track supply needs, and produce trusted indicators with fewer parallel reporting systems.",
      },
    ],
  },
  {
    id: "ethiopia",
    name: "Ethiopia",
    flag: "🇪🇹",
    region: "East Africa",
    maturity: "Scaling",
    readiness: 68,
    relevantDpgs: ["MOSIP", "Apache APISIX", "OpenG2P", "OpenSPP", "OpenFn"],
    priorityUseCases: ["Financial inclusion", "Social protection", "Agriculture and climate", "Youth jobs"],
    publicSystems: [
      "MESOB one-stop service platform",
      "Fayda digital ID",
      "APISIX-based API gateway",
      "MESOB Pay and wallet roadmap",
      "Community Service Centers",
      "OpenAgriNet agriculture data initiative",
    ],
    integrationChecks: [
      {
        name: "MESOB",
        layer: "Service delivery",
        kind: "service channel",
        note: "Check which high-volume services are already inside the one-stop model and which ministries are next in the pipeline.",
      },
      {
        name: "Fayda digital ID",
        layer: "Identity",
        kind: "national system",
        note: "Check authentication coverage, verification APIs, inclusion safeguards, and exception handling.",
      },
      {
        name: "APISIX national integration gateway",
        layer: "Data exchange",
        kind: "national system",
        note: "Check routing, authorization, audit logs, ministry data ownership, and API lifecycle governance.",
      },
      {
        name: "MESOB Pay and wallet",
        layer: "Payments",
        kind: "payment rail",
        note: "Check regulatory approvals, NBE oversight, settlement, fees, reconciliation, and G2P readiness.",
      },
      {
        name: "OpenAgriNet",
        layer: "Registries",
        kind: "national system",
        note: "Check whether agriculture records can connect to MESOB so farmers do not face separate unlinked portals.",
      },
      {
        name: "Labor Market Information System",
        layer: "Education",
        kind: "national system",
        note: "Check whether youth credentials, job matching, and payment histories can connect to Fayda and service delivery flows.",
      },
    ],
    summary:
      "Ethiopia is the clearest example of DPI as a live government service platform: MESOB combines service delivery, Fayda identity, API exchange, branch networks, and a future sovereign payment layer.",
    strengths: ["political mandate", "one-stop service scale", "identity and API gateway foundations"],
    gaps: ["payment gateway approvals", "OpenAgriNet integration", "safeguards and API governance"],
    metrics: [
      { label: "Identity readiness", value: 76, note: "Fayda provides the authentication base" },
      { label: "Payment reach", value: 61, note: "MESOB Pay is a roadmap priority, not yet the full rail" },
      { label: "Registry quality", value: 66, note: "service and sector registries are expanding" },
      { label: "API readiness", value: 74, note: "APISIX gateway gives a real exchange pattern" },
      { label: "Safeguards maturity", value: 63, note: "privacy, rights, and access rules need visible design" },
    ],
    countryData: [
      { label: "Population", value: "132.1M", year: "2024", source: "World Bank", note: "Total population" },
      { label: "GDP", value: "$149.7B", year: "2024", source: "World Bank", note: "Current US dollars" },
      { label: "GDP per capita", value: "$1,134", year: "2024", source: "World Bank", note: "Current US dollars" },
      { label: "GDP growth", value: "7.6%", year: "2024", source: "World Bank", note: "Annual real GDP growth" },
      { label: "Internet use", value: "21.9%", year: "2024", source: "World Bank", note: "Individuals using the internet" },
      { label: "Mobile subscriptions", value: "65.1 / 100 people", year: "2024", source: "World Bank", note: "Mobile cellular subscriptions" },
      { label: "Electricity access", value: "55.4%", year: "2023", source: "World Bank", note: "Share of population with access" },
    ],
    implementationFocus: [
      { label: "Lead platform", value: "MESOB one-stop service delivery" },
      { label: "Core stack", value: "Fayda ID, APISIX gateway, MESOB Pay, Community Service Centers" },
      { label: "Immediate design challenge", value: "Connect priority services without creating another fragmented portal" },
    ],
    countryUseCases: [
      {
        title: "Social protection and pension payments",
        description:
          "Use Fayda identity, MESOB service channels, and the future MESOB wallet to digitize safety-net and pension disbursements.",
        systems: ["Fayda", "MESOB", "MESOB Pay", "safety-net registries", "case and grievance channels"],
        outcome:
          "People can be verified, enrolled, paid, and supported through one auditable public-service route.",
      },
      {
        title: "Agriculture services through one window",
        description:
          "Connect agricultural licenses, land certification, irrigation permits, OpenAgriNet records, and farmer-facing service centers.",
        systems: ["MESOB", "OpenAgriNet", "Ministry of Agriculture services", "Fayda", "payment gateway"],
        outcome:
          "Farmers can access permits, subsidies, insurance, and advisory services without moving between disconnected portals.",
      },
      {
        title: "Youth jobs and verified credentials",
        description:
          "Link youth identity, TVET records, labor-market data, enterprise registration, and payment histories through trusted service flows.",
        systems: ["LMIS", "Fayda", "MESOB", "TVET records", "micro-enterprise registration"],
        outcome:
          "Young workers can prove skills, access jobs or finance, and build portable records across public and private services.",
      },
    ],
  },
  {
    id: "sierra-leone",
    name: "Sierra Leone",
    flag: "🇸🇱",
    region: "West Africa",
    maturity: "Building",
    readiness: 53,
    relevantDpgs: ["X-Road", "Open Contracting", "OpenFn", "OpenSPP", "ODK"],
    priorityUseCases: ["Procurement to payment", "Farmer support", "Youth productive digitalization"],
    publicSystems: [
      "Government Service Bus",
      "X-Road 7.7.1 environments",
      "CRVS",
      "eGP procurement",
      "IFMIS treasury",
      "T24 banking settlement",
      "ASYCUDA, ITAS, PFM Smart",
      "Digital Government Bill 2025",
    ],
    integrationChecks: [
      {
        name: "CRVS",
        layer: "Civil registration",
        kind: "national system",
        note: "Use minimal validation tokens for identity checks rather than copying raw identity data between systems.",
      },
      {
        name: "eGP procurement",
        layer: "Operations",
        kind: "national system",
        note: "Check contract award status, supplier records, and Open Contracting Data Standard alignment.",
      },
      {
        name: "IFMIS",
        layer: "Operations",
        kind: "national system",
        note: "Check treasury approval, payment status, reconciliation, and audit requirements.",
      },
      {
        name: "T24 banking settlement",
        layer: "Payments",
        kind: "payment rail",
        note: "Check settlement confirmation, failed-payment handling, and supplier notification.",
      },
      {
        name: "Feed Salone farmer registry",
        layer: "Registries",
        kind: "national system",
        note: "Check farmer profiles, farm and plot data, subsidy targeting, extension records, and grievance workflows.",
      },
    ],
    summary:
      "Sierra Leone is the strongest data-exchange demo: the current opportunity is to connect existing public finance, procurement, civil registration, and banking systems into visible service outcomes.",
    strengths: ["Government Service Bus architecture", "clear procurement-to-payment flow", "Digital Government Bill momentum"],
    gaps: ["data-sharing rules", "agency onboarding process", "sustainable operating model"],
    metrics: [
      { label: "Identity readiness", value: 52, note: "CRVS can support tokenized checks" },
      { label: "Payment reach", value: 48, note: "bank and wallet settlement paths need validation" },
      { label: "Registry quality", value: 56, note: "finance and agriculture records give useful anchors" },
      { label: "API readiness", value: 61, note: "GSB and X-Road environments create a real starting point" },
      { label: "Safeguards maturity", value: 50, note: "governance and redress need to be designed into pilots" },
    ],
    countryData: [
      { label: "Population", value: "8.6M", year: "2024", source: "World Bank", note: "Total population" },
      { label: "GDP", value: "$7.0B", year: "2024", source: "World Bank", note: "Current US dollars" },
      { label: "GDP per capita", value: "$807", year: "2024", source: "World Bank", note: "Current US dollars" },
      { label: "GDP growth", value: "4.3%", year: "2024", source: "World Bank", note: "Annual real GDP growth" },
      { label: "Internet use", value: "25.1%", year: "2024", source: "World Bank", note: "Individuals using the internet" },
      { label: "Mobile subscriptions", value: "No recent value", year: "2024", source: "World Bank", note: "Indicator missing in latest pull" },
      { label: "Electricity access", value: "35.5%", year: "2023", source: "World Bank", note: "Share of population with access" },
    ],
    implementationFocus: [
      { label: "Lead pattern", value: "Government Service Bus with X-Road-style exchange" },
      { label: "First visible flow", value: "CRVS -> eGP -> IFMIS -> T24 procurement-to-payment tracking" },
      { label: "Second flow", value: "Feed Salone farmer registry, subsidy, payment, and grievance path" },
    ],
    countryUseCases: [
      {
        title: "Transparent procurement-to-payment tracking",
        description:
          "Connect CRVS, procurement, treasury, and banking settlement so suppliers can see where a payment is and government can audit the full chain.",
        systems: ["CRVS", "eGP", "IFMIS", "T24", "Government Service Bus"],
        outcome:
          "Supplier verification, contract award, funds allocation, and payment settlement become traceable without every agency giving up its own system.",
      },
      {
        title: "Feed Salone agriculture DPI",
        description:
          "Build a farmer-facing path for registration, farm profiles, extension records, climate-smart inputs, insurance, payments, and market access.",
        systems: ["farmer registry", "digital ID linkage", "agriculture payments", "extension records", "grievance workflow"],
        outcome:
          "Farmers can be registered once, targeted more fairly, paid faster, and supported through a clear complaint and correction process.",
      },
      {
        title: "Youth productive digitalization",
        description:
          "Use payments, enterprise records, skills data, and service channels to help youth entrepreneurs receive grants, build histories, and access finance.",
        systems: ["enterprise registry", "skills records", "payment rails", "case management", "credit or grant records"],
        outcome:
          "Young workers and MSMEs can build trusted participation records instead of staying invisible to formal finance and public programmes.",
      },
    ],
  },
  {
    id: "morocco",
    name: "Morocco",
    flag: "🇲🇦",
    region: "North Africa",
    maturity: "Building",
    readiness: 61,
    relevantDpgs: ["X-Road", "OpenFn", "OpenFisca", "Open Contracting"],
    priorityUseCases: ["Digital administration", "Benefits", "MSME services"],
    publicSystems: ["digital administration", "public service modernization"],
    integrationChecks: [
      {
        name: "Digital administration channels",
        layer: "Service delivery",
        kind: "service channel",
        note: "Check where services can reuse existing login, forms, status, and document workflows.",
      },
      {
        name: "Bank and wallet payment rails",
        layer: "Payments",
        kind: "payment rail",
        note: "Check public-service fees, payouts, reconciliation, and user support.",
      },
      {
        name: "Social registry / benefits systems",
        layer: "Social protection",
        kind: "national system",
        note: "Check eligibility logic, appeals, and data-sharing permissions.",
      },
    ],
    summary:
      "Morocco is useful for showing how administrative reform, digital services, and standards can be mapped into DPI layers.",
    strengths: ["administrative capacity", "digital reform", "regional leadership"],
    gaps: ["DPG fit validation", "API visibility", "cross-border use cases"],
    metrics: [
      { label: "Identity readiness", value: 67, note: "foundations to verify" },
      { label: "Payment reach", value: 62, note: "service flows to map" },
      { label: "Registry quality", value: 59, note: "registry interoperability" },
      { label: "API readiness", value: 55, note: "public integration evidence" },
      { label: "Safeguards maturity", value: 60, note: "governance review" },
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

export const cohortCountryIds = [
  "sierra-leone",
  "ethiopia",
  "zambia",
] as const;

export const comingSoonCountryIds = [
  "rwanda",
  "nigeria",
  "tanzania",
  "south-africa",
] as const;

export const cohortCountries = cohortCountryIds
  .map((id) => countries.find((country) => country.id === id))
  .filter((country): country is CountryProfile => Boolean(country));

export const upcomingCountries = comingSoonCountryIds
  .map((id) => countries.find((country) => country.id === id))
  .filter((country): country is CountryProfile => Boolean(country));
