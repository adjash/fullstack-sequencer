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
    this.el.className = this.row.steps[this.stepIndex] ? "step active" : "step";

    this.el.addEventListener("click", () =>
      this.store.toggleStep(this.row.id, this.stepIndex),
    );
  }
}
