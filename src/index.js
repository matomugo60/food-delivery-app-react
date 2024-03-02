import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Assuming the path to index.css is correct
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import StateProvider from "./Components/Context/state-context";

// Assuming initialState is correctly exported from ./Components/Context/initialState
import { initialState } from "./Components/Context/initialState";
import reducer from "./Components/Context/reducer";

// Commented out potentially conflicting import
// import * as createPath from "history/createPath";

ReactDOM.render(
  <BrowserRouter>
    <AnimatePresence exitBeforeEnter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </AnimatePresence>
  </BrowserRouter>,
  document.getElementById("root")
);
