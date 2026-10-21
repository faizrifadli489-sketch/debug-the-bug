// Efek suara disintesis dengan Web Audio API, jadi tidak butuh file audio.
// Mau pakai file sendiri? Taruh di public/sounds/ lalu ganti isi play().

export type SoundName = "tick" | "correct" | "wrong" | "gameover";

const MUTE_KEY = "dtb-muted";
let ctx: AudioContext | null = null;
let muted = safeGet(MUTE_KEY) === "1";

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export const isMuted = () => muted;

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    /* abaikan */
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", vol = 0.12) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur);
}

export function play(name: SoundName) {
  if (muted) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    switch (name) {
      case "tick":
        tone(1000, t, 0.05, "square", 0.05);
        break;
      case "correct":
        tone(660, t, 0.12);
        tone(880, t + 0.1, 0.2);
        break;
      case "wrong":
        tone(220, t, 0.25, "sawtooth", 0.08);
        tone(160, t + 0.15, 0.3, "sawtooth", 0.08);
        break;
      case "gameover":
        [440, 392, 330, 262].forEach((f, i) => tone(f, t + i * 0.18, 0.3, "triangle"));
        break;
    }
  } catch {
    /* audio tidak tersedia, abaikan */
  }
}
