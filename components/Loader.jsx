export default function Loader({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="loader" />
      <p className="font-display uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}
