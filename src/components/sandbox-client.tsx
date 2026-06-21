"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demoExchangeRequest } from "@/lib/sandbox";

type SandboxResponse = {
  requestId: string;
  authorized: boolean;
  decision: string;
  response: Record<string, string> | null;
  safeguards: string[];
  audit: {
    timestamp: string;
    requester: string;
    provider: string;
    purpose: string;
    fields: string[];
    status: string;
  };
};

export function SandboxClient() {
  const [result, setResult] = useState<SandboxResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    const response = await fetch("/api/sandbox/verify-registration", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(demoExchangeRequest),
    });
    const json = (await response.json()) as SandboxResponse;
    setResult(json);
    setLoading(false);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Test exchange request</CardTitle>
          <CardDescription>
            The social registry asks the civil registry for only the facts needed
            to confirm child benefit eligibility.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <pre className="overflow-auto rounded-lg bg-secondary p-4 text-sm leading-6">
            {JSON.stringify(demoExchangeRequest, null, 2)}
          </pre>
          <Button onClick={runTest} disabled={loading} className="w-fit">
            {loading ? "Running..." : "Run test request"}
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Verified response</CardTitle>
          <CardDescription>
            The sandbox returns an authorization decision, a minimized response,
            safeguards, and an audit entry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge>{result.decision}</Badge>
                <Badge variant="secondary">{result.audit.status}</Badge>
              </div>
              <pre className="overflow-auto rounded-lg bg-secondary p-4 text-sm leading-6">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
              Run the test request to see the sandbox response.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
