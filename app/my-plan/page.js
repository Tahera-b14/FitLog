"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Check, Clock, Dumbbell, Flame, X } from "lucide-react";
import { usePlan } from "@/components/PlanContext";
import Loader from "@/components/Loader";
import WorkoutStats from "@/components/WorkoutStats";

const TABS = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

function MetricCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-panel p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon size={22} />
      </span>
      <div>
        <p className="font-display text-3xl font-bold">{value}</p>
        <p className="font-display text-xs uppercase tracking-widest text-muted">{label}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-line px-6 py-16 text-center">
      <h3 className="font-display text-3xl font-bold uppercase">Nothing here yet</h3>
      <p className="mt-3 text-muted">Browse the library and add a lift to get today moving.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-sm font-semibold uppercase tracking-widest text-ink"
      >
        <Dumbbell size={18} /> Go to workouts
      </Link>
    </div>
  );
}

export default function MyPlanPage() {
  const { plan, saved, ready, remove, markDone } = usePlan();
  const [tab, setTab] = useState("plan");
  const items = tab === "plan" ? plan : saved;

  const totals = plan.reduce(
    (acc, w) => ({ minutes: acc.minutes + w.duration, calories: acc.calories + w.caloriesBurned }),
    { minutes: 0, calories: 0 }
  );

  const handleDone = (w) => {
    markDone(tab, w.id);
    toast.success(`${w.name} marked as done`);
  };

  const handleRemove = (w) => {
    remove(tab, w.id);
    toast(`${w.name} removed`, { icon: "🗑️" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <MetricCard icon={Dumbbell} label="Exercises" value={plan.length} />
        <MetricCard icon={Clock} label="Minutes" value={totals.minutes} />
        <MetricCard icon={Flame} label="Calories" value={totals.calories} />
      </div>

      <div className="mt-10 flex gap-2 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-3 font-display text-sm uppercase tracking-widest transition ${
              tab === t.key ? "border-accent text-accent" : "border-transparent text-muted hover:text-white"
            }`}
          >
            {t.label} ({t.key === "plan" ? plan.length : saved.length})
          </button>
        ))}
      </div>

      <div className="mt-6">
        {!ready ? (
          <Loader />
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map((w) => (
              <li
                key={w.id}
                className={`flex flex-col gap-4 rounded-xl border bg-panel p-4 sm:flex-row sm:items-center ${
                  w.done ? "border-accent/50" : "border-line"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image}
                  alt={w.name}
                  className="h-40 w-full rounded-lg object-cover sm:h-24 sm:w-24"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold uppercase">{w.name}</h3>
                    {w.done && (
                      <span className="rounded-full bg-accent px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-ink">
                        Done
                      </span>
                    )}
                  </div>
                  <p className="mb-2 text-sm text-muted">{w.equipment}</p>
                  <WorkoutStats workout={w} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workout/${w.id}`}
                    className="rounded-md border border-line px-4 py-2 font-display text-xs uppercase tracking-widest hover:border-accent hover:text-accent"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDone(w)}
                    disabled={w.done}
                    className="inline-flex items-center gap-1 rounded-md bg-accent px-4 py-2 font-display text-xs font-semibold uppercase tracking-widest text-ink disabled:opacity-50"
                  >
                    <Check size={14} /> {w.done ? "Done" : "Mark as Done"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(w)}
                    aria-label={`Remove ${w.name}`}
                    className="rounded-md border border-line p-2 text-muted hover:border-red-400 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
