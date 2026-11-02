"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import Loader from "./Loader";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError("Could not load workouts. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : workouts;
    // Duration sorts shortest first; calories and rating sort highest first.
    return [...filtered].sort((a, b) =>
      sortBy === "duration" ? a.duration - b.duration : b[sortBy] - a[sortBy]
    );
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">The Library</h2>
          <p className="mt-2 text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or tag"
              className="w-full rounded-md border border-line bg-panel py-2 pl-9 pr-3 text-sm outline-none focus:border-accent sm:w-56"
            />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="py-20 text-center text-red-400">{error}</p>
      ) : visible.length === 0 ? (
        <p className="py-20 text-center text-muted">No workouts match &quot;{query}&quot;.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
