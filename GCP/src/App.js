import { useState, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage_var } from "./firebase";
import "firebase/storage";
import "./App.css";
import FirebaseFileList from "./ListFiles";
import JsonFile from "./JsonFile";

function App() {
  const [progress, setProgress] = useState(-1);
  const [progressMessage, setProgressMessage] = useState("");

  //  Uploading file
  useEffect(() => {
    if (progress === 100) {
      setProgressMessage("File uploaded!");
      waitAfterUpload(setProgress);
    } else if (progress === 0) {
      setProgressMessage("Starting uploading...");
    } else if (progress === -1) {
      setProgressMessage("");
    } else {
      setProgressMessage("Uploading done " + progress + " %");
    }
  }, [progress]);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage_var, `upload/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const [selectedValue, setSelectedValue] = useState("Select file");

  function handleSelectChange(event) {
    setSelectedValue(event.target.value);
  }

  return (
    <div className="App">
      <div className="title-banner">
        <h1>Cloud Computing GCP App</h1>
      </div>
      <hr />
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <h2>{progressMessage}</h2>
      <hr />
      <div style={{ marginLeft: "15px", width: "100%" }}>
        <button
          style={{ float: "left", width: "100px" }}
          onClick={(x) => window.location.reload()}
        >
          Refresh
        </button>
      </div>
      <FirebaseFileList onChange={handleSelectChange} />
      <br />
      <JsonFile selectedValue={selectedValue} />
    </div>
  );
}

export default App;

const waitAfterUpload = async (setProgress) => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  await delay(5000);
  setProgress(-1);
};
