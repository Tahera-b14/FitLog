import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold text-accent sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase">Page not found</h1>
      <p className="mt-3 text-muted">
        This page skipped leg day and never showed up. Head back and pick a lift.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-accent px-6 py-3 font-display text-sm font-semibold uppercase tracking-widest text-ink"
      >
        Go to workouts
      </Link>
    </div>
  );
}
