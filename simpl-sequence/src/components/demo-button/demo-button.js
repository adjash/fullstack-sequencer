export class DemoButton {
  constructor(mountEl) {
    this.mountEl = mountEl;
    this.el = document.createElement("div");
    this.counter = 0;
    this.buttonEl = null;

    this.state = {
      counter: 0,
    };
  }

  init() {
    this.mountEl.appendChild(this.el);

    this.render();
    this.setupEventListeners();
  }

  render() {
    this.el.innerHTML = `
      <div class="card">
        <button type="button">count is ${this.state.counter}</button>
      </div>
    `;
    this.buttonEl = this.el.querySelector("button");
  }

  setupEventListeners() {
    this.buttonEl.addEventListener("click", () => {
      this.state.counter = this.state.counter + 1;
      this.buttonEl.textContent = `count is ${this.state.counter}`;
    });
  }
}
