import Link from "next/link";
import TagPills from "./TagPills";
import WorkoutStats from "./WorkoutStats";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="aspect-[4/3] overflow-hidden bg-panel-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <TagPills tags={workout.muscleGroups} />
        <h3 className="font-display text-xl font-bold uppercase tracking-wide">{workout.name}</h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-auto border-t border-line pt-3">
          <WorkoutStats workout={workout} />
        </div>
      </div>
    </Link>
  );
}
