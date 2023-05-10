import React, { useState, useEffect } from "react";
import LineChart from "./Components/Plot";
import AnovaInput from "./Components/AnovaInput";

function PresentationTab() {
  const [myData, setMyData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "ARIMA",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  });
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    console.log(inputs, "- Has changed");
    // placeholder for request from aws lambda
    // setMyData({
    //   xValues: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    //   y1Values: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40)),
    // });
    setMyData({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "ARIMA",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40)),
        },
      ],
    });
  }, [inputs]);

  return (
    <div>
      <AnovaInput setInputs={setInputs} />
      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <LineChart data={myData} />
      </div>
    </div>
  );
}

export default PresentationTab;
