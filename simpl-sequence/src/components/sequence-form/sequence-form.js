import { SequenceGrid } from "../sequence-grid/sequence-grid";

export class SequenceForm {
  constructor(store, mountEl) {
    this.mountEl = mountEl;
    this.el = document.createElement("form");
    this.store = store;
  }

  init() {
    this.mountEl.appendChild(this.el);

    this.render();
    this.setupEventListeners();
  }

  render() {
    this.el.innerHTML = `
      <label>BPM:</label>
      <input name="bpm" id="bpm" type="number" value="80"/>
      <label>Beats in bar:</label>

      <input name="beatsInBar" id="beatsInBar" type="number" value="4"/>

      <label>Bar Count:</label>
      <input name="barCount" id="barCount" type="number" value="8"/>

      <button type="submit">Create</button>
    `;
  }

  setupEventListeners() {
    this.el.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const beatData = Object.fromEntries(formData.entries());
      this.store.setConfig(beatData);
      console.log(this.store);
    });
  }
}
