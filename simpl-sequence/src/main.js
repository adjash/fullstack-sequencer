import "./style.css";
import { DemoButton } from "./components/demo-button/demo-button.js";
import { SequenceForm } from "./components/sequence-form/sequence-form.js";
import { SequenceStore } from "./store/sequence-store.js";
import { SequenceGrid } from "./components/sequence-grid/sequence-grid.js";

const initApp = () => {
  const DOMEntrypoint = document.querySelector("#app");
  const store = new SequenceStore();
  new SequenceForm(store, DOMEntrypoint).init();
  new SequenceGrid(store, DOMEntrypoint).init();
};

initApp();
