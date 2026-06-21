export type ExchangeRequest = {
  requestId: string;
  requester: string;
  provider: string;
  purpose: string;
  subjectId: string;
  fields: string[];
};

export const demoExchangeRequest: ExchangeRequest = {
  requestId: "REQ-2026-00042",
  requester: "Social Registry",
  provider: "Civil Registry",
  purpose: "Child benefit eligibility verification",
  subjectId: "RWA-DEMO-1048",
  fields: ["birthRegistrationStatus", "dateOfBirth", "guardianLink"],
};

export function evaluateExchangeRequest(request: ExchangeRequest) {
  const allowedFields = [
    "birthRegistrationStatus",
    "dateOfBirth",
    "guardianLink",
  ];
  const deniedFields = request.fields.filter(
    (field) => !allowedFields.includes(field)
  );
  const authorized = deniedFields.length === 0;

  return {
    requestId: request.requestId,
    authorized,
    decision: authorized ? "approved" : "denied",
    response: authorized
      ? {
          birthRegistrationStatus: "verified",
          dateOfBirth: "2021-08-14",
          guardianLink: "verified",
        }
      : null,
    safeguards: [
      "purpose recorded",
      "minimal fields requested",
      "request and response logged",
      "redress reference attached",
    ],
    audit: {
      timestamp: new Date().toISOString(),
      requester: request.requester,
      provider: request.provider,
      purpose: request.purpose,
      fields: request.fields,
      status: authorized ? "shared" : "blocked",
    },
  };
}
