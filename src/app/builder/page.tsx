import { BuilderClient } from "@/components/builder-client";
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
    <BuilderClient initialUseCaseId={initialUseCaseId} />
  );
}
