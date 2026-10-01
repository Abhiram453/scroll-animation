// Synthetic Web Audio Engine Synthesizer
// Completely client-side, zero external audio asset dependencies!

class EngineSoundEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isEnabled: boolean = false;
  private isInitialized: boolean = false;

  private init() {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(45, this.ctx.currentTime);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(90, this.ctx.currentTime);

      // Lowpass filter for deep exhaust rumble
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.gainNode);

      this.osc1.start();
      this.osc2.start();
      this.isInitialized = true;
    } catch {
      // Audio context not supported or user gesture required
    }
  }

  public toggle(): boolean {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled && this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }
    return this.isEnabled;
  }

  public updateSpeed(speedKmH: number) {
    if (!this.isEnabled || !this.ctx || !this.gainNode || !this.osc1 || !this.osc2) return;
    
    const targetGain = Math.min(0.12, 0.02 + (speedKmH / 350) * 0.1);
    const baseFreq = 40 + (speedKmH / 350) * 95;

    this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    this.osc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.05);
    this.osc2.frequency.setTargetAtTime(baseFreq * 2.1, this.ctx.currentTime, 0.05);
  }

  public getStatus(): boolean {
    return this.isEnabled;
  }
}

export const soundEngine = new EngineSoundEngine();
