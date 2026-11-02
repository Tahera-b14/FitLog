import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
      <div>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Workout Library
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
          Train with intent. <span className="text-accent">Log every set.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
          and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-sm font-semibold uppercase tracking-widest text-ink transition hover:brightness-110"
        >
          <Dumbbell size={18} />
          Browse Workouts
        </a>
      </div>
      <div className="relative mx-auto w-full max-w-md md:max-w-none">
        <div className="absolute inset-6 rounded-full bg-accent/10 blur-3xl" />
        <Image
          src="/banner.png"
          alt="Athlete training on a preacher curl machine"
          width={600}
          height={600}
          priority
          className="relative mx-auto h-auto w-full max-w-lg"
        />
      </div>
    </section>
  );
}
