export class SequenceStore extends EventTarget {
  constructor() {
    super();
    this.state = {
      bpm: 80,
      beatsPerBar: 4,
      barCount: 8,
      rows: [],
    };
    this.nextRowId = 0;
  }

  get totalSteps() {
    return this.state.beatsPerBar * this.state.barCount;
  }

  setConfig(config) {
    this.state = { ...this.state, ...config };

    // resize all rows when config changes
    this.state.rows.forEach((row) => {
      row.steps.length = this.totalSteps;
      row.steps.fill(
        false,
        row.steps.findIndex((s) => s === undefined),
      );
    });

    this.dispatchEvent(new Event("change"));
  }

  addRow({ name }) {
    const steps = Array(this.totalSteps).fill(false);

    this.state.rows.push({
      id: this.nextRowId++,
      name,
      steps,
    });

    this.dispatchEvent(new Event("change"));
  }

  removeRow(rowId) {
    this.state.rows = this.state.rows.filter((row) => row.id !== rowId);
    this.dispatchEvent(new Event("change"));
  }

  //find the row in the array rows by matching rowId
  //
  toggleStep(rowId, stepIndex) {
    const row = this.state.rows.find((row) => row.id === rowId);
    if (!row) return;
    // console.log(row);
    // console.log(row.steps);
    // console.log(stepIndex);

    row.steps[stepIndex] = !row.steps[stepIndex];
    this.dispatchEvent(new Event("change"));
  }
}
