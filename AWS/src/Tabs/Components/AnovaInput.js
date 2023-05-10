import React, { useState } from "react";

function AnovaInput({ setInputs }) {
  const minCal = "2018-01-01";
  const maxCal = "2018-12-31";
  const minPred = "2019-01-01";
  const maxPred = "2019-12-31";
  const variables = ["variable1", "variable2", "variable3"];

  const [dateStartCal, setDateStartCal] = useState(minCal);
  const [dateEndCal, setDateEndCal] = useState(maxCal);
  const [dateStartPred, setDateStartPred] = useState(minPred);
  const [dateEndPred, setDateEndPred] = useState(maxPred);
  const [variableInput, setVariableInput] = useState(variables[0]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "dateStartCal":
        setDateStartCal(value);
        break;
      case "dateEndCal":
        setDateEndCal(value);
        break;
      case "dateStartPred":
        setDateStartPred(value);
        break;
      case "dateEndPred":
        setDateEndPred(value);
        break;
      case "variableInput":
        setVariableInput(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputs = {
      dateStartCal,
      dateEndCal,
      dateStartPred,
      dateEndPred,
      variableInput,
    };

    setInputs(inputs);

    console.log(inputs); // or update the state with dates object
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="input-div">
          <label htmlFor="dateStartCal">Start of the calibration:</label>
          <input
            type="date"
            id="dateStartCal"
            name="dateStartCal"
            value={dateStartCal}
            min={minCal}
            max={maxCal}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="input-div">
          <label htmlFor="endCalibration">End of the calibration:</label>
          <input
            type="date"
            id="dateEndCal"
            name="dateEndCal"
            value={dateEndCal}
            min={minCal}
            max={maxCal}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>

      <div>
        <div className="input-div">
          <label htmlFor="startPrediction">Start of the prediciton:</label>
          <input
            type="date"
            id="dateStartPred"
            name="dateStartPred"
            value={dateStartPred}
            min={minPred}
            max={maxPred}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="input-div">
          <label htmlFor="endPrediction">End of the prediciton:</label>
          <input
            type="date"
            id="dateEndPred"
            name="dateEndPred"
            value={dateEndPred}
            min={minPred}
            max={maxPred}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>

      <div className="input-div">
        <label htmlFor="variableInput">Modelling variable:</label>
        <select
          id="variableInput"
          onChange={handleInputChange}
          value={variableInput}
          name="variableInput"
        >
          {variables.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-div">
        <button type="submit">Calibrate!</button>
      </div>
    </form>
  );
}

export default AnovaInput;
