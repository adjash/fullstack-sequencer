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
    `;

    this.el
      .querySelector("[data-hook='play']")
      .addEventListener("click", () => {
        this.store.state.isPlaying ? this.store.stop() : this.store.play();
      });
  }
}
