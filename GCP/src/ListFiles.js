import React, { useEffect, useState } from "react";
import { listRef } from "./firebase";
import { listAll } from "firebase/storage";

function FirebaseFileList({ onChange }) {
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    // List all the files in the folder
    listAll(listRef).then((result) => {
      const names = result.items
        .map((item) => item.name)
        .filter((item) => item.slice(-4) === ".txt")
        .map((item) => item.slice(0, -4));
      setFileNames(names);
    });
  }, []);

  return (
    <div style={{ marginRight: "115px" }} className="file-selector">
      <label>Choose a file: </label>
      <select name="files" id="files" onChange={onChange}>
        <option value="Select file">Select file</option>
        {fileNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FirebaseFileList;
