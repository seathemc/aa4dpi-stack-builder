import { Button } from "@/components/ui/button";

const responseExample = {
  registration: true,
  registeredAt: "RWA-CRVS-2026-00012345",
  registered_by: "civil_registry",
  signature: "MEUCIQD...",
};

export default function ApiContractPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          API: Verify Registration
        </h1>
        <p className="text-sm text-muted-foreground">
          Check if a birth record exists for a given individual.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border bg-background p-5 shadow-sm">
          <div className="mb-5 flex border-b text-xs">
            {["Request", "Response", "OpenAPI"].map((tab, index) => (
              <div
                key={tab}
                className={`px-4 py-2 ${
                  index === 0
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="grid gap-4 text-xs">
            <div>
              <div className="font-semibold">Endpoint</div>
              <div className="mt-1 rounded bg-sky-50 px-2 py-1 text-primary">
                GET /v1/verify-registration
              </div>
            </div>
            <div>
              <div className="font-semibold">Description</div>
              <p className="mt-1 leading-5 text-muted-foreground">
                Returns registration status for a person&apos;s birth.
              </p>
            </div>
            <div>
              <div className="font-semibold">Authentication</div>
              <p className="mt-1 text-muted-foreground">
                OAuth 2.0 / OpenID Connect
              </p>
            </div>
            <div>
              <div className="font-semibold">Headers</div>
              <p className="mt-1 text-muted-foreground">
                Authorization: Bearer &lt;token&gt;
              </p>
              <p className="text-muted-foreground">X-Request-ID: &lt;uuid&gt;</p>
              <p className="text-muted-foreground">
                X-Purpose: benefit-eligibility
              </p>
            </div>
            <div>
              <div className="font-semibold">Response codes</div>
              <div className="mt-2 grid grid-cols-[3rem_1fr] gap-y-1 text-muted-foreground">
                <span>200</span>
                <span>Success</span>
                <span>403</span>
                <span>Forbidden</span>
                <span>404</span>
                <span>Not Found</span>
                <span>429</span>
                <span>Too Many Requests</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <pre className="overflow-auto rounded-lg bg-slate-950 p-5 text-xs leading-6 text-slate-100 shadow-sm">
            {`{
  "individual": {
    "name": "Jean Katende",
    "dob": "2018-04-12",
    "gender": "F",
    "mother_name": "Mukaline Marie"
  },
  "purpose": "benefit-eligibility",
  "request_id": "05bd-7e-7a14-a2b-d0f3-3a1c..."
}`}
          </pre>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="text-xs">Run test</Button>
            <Button size="sm" variant="outline" className="text-xs">
              View audit log
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Export OpenAPI
            </Button>
          </div>
          <div className="text-xs font-semibold">Response (200)</div>
          <pre className="overflow-auto rounded-lg bg-slate-950 p-5 text-xs leading-6 text-emerald-300 shadow-sm">
            {JSON.stringify(responseExample, null, 2)}
          </pre>
          <div className="flex justify-end">
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Valid signature
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
