"use client";

import { useState } from "react";
import { FileCode2, ListChecks } from "lucide-react";

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
    <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
      <Card className="rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <FileCode2 className="size-4" />
            API contract and test request
          </div>
          <CardTitle>POST /api/sandbox/verify-registration</CardTitle>
          <CardDescription className="text-sm leading-6 sm:text-base sm:leading-7">
            The social registry asks the civil registry for only the facts needed
            to confirm child benefit eligibility.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <pre className="max-w-full overflow-auto rounded-lg bg-secondary p-3 text-xs leading-5 sm:p-4 sm:text-sm sm:leading-6">
            {JSON.stringify(demoExchangeRequest, null, 2)}
          </pre>
          <Button onClick={runTest} disabled={loading} className="w-full sm:w-fit">
            {loading ? "Running..." : "Run test request"}
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <ListChecks className="size-4" />
            Decision and audit record
          </div>
          <CardTitle>Verified response</CardTitle>
          <CardDescription className="text-sm leading-6 sm:text-base sm:leading-7">
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
              <pre className="max-w-full overflow-auto rounded-lg bg-secondary p-3 text-xs leading-5 sm:p-4 sm:text-sm sm:leading-6">
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
