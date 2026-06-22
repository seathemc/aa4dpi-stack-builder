import { agencies, sampleResponses, services } from "./registry.mjs";

function findAgency(agencyId) {
  return agencies.find((agency) => agency.id === agencyId);
}

function findService(serviceId) {
  return services.find((service) => service.id === serviceId);
}

function hasAllowedRole(requester, service) {
  return requester.roles.some((role) => service.allowedRequesterRoles.includes(role));
}

function missingFields(requiredFields, payload) {
  return requiredFields.filter((field) => !(field in payload));
}

function minimizeResponse(service, fullResponse) {
  return Object.fromEntries(
    service.responseFields.map((field) => [field, fullResponse[field] ?? null])
  );
}

function auditEvent({ request, decision, reason, response }) {
  return {
    timestamp: new Date().toISOString(),
    requestId: request.requestId,
    requesterAgencyId: request.requesterAgencyId,
    serviceId: request.serviceId,
    purpose: request.purpose,
    decision,
    reason,
    responseFields: response ? Object.keys(response) : [],
  };
}

export function evaluateRequest(request) {
  const requester = findAgency(request.requesterAgencyId);
  const service = findService(request.serviceId);

  if (!requester) {
    return {
      allowed: false,
      reason: "unknown_requester",
    };
  }

  if (!service) {
    return {
      allowed: false,
      reason: "unknown_service",
    };
  }

  if (requester.country !== service.country) {
    return {
      allowed: false,
      reason: "cross_country_request_not_configured",
    };
  }

  if (request.purpose !== service.purpose) {
    return {
      allowed: false,
      reason: "purpose_mismatch",
    };
  }

  if (!hasAllowedRole(requester, service)) {
    return {
      allowed: false,
      reason: "requester_role_not_allowed",
    };
  }

  const missing = missingFields(service.requiredFields, request.payload ?? {});
  if (missing.length) {
    return {
      allowed: false,
      reason: "missing_required_fields",
      missing,
    };
  }

  return {
    allowed: true,
    reason: "approved",
    service,
    requester,
  };
}

export function routeRequest(request) {
  const decision = evaluateRequest(request);

  if (!decision.allowed) {
    return {
      ok: false,
      error: decision.reason,
      missing: decision.missing ?? [],
      audit: auditEvent({
        request,
        decision: "denied",
        reason: decision.reason,
      }),
    };
  }

  const fullResponse = sampleResponses[decision.service.id] ?? {};
  const response = minimizeResponse(decision.service, fullResponse);

  return {
    ok: true,
    service: {
      id: decision.service.id,
      ownerAgencyId: decision.service.ownerAgencyId,
      layer: decision.service.layer,
    },
    requester: {
      id: decision.requester.id,
      name: decision.requester.name,
    },
    data: response,
    audit: auditEvent({
      request,
      decision: "approved",
      reason: "approved",
      response,
    }),
  };
}

export function createRequest({
  requestId,
  requesterAgencyId,
  serviceId,
  purpose,
  payload,
}) {
  return {
    requestId,
    requesterAgencyId,
    serviceId,
    purpose,
    payload,
  };
}
