import { GridRow } from "../grid-row/grid-row";

export class SequenceGrid {
  constructor(store, mountEl) {
    this.store = store;
    this.mountEl = mountEl;
    this.el = document.createElement("div");
    this.rowsEl = null;
  }

  init() {
    this.store.addEventListener("change", () => this.renderRows());
    this.render();
    this.renderRows();
  }

  render() {
    this.el.innerHTML = `
      <button data-hook="add-row">Add row</button>
      <div data-hook="rows"></div>
    `;

    this.mountEl.appendChild(this.el);
    this.rowsEl = this.el.querySelector("[data-hook='rows']");

    this.el
      .querySelector("[data-hook='add-row']")
      .addEventListener("click", () => this.store.addRow({ name: "New row" }));
  }

  renderRows() {
    this.rowsEl.innerHTML = "";
    this.store.state.rows.forEach((row) =>
      new GridRow(row, this.store, this.rowsEl).init(),
    );
  }
}
