import { CircleOff, ShieldCheck } from "lucide-react";

const rows = [
  ["2026-06-10 10:15:22", "Scholarship eligibility", "Birth registration"],
  ["2026-06-10 10:14:10", "Benefit eligibility", "Birth registration"],
  ["2026-06-09 09:06:41", "Benefit eligibility", "Success"],
  ["2026-06-20 09:05:41", "Program targeting", "Farmer profile"],
  ["2026-06-20 05:47:03", "Immunization follow-up", "Success"],
  ["2026-06-20 00:50:11", "Benefit eligibility", "Denied"],
];

const safeguards = [
  ["Purpose limitation", "Data used only for the declared purpose."],
  ["Data minimization", "Only the minimum necessary data is shared."],
  ["User consent", "Consent captured and verifiable."],
  ["Redress channel", "Citizens can challenge and get support."],
  ["Offline access", "Works with intermittent connectivity."],
];

export default function AuditPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8">
      <section className="grid gap-5 lg:grid-cols-[1fr_17rem]">
        <div className="space-y-5">
          <section className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Audit log</h1>
            <p className="text-sm text-muted-foreground">
              All data access is logged and reviewable.
            </p>
          </section>

          <div className="grid gap-3 md:hidden">
            {rows.map(([time, requester, data]) => (
              <article key={`${time}-${requester}`} className="rounded-lg border bg-background p-4 shadow-sm">
                <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {time}
                </div>
                <div className="mt-2 text-sm font-semibold">{requester}</div>
                <div
                  className={`mt-2 text-xs ${
                    data === "Denied"
                      ? "text-red-600"
                      : data === "Success"
                        ? "text-emerald-700"
                        : "text-muted-foreground"
                  }`}
                >
                  {data}
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-lg border bg-background shadow-sm md:block">
            <table className="w-full text-left text-xs">
              <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Time (UTC)</th>
                  <th className="px-4 py-3 font-semibold">Requester</th>
                  <th className="px-4 py-3 font-semibold">Data shared</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([time, requester, data]) => (
                  <tr key={`${time}-${requester}`} className="border-b last:border-b-0">
                    <td className="px-4 py-3 text-muted-foreground">{time}</td>
                    <td className="px-4 py-3">{requester}</td>
                    <td
                      className={`px-4 py-3 ${
                        data === "Denied"
                          ? "text-red-600"
                          : data === "Success"
                            ? "text-emerald-700"
                            : "text-muted-foreground"
                      }`}
                    >
                      {data}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <a href="/api/sandbox/verify-registration" className="text-xs font-medium text-primary">
            View full audit log →
          </a>
        </div>

        <aside className="rounded-lg border bg-background p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold">Safeguards</h2>
          <div className="grid gap-3">
            {safeguards.map(([title, body], index) => (
              <div key={title} className="flex gap-3 rounded-md border bg-secondary/35 p-3">
                {index === 5 ? (
                  <CircleOff className="mt-0.5 size-4 text-red-500" />
                ) : (
                  <ShieldCheck className="mt-0.5 size-4 text-emerald-600" />
                )}
                <div>
                  <div className="text-xs font-semibold">{title}</div>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
