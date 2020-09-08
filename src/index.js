import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/App";

const things = [
  { name: "Atos", type: "dog" },
  { name: "Jahwe", type: "god" },
  { name: "Puszek", type: "cat" },
  { name: "helium", type: "element" },
  { name: "dell", type: "computer" },
  { name: "Mikky", type: "mouse" },
];

ReactDOM.render(<App things={things} />, document.getElementById("root"));
