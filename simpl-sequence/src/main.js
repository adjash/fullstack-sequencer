import "./style.css";
import { SequenceForm } from "./components/sequence-form/sequence-form.js";
import { SequenceStore } from "./store/sequence-store.js";
import { SequenceGrid } from "./components/sequence-grid/sequence-grid.js";
import apiHealthCheck from "./utils/healthcheck.js";
import { SequenceTransport } from "./components/sequence-transport/sequence-transport.js";
import { AudioEngine } from "./audio/AudioEngine.js";

apiHealthCheck();

const initApp = () => {
  const DOMEntrypoint = document.querySelector("#app");
  const store = new SequenceStore();

  store.addRow({
    name: "default-bar",
    steps: [],
  });

  new SequenceTransport(store, DOMEntrypoint).init();
  new SequenceForm(store, DOMEntrypoint).init();
  new SequenceGrid(store, DOMEntrypoint).init();
  new AudioEngine(store).init();
};

initApp();
