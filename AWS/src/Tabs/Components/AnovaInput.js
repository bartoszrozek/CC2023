import React, { useState, useEffect, useRef } from "react";

function AnovaInput({ setInputs }) {
  const [fileNames, setFileNames] = useState(["file_example9"]);
  const [fileName, setFileName] = useState(fileNames[0]);
  const [tagName, setTagName] = useState("All");
  const [tagNames, setTagNames] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    async function readStream(reader) {
      let data = "";
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
        //console.log(data);
        return data;
      }
    }

    fetch(
      "https://uelh74d3lk.execute-api.us-east-1.amazonaws.com/prod/getnames",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.body)
      .then((data) => {
        let body = readStream(data.getReader());

        body.then((value) => {
          console.log(value);
          let files_tags = value.split("|");
          let fileNames_ = files_tags[0].split(",");
          let tags_ = files_tags[1].split(",");
          fileNames_ = fileNames_.map((name_, idx) => {
            return {
              name: name_.slice(0, -5),
              tag: tags_[idx],
            };
          });
          tags_ = tags_.filter((x) => x !== "").filter(onlyUnique);
          tags_.unshift("All");
          setFileNames(fileNames_);
          setTagNames(tags_);
          console.log(tags_);
        });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setFileName(ref.current.value);
  }, [tagName]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "fileName":
        setFileName(value);
        break;
      case "tagName":
        setTagName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputs = {
      fileName,
      tagName,
    };

    setInputs(inputs);

    console.log(inputs); // or update the state with dates object
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="centeredElements">
        <label htmlFor="fileName">File name:</label>
        <select
          id="fileName"
          onChangeCapture={handleInputChange}
          value={fileName}
          name="fileName"
          ref={ref}
        >
          {fileNames
            .filter((obj) => tagName === "All" || obj.tag === tagName)
            .map((obj) => (
              <option key={obj.name} value={obj.name}>
                {obj.name}
              </option>
            ))}
        </select>
      </div>
      <br />
      <div className="centeredElements">
        <label htmlFor="tagName">Tag name:</label>
        <select
          id="tagName"
          onChangeCapture={handleInputChange}
          value={tagName}
          name="tagName"
        >
          {tagNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="centeredElements" style={{ marginTop: "15px" }}>
        <button type="submit">Show prediction</button>
      </div>
    </form>
  );
}

export default AnovaInput;

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
