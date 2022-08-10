import React, { useState } from "react";
import "./App.css";
import Avatar from "@mui/material/Avatar";
import Video from "./components/video";
import data from "./components/data";
import { deepPurple } from "@mui/material/colors";

function App() {
  const [videoNumber, setVideo] = useState(0);

  return (
    <div className="App">
      <div style={{ width: "50%" }}>
        <Video
          videoUrl={data[videoNumber].videoUrl}
          captionData={data[videoNumber].captionData}
          startPlaying={data[videoNumber].startPlaying}
        />
      </div>
      <div style={{ width: "50%" }}>
        {videoNumber === 0 ? (
          <div className="btnContainer">
            <button className="btn0" onClick={() => setVideo(1)}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>{" "}
              <div style={{ margin: "0px 10px" }}>Campaign Structure</div>
            </button>
            <button className="btn0" onClick={() => setVideo(2)}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>B</Avatar>{" "}
              <div style={{ margin: "0px 10px" }}>Learn Facebook Basics</div>
            </button>
          </div>
        ) : (
          <div className="btnContainer">
            <button
              className="btn0"
              style={{
                backgroundColor: "rgb(125,0,254)",
                color: "white",
                width: "40%",
              }}
              onClick={() => setVideo(0)}
            >
              {videoNumber === 1
                ? "Download Campaign Structure Guide"
                : "Signup for Free Webinar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
