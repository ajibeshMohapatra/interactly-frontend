import React, { useState, useRef, useEffect } from "react";
import "./video.css";
import PlayArrow from "@mui/icons-material/PlayArrow";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

function Video({ videoUrl, captionData }) {
  const [startP, setStart] = useState(false);
  const [showB, setShow] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playBackRate, setplayBackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    setVideoTime(videoP.current.duration);
  });
  window.setInterval(function () {
    setCurrentTime(videoP.current?.currentTime);
    setProgress((videoP.current?.currentTime / videoTime) * 100);
    if (videoTime === videoP.current?.currentTime) {
      setShow(true);
    }
  }, 1000);
  const videoP = useRef(null);
  const handlePlay = () => {
    console.log("Play button clicked");
    if (!startP) {
      setStart(true);
      videoP.current.currentTime = 0;
      videoP.current.muted = false;
      videoP.current.loop = false;
      videoP.current.play();
      setShow(false);
    } else {
      videoP.current.play();
      setShow(false);
    }
  };
  const handleVideoClick = () => {
    if (videoP.current.paused) {
      videoP.current.play();
      setShow(false);
    } else {
      videoP.current.pause();
      setShow(true);
    }
    console.log("pause button clicked");
  };
  const handleCaption = () => {
    if (showCaption) {
      for (var i = 0; i < videoP.current.textTracks.length; i++) {
        videoP.current.textTracks[i].mode = "hidden";
      }
      setShowCaption(false);
    } else {
      for (var i = 0; i < videoP.current.textTracks.length; i++) {
        videoP.current.textTracks[i].mode = "showing";
      }
      setShowCaption(true);
    }
  };
  const handlePlaybackRate = () => {
    if (playBackRate === 1) {
      videoP.current.playbackRate = 1.5;
      setplayBackRate(1.5);
    } else if (playBackRate === 1.5) {
      videoP.current.playbackRate = 2;
      setplayBackRate(2.0);
    } else {
      videoP.current.playbackRate = 1;
      setplayBackRate(1.0);
    }
  };
  const handleFullScreen = () => {
    if (fullScreen) {
      document.webkitCancelFullScreen();
      setFullScreen(false);
    } else {
      document.getElementById("container").webkitRequestFullScreen();
      setFullScreen(true);
    }
  };
  return (
    <div id="container">
      {startP && (
        <div
          className="progressContainer"
          style={{ width: fullScreen && "100vw" }}
        >
          <div
            id="progress"
            className="progress"
            style={{
              width: progress + "%",
            }}
          ></div>
        </div>
      )}
      <video
        ref={videoP}
        autoPlay
        muted
        loop
        preload="auto"
        onClick={handleVideoClick}
        id="videoPlayer"
        src={videoUrl}
        className="fvlFFi"
        style={{ width: fullScreen && "100vw", height: !startP && "100vh" }}
      >
        <track
          default
          src={captionData}
          kind="subtitles"
          srcLang="en"
          label="English"
        ></track>
      </video>
      {startP && (
        <div className="control" style={{ right: fullScreen && "5%" }}>
          <span className="controlBtn">
            {Math.floor(currentTime / 60) +
              ":" +
              ("0" + Math.floor(currentTime % 60)).slice(-2)}{" "}
            /
            {Math.floor(videoTime / 60) +
              ":" +
              ("0" + Math.floor(videoTime % 60)).slice(-2)}
          </span>
          <span className="controlBtn">
            <button
              onClick={handleCaption}
              className="btn1"
              title="Subtitles/Closed Captions"
              style={{
                backgroundColor: !showCaption && "transparent",
                color: !showCaption && "white",
                borderColor: !showCaption && "white",
              }}
            >
              {" "}
              CC{" "}
            </button>
          </span>
          <span className="controlBtn">
            <button
              onClick={handlePlaybackRate}
              className="btn1"
              title="PlayBack Speed"
            >
              {" "}
              {playBackRate}X{" "}
            </button>
          </span>
          <span className="controlBtn">
            <button
              onClick={handleFullScreen}
              className="btn1"
              title="FullScreen"
              style={{
                display: "flex",
                backgroundColor: "transparent",
                color: "white",
                borderColor: "white",
                borderWidth: "2px",
                padding: "1px 2px",
              }}
            >
              {fullScreen ? (
                <FullscreenExitIcon />
              ) : (
                <FullscreenIcon sx={{ fontSize: 20 }} />
              )}
            </button>
          </span>
        </div>
      )}
      {showB && (
        <button
          className="btn2"
          onClick={handlePlay}
          style={{ left: fullScreen && "50%" }}
        >
          <PlayArrow sx={{ fontSize: 80 }} />
        </button>
      )}
    </div>
  );
}

export default Video;
