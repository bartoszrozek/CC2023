import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import * as dfd from "danfojs";

function CsvReader() {
  const [csvData, setCsvData] = useState([]);
  const [status, setStatus] = useState(0);
  const [fileName, setFileName] = useState("");
  const [tagsList, setTagList] = useState("");
  const [fileInput, setFileInput] = useState("");

  const handleChangeFileName = (event) => {
    setFileName(event.target.value);
  };

  const handleChangeTagsList = (event) => {
    setTagList(event.target.value);
  };

  const handleCsvFile = (event) => {
    setFileInput(event.target.files[0]);
  };

  const handleUploadFile = (event) => {
    dfd
      .readCSV(fileInput)
      .then((df) => {
        df.head().print();
        setCsvData(df);
      })
      .catch((err) => {
        console.log(err);
      });
    if (csvData.length != 0) {
      const df_json = dfd.toJSON(csvData);

      let body_data = {
        df: df_json,
        fileName: fileName,
        tags: tagsList,
      };

      let data = "";
      async function readStream(reader) {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            console.log("Stream fully consumed.");
            break;
          }

          console.log(`Received chunk of size ${value.byteLength}.`);

          data += new TextDecoder().decode(value);

          // Do something with the chunk of data here.
          // For example, you could write it to a file or process it in some way.
          console.log(data);
        }
      }

      console.log(JSON.stringify(body_data));
      console.log(fileName);

      fetch(
        "https://7ggeit3d73.execute-api.us-east-1.amazonaws.com/prod/uploadfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body_data),
        }
      )
        .then((response) => response.status)
        .then((data) => setStatus(data))
        .catch((error) => console.error(error));
    } else {
      setStatus(505);
    }
  };

  return (
    <div>
      <input
        type="text"
        id="file_name"
        name="file_name"
        value={fileName}
        onChange={handleChangeFileName}
      ></input>
      <br />
      <input
        type="text"
        id="file_name"
        name="file_name"
        value={tagsList}
        onChange={handleChangeTagsList}
      ></input>
      <br />
      <input type="file" onChange={handleCsvFile} />
      <div>{status}</div>
      <button onClick={handleUploadFile}>Upload file</button>
      {status === 200 && <p>Upload successful</p>}
      {status > 200 && <p>Upload failed!</p>}
    </div>
  );
}

export default CsvReader;
