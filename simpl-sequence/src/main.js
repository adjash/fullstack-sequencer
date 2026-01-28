import "./style.css";
import { SequenceForm } from "./components/sequence-form/sequence-form.js";
import { SequenceStore } from "./store/sequence-store.js";
import { SequenceGrid } from "./components/sequence-grid/sequence-grid.js";
import apiHealthCheck from "./utils/healthcheck.js";

apiHealthCheck();

const initApp = () => {
  const DOMEntrypoint = document.querySelector("#app");
  const store = new SequenceStore();
  new SequenceForm(store, DOMEntrypoint).init();
  new SequenceGrid(store, DOMEntrypoint).init();
};

initApp();
