import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createRequest, evaluateRequest, routeRequest } from "../src/exchange-service.mjs";

describe("AA4DPI data exchange reference service", () => {
  it("approves an authorized procurement-to-payment request", () => {
    const request = createRequest({
      requestId: "test-sl-001",
      requesterAgencyId: "sl-nppa",
      serviceId: "sl-procurement-payment-status",
      purpose: "procurement-to-payment",
      payload: {
        supplierId: "SUP-1004",
        contractId: "CNT-2026-88",
      },
    });

    const response = routeRequest(request);

    assert.equal(response.ok, true);
    assert.deepEqual(Object.keys(response.data), [
      "paymentStatus",
      "treasuryApproval",
      "settlementReference",
    ]);
    assert.equal(response.data.internalBudgetLine, undefined);
    assert.equal(response.audit.decision, "approved");
  });

  it("denies a request with the wrong purpose", () => {
    const decision = evaluateRequest(
      createRequest({
        requestId: "test-sl-002",
        requesterAgencyId: "sl-nppa",
        serviceId: "sl-procurement-payment-status",
        purpose: "farmer-support",
        payload: {
          supplierId: "SUP-1004",
          contractId: "CNT-2026-88",
        },
      })
    );

    assert.equal(decision.allowed, false);
    assert.equal(decision.reason, "purpose_mismatch");
  });

  it("denies a request missing required fields", () => {
    const response = routeRequest(
      createRequest({
        requestId: "test-zm-001",
        requesterAgencyId: "zm-smart-zambia",
        serviceId: "zm-land-parcel-check",
        purpose: "climate-land",
        payload: {
          parcelId: "PARCEL-77",
        },
      })
    );

    assert.equal(response.ok, false);
    assert.equal(response.error, "missing_required_fields");
    assert.deepEqual(response.missing, ["requestPurpose"]);
    assert.equal(response.audit.decision, "denied");
  });

  it("denies a cross-country request unless explicitly configured", () => {
    const response = routeRequest(
      createRequest({
        requestId: "test-cross-001",
        requesterAgencyId: "eth-mesob",
        serviceId: "zm-forest-permit-check",
        purpose: "climate-land",
        payload: {
          permitId: "FOREST-PERMIT-204",
          requestPurpose: "timber-provenance-check",
        },
      })
    );

    assert.equal(response.ok, false);
    assert.equal(response.error, "cross_country_request_not_configured");
  });
});
