import { useCallback, useEffect, useRef, useState } from "react";

// Royalty-free / listener-supported ambient-chill streams (SomaFM). We try
// them in order; if none can play (offline, blocked, stream down), we fall
// back to a generated ambient pad so the button always does something.
const STREAMS = [
  "https://ice1.somafm.com/groovesalad-128-mp3",
  "https://ice2.somafm.com/groovesalad-128-mp3",
  "https://ice1.somafm.com/fluid-128-mp3",
];

export const useMusic = () => {
  const [playing, setPlaying] = useState(false);
  const [source, setSource] = useState(null); // 'radio' | 'ambient'
  const [loading, setLoading] = useState(false);

  const audioRef = useRef(null);
  const ambientRef = useRef(null); // teardown fn for the synth fallback

  // --- generative fallback (Web Audio) ----------------------------------
  const startAmbient = useCallback(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return () => {};
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 1.5);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    master.connect(ctx.destination);
    filter.connect(master);

    const nodes = [];
    [110, 164.81, 220, 277.18].forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      osc.detune.value = (i - 1.5) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.25;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.12;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      osc.connect(g);
      g.connect(filter);
      osc.start();
      lfo.start();
      nodes.push(osc, lfo);
    });

    setSource("ambient");
    setPlaying(true);
    return () => {
      nodes.forEach((n) => { try { n.stop(); } catch { /* noop */ } });
      try { ctx.close(); } catch { /* noop */ }
    };
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (ambientRef.current) {
      ambientRef.current();
      ambientRef.current = null;
    }
    setPlaying(false);
    setSource(null);
    setLoading(false);
  }, []);

  const start = useCallback(() => {
    setLoading(true);
    let streamIndex = 0;
    let settled = false;

    const goAmbient = () => {
      if (settled) return;
      settled = true;
      setLoading(false);
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      ambientRef.current = startAmbient();
    };

    const tryStream = () => {
      if (streamIndex >= STREAMS.length) return goAmbient();
      const audio = new Audio(STREAMS[streamIndex]);
      audio.crossOrigin = "anonymous";
      audio.preload = "auto";
      audio.volume = 0.55;
      audioRef.current = audio;

      audio.addEventListener("playing", () => {
        if (settled) return;
        settled = true;
        setLoading(false);
        setSource("radio");
        setPlaying(true);
      }, { once: true });

      audio.addEventListener("error", () => {
        streamIndex += 1;
        tryStream();
      }, { once: true });

      audio.play().catch(() => {
        // Autoplay/policy or network reject — try next, then ambient.
        streamIndex += 1;
        tryStream();
      });
    };

    // If nothing has started within 6s, use the fallback.
    const guard = setTimeout(goAmbient, 6000);
    tryStream();
    return () => clearTimeout(guard);
  }, [startAmbient]);

  const toggle = useCallback(() => {
    if (playing || loading) stop();
    else start();
  }, [playing, loading, start, stop]);

  useEffect(() => () => stop(), [stop]);

  return { playing, loading, source, toggle };
};
