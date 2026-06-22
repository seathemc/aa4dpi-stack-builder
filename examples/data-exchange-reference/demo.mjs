import { createRequest, routeRequest } from "./src/exchange-service.mjs";

const examples = [
  createRequest({
    requestId: "demo-sl-001",
    requesterAgencyId: "sl-nppa",
    serviceId: "sl-procurement-payment-status",
    purpose: "procurement-to-payment",
    payload: {
      supplierId: "SUP-1004",
      contractId: "CNT-2026-88",
    },
  }),
  createRequest({
    requestId: "demo-eth-001",
    requesterAgencyId: "eth-mesob",
    serviceId: "eth-identity-assertion",
    purpose: "one-stop-services",
    payload: {
      personToken: "person-token-demo",
      serviceId: "public-service-42",
    },
  }),
  createRequest({
    requestId: "demo-zm-001",
    requesterAgencyId: "zm-smart-zambia",
    serviceId: "zm-forest-permit-check",
    purpose: "climate-land",
    payload: {
      permitId: "FOREST-PERMIT-204",
      requestPurpose: "timber-provenance-check",
    },
  }),
];

for (const request of examples) {
  console.log(JSON.stringify(routeRequest(request), null, 2));
}
