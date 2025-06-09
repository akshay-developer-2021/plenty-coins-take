import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

// this is where the app starts
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
