import { SequenceGrid } from "../sequence-grid/sequence-grid";

export class SequenceForm {
  constructor(mountEl) {
    this.mountEl = mountEl;
    this.el = document.createElement("form");

    this.state = {
      bpm: 80,
      beatsInBar: 4,
      barCount: 4,
    };
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
      new SequenceGrid(beatData).init();
    });
  }
}
