import React from "react";
import BusMap from "./components/BusMap";

const App = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>🚍 Live Bus Tracker</h2>
      <BusMap />
    </div>
  );
};

export default App;