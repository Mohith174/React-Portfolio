// Animated sound-frequency bars for the music button. When `playing`, the bars
// bounce (CSS keyframes in index.css); otherwise they sit low and static.
const DELAYS = [0, 0.18, 0.33, 0.5, 0.12];

const EqualizerBars = ({ playing }) => (
  <span
    className={`flex h-3.5 items-end gap-[2px] ${playing ? "eq-playing" : ""}`}
    aria-hidden="true"
  >
    {DELAYS.map((d, i) => (
      <span
        key={i}
        className="eq-bar block w-[2px] rounded-sm bg-current"
        style={{ height: "100%", animationDelay: `${d}s` }}
      />
    ))}
  </span>
);

export default EqualizerBars;
