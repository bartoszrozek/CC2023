import React, { useState } from "react";
import * as dfd from "danfojs";

function CsvReader() {
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
        setStatus(-1);
        df.head().print();
        console.log(df);
        if (df !== 0) {
          const df_json = dfd.toJSON(df);
    
          let body_data = {
            df: df_json,
            fileName: fileName,
            tags: tagsList,
          };
    
          console.log(body_data);
          console.log(JSON.stringify(body_data));
    
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
            .then((data) => {
              setStatus(data);
              waitAfterUpload(setStatus);
            })
            .catch((error) => {
              console.error(error);
              setStatus(505);
              waitAfterUpload(setStatus);
            });
        } else {
          setStatus(505);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div>
      <div className="centeredElements">
        <label htmlFor="file_name">File name:</label>
        <input
          type="text"
          id="file_name"
          name="file_name"
          value={fileName}
          onChange={handleChangeFileName}
        ></input>
      </div>
      <br />
      <div className="centeredElements">
        <label htmlFor="file_name">Tag:</label>
        <input
          type="text"
          id="tag_name"
          name="tag_name"
          value={tagsList}
          onChange={handleChangeTagsList}
        ></input>
      </div>
      <br />
      <div className="centeredElements" style={{ marginLeft: "50px" }}>
        <input type="file" accept=".csv" onChange={handleCsvFile} />
      </div>
      <br />
      <div className="centeredElements">
        <button onClick={handleUploadFile}>Upload file</button>
      </div>
      <div className="centeredElements">
        {status === 200 && <p>Upload successful!</p>}
        {status > 200 && <p>Upload failed!</p>}
        {status === -1 && <p>Uploading...</p>}
      </div>
    </div>
  );
}

export default CsvReader;

const waitAfterUpload = async (setStatus) => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  await delay(5000);
  setStatus(0);
};
