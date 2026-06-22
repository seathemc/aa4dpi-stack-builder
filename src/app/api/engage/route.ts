import { NextResponse } from "next/server";

const recipient = "dpi.africa@undp.org";

function formatValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  return String(value ?? "");
}

function formatMessage(type: string, fields: Record<string, unknown>) {
  const lines = [
    "AA4DPI request form submission",
    "",
    `Submission type: ${type}`,
    `Submitted at: ${new Date().toISOString()}`,
    "",
    ...Object.entries(fields).map(
      ([key, value]) => `${key}: ${formatValue(value)}`
    ),
  ];

  return lines.join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "AA4DPI <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Add RESEND_API_KEY to send form submissions.",
      },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const type = String(body?.type ?? "AA4DPI request");
  const fields =
    body?.fields && typeof body.fields === "object" ? body.fields : {};
  const email = typeof fields.email === "string" ? fields.email : undefined;

  if (!fields.name || !email) {
    return NextResponse.json(
      { error: "Please provide at least a name and email." },
      { status: 400 }
    );
  }

  const text = formatMessage(type, fields);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipient,
      reply_to: email,
      subject: `AA4DPI ${type}`,
      text,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    return NextResponse.json(
      { error: data?.message ?? "Unable to send request." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
