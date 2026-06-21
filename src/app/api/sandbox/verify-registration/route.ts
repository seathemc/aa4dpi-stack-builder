import { NextResponse } from "next/server";

import {
  demoExchangeRequest,
  evaluateExchangeRequest,
  type ExchangeRequest,
} from "@/lib/sandbox";

export async function GET() {
  return NextResponse.json(evaluateExchangeRequest(demoExchangeRequest));
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ExchangeRequest>;

  const exchangeRequest: ExchangeRequest = {
    ...demoExchangeRequest,
    ...body,
    fields: body.fields ?? demoExchangeRequest.fields,
  };

  return NextResponse.json(evaluateExchangeRequest(exchangeRequest));
}
