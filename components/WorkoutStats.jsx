import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutStats({ workout }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
      <span className="inline-flex items-center gap-1">
        <Clock size={15} className="text-accent" /> {workout.duration} min
      </span>
      <span className="inline-flex items-center gap-1">
        <Flame size={15} className="text-accent" /> {workout.caloriesBurned} kcal
      </span>
      <span className="inline-flex items-center gap-1">
        <Star size={15} className="text-accent" /> {workout.rating}
      </span>
    </div>
  );
}
