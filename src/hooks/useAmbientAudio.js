import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A tiny generative ambient pad built entirely with the Web Audio API — no
 * audio file, so nothing copyrighted ships and the bundle stays lean. It layers
 * a few detuned sine oscillators through a gentle low-pass filter and a slow
 * volume drift, producing a soft evolving drone that toggles on and off.
 */
export const useAmbientAudio = () => {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const masterRef = useRef(null);

  const stop = useCallback(() => {
    const master = masterRef.current;
    const ctx = ctxRef.current;
    if (master && ctx) {
      // Fade out to avoid a click, then tear the graph down.
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    }
    setTimeout(() => {
      nodesRef.current.forEach((n) => {
        try { n.stop?.(); } catch { /* already stopped */ }
        try { n.disconnect?.(); } catch { /* noop */ }
      });
      nodesRef.current = [];
    }, 700);
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!ctxRef.current) ctxRef.current = new AudioCtx();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.7;

    master.connect(ctx.destination);
    filter.connect(master);

    // A quiet, wide chord (A minor 9 feel) with slight detuning per voice.
    const freqs = [110, 164.81, 220, 277.18];
    const nodes = [master, filter];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      osc.detune.value = (i - 1.5) * 4;

      const voiceGain = ctx.createGain();
      voiceGain.gain.value = 0.25;

      // Slow LFO drifting each voice's level so the pad breathes.
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.12;
      lfo.connect(lfoGain);
      lfoGain.connect(voiceGain.gain);

      osc.connect(voiceGain);
      voiceGain.connect(filter);
      osc.start();
      lfo.start();
      nodes.push(osc, lfo, voiceGain, lfoGain);
    });

    masterRef.current = master;
    nodesRef.current = nodes;
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  useEffect(() => () => {
    nodesRef.current.forEach((n) => { try { n.stop?.(); } catch { /* noop */ } });
    ctxRef.current?.close?.();
  }, []);

  return { playing, toggle };
};
