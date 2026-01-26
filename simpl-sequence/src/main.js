import "./style.css";
import { DemoButton } from "./components/demo-button/demo-button.js";
import { SequenceForm } from "./components/sequence-form/sequence-form.js";

new SequenceForm(document.querySelector("#app")).init();
new DemoButton(document.querySelector("#app")).init();
