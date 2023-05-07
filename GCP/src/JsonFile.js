import { ref, getDownloadURL } from "firebase/storage";
import { storage_var } from "./firebase";
import "firebase/storage";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import "firebase/storage";
import "firebase/database";
import Message from "./Message";

function JsonFile(props) {
  const [data, setData] = useState(null);
  const [conversation, setConversation] = useState(null);
  let main_speaker;

  useEffect(() => {
    // Get a reference to the JSON file
    const fileRef = ref(storage_var, "/files/" + props.selectedValue + ".txt");
    if (props.selectedValue === "Select file") {
      setConversation(null);
      return;
    }

    // Download the file and parse its content
    getDownloadURL(fileRef)
      .then((url) => {
        return fetch(url).then((response) => {
          return response.text();
        });
      })
      .then((data) => {
        // Write the data to the Realtime Database
        // Update the state with the data
        setData(data);

        let conv = [{ speaker: "1", time: "", text: data }];

        // let conv = data["segments"]
        //   .map((speaker_it) =>
        //     speaker_it["transcript"].map((x) => ({
        //       speaker: speaker_it.speaker,
        //       time: x.start,
        //       text: x.text,
        //     }))
        //   )
        //   .flat(1)
        //   .sort((a, b) => {
        //     if (a.time < b.time) return -1;
        //     if (a.time > b.time) return 1;
        //     return 0;
        //   });
        setConversation(conv);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props]);

  return (
    <div>
      {!conversation ? (
        <p>Chose a conversation to display</p>
      ) : data ? (
        // <pre>{JSON.stringify(data, null, 2)}</pre>
        ((main_speaker = conversation[0].speaker),
        conversation.map((statement) => (
          <Message
            key={uuidv4()}
            speaker={statement.speaker}
            main_speaker={main_speaker === statement.speaker}
            text={statement.text}
            time={statement.time}
          />
        )))
      ) : props.selectedValue === "Select file" ? (
        <p></p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default JsonFile;
