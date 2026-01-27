export class GridRow {
  constructor(rowData, store, mountEl) {
    this.rowData = rowData;
    this.mountEl = mountEl;
    this.store = store;
    this.el = document.createElement("div");
    this.el.className = "grid-row";
  }

  init() {
    this.render();
    this.mountEl.appendChild(this.el);
  }

  render() {
    this.el.innerHTML = `
    <span>${this.rowData.name} - ${JSON.stringify(this.rowData)}</span>
    <button data-hook="delete-row">Delete row</button>
    `;
    this.el
      .querySelector("button[data-hook='delete-row']")
      .addEventListener("click", () => this.store.removeRow(this.rowData.id));
  }
}
