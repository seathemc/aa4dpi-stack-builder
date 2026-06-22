import { Suspense } from "react";

import { CatalogueClient } from "@/components/catalogue-client";
import { Skeleton } from "@/components/ui/skeleton";

function CatalogueFallback() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
      <Skeleton className="h-7 w-56" />
      <Skeleton className="h-20 w-full rounded-lg" />
      <Skeleton className="h-96 w-full rounded-lg" />
    </main>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<CatalogueFallback />}>
      <CatalogueClient />
    </Suspense>
  );
}
