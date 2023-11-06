import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "@fortawesome/fontawesome-free/css/all.min.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
