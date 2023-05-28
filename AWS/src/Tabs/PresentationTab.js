import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import LineChart from "./Components/Plot";
import AnovaInput from "./Components/AnovaInput";

function PresentationTab() {
  const [myData, setMyData] = useState({});
  const [inputs, setInputs] = useState({});
  const [labels, setLabels] = useState([]);
  const [plotValues, setPlotValues] = useState([]);
  const [dfColnames, setDfColnames] = useState([]);

  function downloadCSV() {
    const csvData =
      dfColnames.join() +
      "\n" +
      plotValues.map((item, idx) => `${item},${labels[idx]}`).join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  }

  function fetchPrediction(
    link = "https://cloudy2023pw-output-bucket.s3.amazonaws.com/file_example9.json"
  ) {
    let labels = [];
    let vals = [];
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        let colnames = Object.keys(data[0]);
        setDfColnames(colnames);
        data.forEach((x) => {
          labels.push(x[colnames[0]]);
          vals.push(x[colnames[1]]);
        });

        setLabels(labels);
        setPlotValues(vals);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    let fileName = inputs.fileName;
    setMyData({});

    console.log(fileName);

    fetchPrediction(
      "https://cloudy2023pw-output-bucket.s3.amazonaws.com/" +
        fileName +
        ".json"
    );
  }, [inputs]);

  useEffect(() => {
    setMyData({
      labels: labels,
      datasets: [
        {
          label: "Prediction",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
          data: plotValues,
        },
      ],
    });
  }, [labels]);

  return (
    <div>
      <AnovaInput setInputs={setInputs} />
      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <LineChart data={myData} />
      </div>
      <div className="centeredElements">
        <button onClick={downloadCSV}>Download data</button>
      </div>
    </div>
  );
}

export default PresentationTab;
