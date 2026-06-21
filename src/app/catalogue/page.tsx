import { PageShell } from "@/components/page-shell";
import { CatalogueSnapshot } from "@/components/storyboard-panels";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dpgs } from "@/lib/data";

export default function CataloguePage() {
  return (
    <PageShell
      eyebrow="Open DPG catalogue"
      title="Real tools, mapped to DPI layers"
      summary="The catalogue starts with actual open-source repositories. The point is not to recommend one tool everywhere, but to show what exists and where it may fit."
    >
      <CatalogueSnapshot dpgs={dpgs} />

      <section className="grid gap-4 md:grid-cols-3">
        {["Identity and registries", "Payments and exchange", "Delivery systems"].map(
          (group) => (
            <Card key={group} className="rounded-lg">
              <CardHeader>
                <Badge variant="secondary">{group}</Badge>
                <CardTitle className="text-lg">
                  {
                    dpgs.filter((dpg) =>
                      group === "Identity and registries"
                        ? ["Identity", "Civil registration", "Registries"].includes(
                            dpg.layer
                          )
                        : group === "Payments and exchange"
                          ? ["Payments", "Data exchange"].includes(dpg.layer)
                          : ![
                              "Identity",
                              "Civil registration",
                              "Registries",
                              "Payments",
                              "Data exchange",
                            ].includes(dpg.layer)
                    ).length
                  }{" "}
                  tools tracked
                </CardTitle>
                <CardDescription>
                  A compact view of which open-source components can support
                  each part of a country stack.
                </CardDescription>
              </CardHeader>
            </Card>
          )
        )}
      </section>
    </PageShell>
  );
}
