import { GridStep } from "./grid-step";

export class GridBar {
  constructor(row, store, start, end, mountEl) {
    this.row = row;
    this.store = store;
    this.start = start;
    this.end = end;
    this.mountEl = mountEl;
    this.el = document.createElement("div");
    this.el.className = "grid-bar";
  }

  init() {
    this.render();
    this.mountEl.appendChild(this.el);
  }

  render() {
    for (let i = this.start; i < this.end; i++) {
      new GridStep(this.row, this.store, i, this.el).init();
    }
  }
}
