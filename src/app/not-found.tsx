import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center gap-5 px-6">
      <div className="inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
        Page not found
      </div>
      <h1 className="text-3xl font-semibold">This page is not in the prototype</h1>
      <p className="text-muted-foreground">
        Return to the Stack Builder home to browse the current demo paths.
      </p>
      <Button asChild className="w-fit">
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}
