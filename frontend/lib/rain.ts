/**
 * Soft rain made with the Web Audio API: filtered noise, so there is no
 * audio file to download or license.
 */
export function createRain() {
  let ctx: AudioContext | null = null;
  let gain: GainNode | null = null;

  function start() {
    if (typeof window === "undefined" || !("AudioContext" in window)) return;
    if (!ctx) {
      ctx = new AudioContext();
      const seconds = 4;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      // Pink-ish noise sounds more like rain than harsh white noise.
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.099046;
        b1 = 0.963 * b1 + white * 0.2965164;
        b2 = 0.57 * b2 + white * 1.0526913;
        data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.12;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 300;
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 5000;

      gain = ctx.createGain();
      gain.gain.value = 0;
      source.connect(highpass).connect(lowpass).connect(gain).connect(ctx.destination);
      source.start();
    }
    void ctx.resume();
    fade(0.35);
  }

  function fade(to: number) {
    if (!ctx || !gain) return;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setTargetAtTime(to, ctx.currentTime, 0.8);
  }

  function stop() {
    fade(0);
  }

  function close() {
    void ctx?.close();
    ctx = null;
    gain = null;
  }

  return { start, stop, close };
}
