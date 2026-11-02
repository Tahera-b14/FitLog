"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Bookmark, Plus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { PLAN_CAP, usePlan } from "@/components/PlanContext";
import Loader from "@/components/Loader";
import TagPills from "@/components/TagPills";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const { plan, addToPlan, saveForLater, inPlan, inSaved } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getWorkout(id)
      .then((data) => {
        if (data && data.id) {
          setWorkout(data);
          setStatus("ready");
        } else {
          setStatus("missing");
        }
      })
      .catch(() => setStatus("missing"));
  }, [id]);

  if (status === "loading") return <Loader label="Loading workout…" />;

  if (status === "missing") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold uppercase">Workout not found</h1>
        <p className="mt-3 text-muted">That lift isn&apos;t in the library.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-display text-sm font-semibold uppercase tracking-widest text-ink"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  const planned = inPlan(workout.id);
  const saved = inSaved(workout.id);
  const planFull = !planned && plan.length >= PLAN_CAP;

  const handleAdd = () => {
    const result = addToPlan(workout);
    if (result === "added") toast.success("Added to today's plan");
    else if (result === "full") toast.error(`Today's plan is capped at ${PLAN_CAP} lifts`);
    else toast("Already in today's plan");
  };

  const handleSave = () => {
    const result = saveForLater(workout);
    if (result === "added") toast.success("Saved for later");
    else toast("Already saved");
  };

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link
        href="/#library"
        className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-muted hover:text-accent"
      >
        <ArrowLeft size={16} /> Back to library
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-line bg-panel lg:sticky lg:top-24 lg:self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              {workout.name}
            </h1>
            <p className="mt-4 text-muted">{workout.description}</p>
            <div className="mt-4">
              <TagPills tags={workout.muscleGroups} />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-panel">
            <h2 className="border-b border-line px-5 py-3 font-display text-sm font-semibold uppercase tracking-widest text-accent">
              Key Specs
            </h2>
            <dl>
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-line px-5 py-3 last:border-0"
                >
                  <dt className="font-display text-sm uppercase tracking-widest text-muted">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold uppercase">Instructions</h2>
            <ol className="mt-4 flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-4 rounded-lg border border-line bg-panel p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display font-bold text-ink">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm sm:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              disabled={planned || planFull}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-sm font-semibold uppercase tracking-widest text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={18} />
              {planned ? "In today's plan" : planFull ? "Plan is full" : "Add to today's plan"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saved}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-accent px-6 py-3 font-display text-sm font-semibold uppercase tracking-widest text-accent transition hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark size={18} />
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
