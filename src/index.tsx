import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  // this is where magic happens
  (() => (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ))(),
);

console.log("Initial render complete");
