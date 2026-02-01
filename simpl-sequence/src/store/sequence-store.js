export class SequenceStore extends EventTarget {
  constructor() {
    super();

    this.state = {
      bpm: 80,
      beatsPerBar: 4,
      barCount: 8,
      rows: [],
      currentStep: 0,
      isPlaying: false,
    };

    this.nextRowId = 0;
    this.timer = null;
  }

  get totalSteps() {
    return this.state.beatsPerBar * this.state.barCount;
  }

  get stepMs() {
    return 60000 / this.state.bpm;
  }

  play() {
    if (this.timer) return;

    this.state.isPlaying = true;
    this.timer = setInterval(this.tick, this.stepMs);
    this.emit();
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;

    this.state.isPlaying = false;
    this.state.currentStep = 0;
    this.emit();
  }

  tick = () => {
    this.state.currentStep = (this.state.currentStep + 1) % this.totalSteps;
    this.emit();
  };

  setConfig(config) {
    this.state = { ...this.state, ...config };

    this.state.rows.forEach((row) => {
      row.steps.length = this.totalSteps;
      row.steps.fill(false, row.steps.indexOf(undefined));
    });

    this.emit();
  }

  addRow({ name }) {
    this.state.rows.push({
      id: this.nextRowId++,
      name,
      steps: Array(this.totalSteps).fill(false),
    });

    this.emit();
  }

  removeRow(rowId) {
    this.state.rows = this.state.rows.filter((r) => r.id !== rowId);
    this.emit();
  }

  toggleStep(rowId, stepIndex) {
    const row = this.state.rows.find((r) => r.id === rowId);
    if (!row) return;

    row.steps[stepIndex] = !row.steps[stepIndex];
    this.emit();
  }

  emit() {
    this.dispatchEvent(new Event("change"));
  }
}
