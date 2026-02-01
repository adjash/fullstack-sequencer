export class AudioEngine {
  constructor(store) {
    this.store = store;
    this.lastStep = null;
  }

  init() {
    this.store.addEventListener("change", () => this.onChange());
  }

  onChange() {
    const { currentStep, isPlaying, rows } = this.store.state;
    if (!isPlaying) return;
    if (currentStep === this.lastStep) return;

    this.lastStep = currentStep;

    rows.forEach((row) => {
      if (row.steps[currentStep]) {
        console.log("PLAY SOUND FOR ROW", row.id);
      }
    });
  }
}
