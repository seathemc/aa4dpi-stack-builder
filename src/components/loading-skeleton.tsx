import { Skeleton } from "@/components/ui/skeleton";

export function PageLoadingSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8">
      <section className="space-y-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-9 w-full max-w-xl" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-32 rounded-lg" />
        ))}
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_16rem]">
        <div className="overflow-hidden rounded-lg border bg-background">
          <div className="border-b bg-secondary/50 px-4 py-3">
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="grid gap-3 p-4">
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className="grid gap-3 sm:grid-cols-[2rem_1fr_8rem]">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
              </div>
            ))}
          </div>
        </div>
        <Skeleton className="h-80 rounded-lg" />
      </section>
    </main>
  );
}

export function TableLoadingSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
      <section className="space-y-3">
        <Skeleton className="h-8 w-full max-w-80" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </section>
      <Skeleton className="h-9 w-full max-w-md" />
      <div className="overflow-hidden rounded-lg border bg-background">
        <div className="border-b bg-secondary/50 px-4 py-3">
          <Skeleton className="h-4 w-52" />
        </div>
        <div className="grid gap-3 p-4">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="grid gap-3 sm:grid-cols-[2rem_1fr_7rem_7rem]">
              <Skeleton className="size-7 rounded-md" />
              <Skeleton className="h-7" />
              <Skeleton className="h-7" />
              <Skeleton className="h-7" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
