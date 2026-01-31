import { GridBar } from "./grid-bar";

export class GridBars {
  constructor(row, store, mountEl) {
    this.row = row;
    this.store = store;
    this.mountEl = mountEl;
    this.el = document.createElement("div");
    this.el.className = "grid-bars";
  }

  init() {
    this.render();
    this.mountEl.appendChild(this.el);
  }

  render() {
    const { beatsPerBar, barCount } = this.store.state;

    for (let barIndex = 0; barIndex < barCount; barIndex++) {
      const start = barIndex * beatsPerBar;
      const end = start + beatsPerBar;

      new GridBar(this.row, this.store, start, end, this.el).init();
    }
  }
}
