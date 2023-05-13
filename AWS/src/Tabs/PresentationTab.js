import React, { useState, useEffect } from "react";
import LineChart from "./Components/Plot";
import AnovaInput from "./Components/AnovaInput";

function PresentationTab() {
  const [myData, setMyData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Prediction",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  });
  const [inputs, setInputs] = useState({});
  const [labels, setLabels] = useState([]);
  const [plotValues, setPlotValues] = useState([]);

  function fetchPrediction(
    link = "https://cloudy2023pw-output-bucket.s3.amazonaws.com/file_example9.json"
  ) {
    let labels = [];
    let vals = [];
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((x) => {
          labels.push(x["ReportDate"]);
          vals.push(x["Variable"]);
        });
        console.log(labels);
        console.log(vals);

        setLabels(labels);
        setPlotValues(vals);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    console.log("Has changed");

    let fileName = "file_example9";

    fetchPrediction(
      "https://cloudy2023pw-output-bucket.s3.amazonaws.com/" +
        fileName +
        ".json"
    );

    console.log(labels);
    console.log(plotValues);

    setMyData({
      labels: labels,
      datasets: [
        {
          label: "ARIMA",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
          data: plotValues,
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
