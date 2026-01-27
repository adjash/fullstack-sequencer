import { GridRow } from "../grid-row/grid-row";

export class SequenceGrid {
  constructor(store, mountEl) {
    this.store = store;
    this.mountEl = mountEl;
    this.el = document.createElement("div");
  }

  init() {
    this.store.addEventListener("change", () => this.render());
    this.render();
  }

  render() {
    this.el.innerHTML = `
    <button data-hook="add-beat-row">Add row</button>
    <div class="rows" data-hook="rows"></div>
  `;

    if (!this.el.isConnected) {
      this.mountEl.appendChild(this.el);
    }

    const rowsEl = this.el.querySelector('[data-hook="rows"]');

    this.store.state.rows.forEach((rowData) => {
      new GridRow(rowData, rowsEl).init();
    });

    this.el
      .querySelector('[data-hook="add-beat-row"]')
      .addEventListener("click", () => {
        this.store.addRow({
          name: "tester",
          steps: [],
        });
      });
  }
}
