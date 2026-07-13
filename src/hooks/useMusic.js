import { useCallback, useEffect, useRef, useState } from "react";

// Chill / jazzy stations, tried in order. FluxFM Chillhop is a redirecting
// endpoint (302 → fresh session stream) so the browser always gets a live URL.
// SomaFM channels are the fallback. If none play, we drop to a generated pad.
const STREAMS = [
  "https://streams.fluxfm.de/Chillhop/mp3-320/", // FluxFM Chillhop (jazzy beats)
  "https://ice2.somafm.com/gsclassic-128-mp3",    // SomaFM Groove Salad Classic
  "https://ice1.somafm.com/sonicuniverse-128-mp3", // SomaFM Sonic Universe (jazz)
];

export const useMusic = () => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const audioRef = useRef(null);
  const ambientRef = useRef(null); // teardown fn for the synth fallback
  const tokenRef = useRef(0); // bumped on every start/stop to cancel stale async work

  const teardown = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
      audioRef.current = null;
    }
    if (ambientRef.current) {
      ambientRef.current();
      ambientRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    tokenRef.current += 1; // invalidate any in-flight stream attempt
    teardown();
    setPlaying(false);
    setLoading(false);
  }, [teardown]);

  // Generated ambient pad — only used if every stream fails.
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
      osc.connect(g);
      g.connect(filter);
      osc.start();
      nodes.push(osc);
    });
    return () => {
      nodes.forEach((n) => { try { n.stop(); } catch { /* noop */ } });
      try { ctx.close(); } catch { /* noop */ }
    };
  }, []);

  const start = useCallback(() => {
    const token = (tokenRef.current += 1);
    setLoading(true);
    let idx = 0;

    const alive = () => token === tokenRef.current;

    const goAmbient = () => {
      if (!alive()) return;
      teardown();
      ambientRef.current = startAmbient();
      setLoading(false);
      setPlaying(true);
    };

    const tryNext = () => {
      if (!alive()) return;
      if (idx >= STREAMS.length) return goAmbient();
      const audio = new Audio(STREAMS[idx]);
      audio.preload = "auto";
      audio.volume = 0.5;
      audioRef.current = audio;

      audio.addEventListener("playing", () => {
        if (!alive()) { audio.pause(); return; }
        setLoading(false);
        setPlaying(true);
      }, { once: true });

      audio.addEventListener("error", () => {
        if (!alive()) return;
        idx += 1;
        tryNext();
      }, { once: true });

      audio.play().catch(() => {
        if (!alive()) return;
        idx += 1;
        tryNext();
      });
    };

    tryNext();
  }, [startAmbient, teardown]);

  const toggle = useCallback(() => {
    if (playing || loading) stop();
    else start();
  }, [playing, loading, start, stop]);

  useEffect(() => () => stop(), [stop]);

  return { playing, loading, toggle };
};
