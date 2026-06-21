import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    openapi: "3.1.0",
    info: {
      title: "AA4DPI Data Exchange Sandbox",
      version: "0.1.0",
    },
    paths: {
      "/api/sandbox/verify-registration": {
        post: {
          summary: "Verify a civil registration fact for an approved purpose",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["requestId", "requester", "provider", "purpose"],
                  properties: {
                    requestId: { type: "string" },
                    requester: { type: "string" },
                    provider: { type: "string" },
                    purpose: { type: "string" },
                    subjectId: { type: "string" },
                    fields: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Authorization decision, minimized response, safeguards, and audit entry",
            },
          },
        },
      },
    },
  });
}
