export class AudioEngine {
  constructor(store) {
    this.store = store;
    this.lastStep = null;
    this.audioCtx = null;
  }

  init() {
    // AudioContext must be created after a user gesture
    this.store.addEventListener("change", () => this.onChange());
  }

  ensureAudioContext() {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
    }

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  playBeep() {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "triangle"; // harsh + obvious
    osc.frequency.value = 440; // A4

    gain.gain.value = 0.1; // keep it quiet

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  onChange() {
    const { currentStep, isPlaying, rows } = this.store.state;

    if (!isPlaying) return;
    if (currentStep === this.lastStep) return;

    this.lastStep = currentStep;

    this.ensureAudioContext();

    rows.forEach((row) => {
      if (row.steps[currentStep]) {
        console.log("PLAY SOUND FOR ROW", row.id);
        this.playBeep();
      }
    });
  }
}
