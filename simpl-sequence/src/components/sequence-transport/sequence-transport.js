import fetchAPI from "../../utils/fetch";

export class SequenceTransport {
  constructor(store, mountEl) {
    this.store = store;
    this.mountEl = mountEl;
    this.el = document.createElement("div");
  }

  init() {
    this.render();
    this.mountEl.appendChild(this.el);
    this.store.addEventListener("change", () => this.render());
  }

  render() {
    this.el.innerHTML = `
      <button data-hook="play">
        ${this.store.state.isPlaying ? "Stop" : "Play"}
      </button>
      <button data-hook="save">Save</button>
    `;

    this.el
      .querySelector("[data-hook='play']")
      .addEventListener("click", () => {
        this.store.state.isPlaying ? this.store.stop() : this.store.play();
      });
    this.el
      .querySelector("[data-hook='save']")
      .addEventListener("click", () => {
        console.log(this.store);
        fetchAPI("/save", "POST", this.store);
      });
  }
}
