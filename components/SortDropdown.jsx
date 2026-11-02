import { ChevronDown } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span className="font-display uppercase tracking-widest">Sort By</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-9 font-display text-sm uppercase tracking-wider text-white outline-none focus:border-accent"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-accent"
        />
      </span>
    </label>
  );
}
