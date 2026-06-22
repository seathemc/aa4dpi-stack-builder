import { PageShell } from "@/components/page-shell";
import { RequestFormDialog } from "@/components/request-form-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RequestSupportPage() {
  return (
    <PageShell
      eyebrow="Work with AA4DPI"
      title="Request support or join the ecosystem"
      summary="Choose the path that fits. The form opens as a short dialog and sends the submission to the AA4DPI team."
    >
      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>3-5 minutes</CardDescription>
            <CardTitle className="text-2xl tracking-normal">
              Join the ecosystem
            </CardTitle>
            <CardDescription className="leading-6">
              For people and organisations that want updates, events,
              partnership, research, or a way to contribute expertise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RequestFormDialog defaultType="interest">
              <Button className="w-full">Send expression of interest</Button>
            </RequestFormDialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>5-8 minutes</CardDescription>
            <CardTitle className="text-2xl tracking-normal">
              Request country support
            </CardTitle>
            <CardDescription className="leading-6">
              For UNDP Country Offices and government counterparts that want to
              discuss AA4DPI support for a national priority or future cohort.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RequestFormDialog defaultType="country">
              <Button className="w-full">Request support</Button>
            </RequestFormDialog>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-normal">
          What happens after you submit
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            [
              "1. Review",
              "The submission goes to dpi.africa@undp.org with the fields in plain text.",
            ],
            [
              "2. Route",
              "The team routes it as ecosystem interest, partnership, or country support.",
            ],
            [
              "3. Follow up",
              "Country requests are followed by a conversation, not scored from the form alone.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg bg-secondary p-4">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
