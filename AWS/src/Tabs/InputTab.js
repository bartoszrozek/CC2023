import React, { useState } from "react";
import Papa from "papaparse";

function InputTab() {
  const [csvData, setCsvData] = useState([]);
  const [csvValid, setCsvValid] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: (results) => {
        setCsvData(results.data);
        setCsvValid(checkCsvFormat(results.data));
      },
      header: true,
    });
  }

  function checkCsvFormat(data) {
    // Implement your own validation logic here
    // This example checks if the CSV has at least two columns
    return data.length > 0 && data[0].length >= 2;
  }

  return (
    <div className="load-data-div">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {csvData.length > 0 && (
        <div>
          <p>CSV file loaded successfully!</p>
          {csvValid ? (
            <p>CSV file has valid format.</p>
          ) : (
            <p>CSV file has invalid format.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default InputTab;
