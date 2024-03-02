import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import StateProvider from "./Components/Context/state-context";
import { initialState } from "./Components/Context/intialState";
import reducer from "./Components/Context/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AnimatePresence exitBeforeEnter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </AnimatePresence>
  </BrowserRouter>
);
