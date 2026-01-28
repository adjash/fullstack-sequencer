export class SequenceStore extends EventTarget {
  constructor() {
    super();
    this.state = {
      bpm: 80,
      beatsInBar: 4,
      barCount: 4,
      rows: [],
    };
    this.nextRowId = 0;
  }

  setConfig(config) {
    this.state = { ...this.state, ...config };
    this.dispatchEvent(new Event("change"));
  }

  addRow(row) {
    this.state.rows.push({
      ...row,
      id: this.nextRowId++,
    });
    this.dispatchEvent(new Event("change"));
  }

  removeRow(rowID) {
    this.state.rows = this.state.rows.filter((row) => row.id != rowID);
    this.dispatchEvent(new Event("change"));
  }

  toggleStep(rowIndex, stepIndex) {
    const step = this.state.rows[rowIndex].steps[stepIndex];
    step.active = !step.active;
    this.dispatchEvent(new Event("change"));
  }
}
