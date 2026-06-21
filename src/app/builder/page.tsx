import { BuilderClient } from "@/components/builder-client";
import { PageShell } from "@/components/page-shell";
import { useCases } from "@/lib/data";

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ useCase?: string }>;
}) {
  const params = await searchParams;
  const initialUseCaseId = useCases.some((item) => item.id === params.useCase)
    ? params.useCase
    : "farmer-support";

  return (
    <PageShell
      eyebrow="Stack Builder"
      title="Turn a use case into a DPI reference stack"
      summary="The builder shows how existing DPGs, country readiness, standards, and safeguards fit together for a practical public-service journey."
    >
      <BuilderClient initialUseCaseId={initialUseCaseId} />
    </PageShell>
  );
}
