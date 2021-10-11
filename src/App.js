import React from "react";
import "./App.css";
import Router from "./component/routing/Router";
import CustomUtil from "./helpers/CustomUtil";
import "./App.scss";
import { EVENTS, createEventId } from "./fakeDb/events";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
