export class GridStep {
  constructor(row, store, stepIndex, mountEl) {
    this.row = row;
    this.store = store;
    this.stepIndex = stepIndex;
    this.mountEl = mountEl;
    this.el = document.createElement("button");
  }

  init() {
    this.render();
    this.mountEl.appendChild(this.el);
  }

  render() {
    const isActive = this.row.steps[this.stepIndex];
    const isPlayingStep = this.store.state.currentStep === this.stepIndex;

    this.el.className = `
    step
    ${isActive ? "active" : ""}
    ${isPlayingStep ? "playing" : ""}
  `;

    this.el.onclick = () => this.store.toggleStep(this.row.id, this.stepIndex);
  }
}
