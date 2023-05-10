import React, { useState } from "react";
import InputTab from "./Tabs/InputTab";
import PresentationTab from "./Tabs/PresentationTab";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState(2);

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  return (
    <div>
      <h1>Cloud computing : project 2 - AWS</h1>
      <hr />
      <div className="tabs">
        <div
          onClick={() => handleTabClick(1)}
          className={
            "tabset " + (activeTab === 1 ? "active-tab" : "nonactive-tab")
          }
        >
          <p>Upload data</p>
        </div>
        <div
          onClick={() => handleTabClick(2)}
          className={
            "tabset " + (activeTab === 2 ? "active-tab" : "nonactive-tab")
          }
        >
          <p>ARIMA analysis</p>
        </div>
      </div>
      {activeTab === 1 && <InputTab />}
      {activeTab === 2 && <PresentationTab />}
    </div>
  );
}

export default App;
