import { GridRow } from "../grid-row/grid-row";

export class SequenceGrid {
  constructor(store, mountEl) {
    this.store = store;
    this.mountEl = mountEl;
    this.el = document.createElement("div");
    this.rowsEl = null;
    this.handleAddRow = this.handleAddRow.bind(this);
  }

  init() {
    this.store.addEventListener("change", () => this.renderRows());
    this.render();
    this.renderRows();
  }

  render() {
    this.el.innerHTML = `
      <button data-hook="add-beat-row">Add row</button>
      <div class="rows" data-hook="rows"></div>
    `;

    if (!this.el.isConnected) {
      this.mountEl.appendChild(this.el);
    }
    this.rowsEl = this.el.querySelector('[data-hook="rows"]');

    this.el
      .querySelector('[data-hook="add-beat-row"]')
      .addEventListener("click", this.handleAddRow);
  }

  handleAddRow() {
    this.store.addRow({
      name: "tester",
      steps: [],
    });
  }

  renderRows() {
    if (!this.rowsEl) return;
    this.rowsEl.innerHTML = "";

    this.store.state.rows.forEach((rowData) => {
      new GridRow(rowData, this.store, this.rowsEl).init();
    });
  }
}
