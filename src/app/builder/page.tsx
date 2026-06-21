import { BuilderClient } from "@/components/builder-client";
import { cohortCountries, useCases } from "@/lib/data";

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; useCase?: string }>;
}) {
  const params = await searchParams;
  const initialUseCaseId = useCases.some((item) => item.id === params.useCase)
    ? params.useCase
    : "farmer-support";
  const initialCountryId = cohortCountries.some(
    (item) => item.id === params.country
  )
    ? params.country
    : "ethiopia";

  return (
    <BuilderClient
      initialCountryId={initialCountryId}
      initialUseCaseId={initialUseCaseId}
    />
  );
}
