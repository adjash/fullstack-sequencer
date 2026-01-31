import { GridBars } from "../grid-bars/grid-bars";

export class GridRow {
  constructor(rowData, store, mountEl) {
    this.row = rowData;
    this.store = store;
    this.mountEl = mountEl;
    this.el = document.createElement("div");
    this.el.className = "grid-row";
  }

  init() {
    this.render();
    this.mountEl.appendChild(this.el);
  }

  render() {
    this.el.innerHTML = `
      <span>${this.row.name}</span>
      <button data-hook="delete">Delete</button>
    `;

    new GridBars(this.row, this.store, this.el).init();

    this.el
      .querySelector("[data-hook='delete']")
      .addEventListener("click", () => this.store.removeRow(this.row.id));
  }
}
