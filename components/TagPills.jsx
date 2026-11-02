export default function TagPills({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wider text-accent"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
