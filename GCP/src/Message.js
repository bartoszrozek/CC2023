import "./App.css";

import React, { useState, useEffect } from "react";

function Message(props) {
  return (
    <div className={"message-main-" + (props.main_speaker ? "right" : "left")}>
      <div
        className={
          "message-div " + (props.main_speaker ? "right-mess" : "left-mess")
        }
      >
        <div className="message-header">
          <div className="speaker-div">
            <p>Speaker {props.speaker}</p>
          </div>
          <div>
            <p>{props.time}</p>
          </div>
        </div>
        <div className="message-text">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
