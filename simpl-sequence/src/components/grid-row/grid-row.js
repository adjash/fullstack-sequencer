export class GridRow {
  constructor(rowData, mountEl) {
    this.rowData = rowData;
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
      <span>${this.rowData.name}${JSON.stringify(this.rowData)}</span>
      <button data-hook="delete-row" onclick="console.log('hello');">Delete row</button>
    `;
  }
}
