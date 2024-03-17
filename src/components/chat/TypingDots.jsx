import React from "react";

const TypingDots = () => {
  return (
    <div className="typing" >
        {/* loadingFade Animation Ketframes are written in index.css */}
      <div className="typing__dot" style={{
        float: "left",
        width: "8px",
        height: "8px",
        margin: "0 4px",
        background: "#8d8c91",
        borderRadius: "50%",
        opacity: "01",
        animation: "loadingFade 1s infinite",
        "animation-delay": "0s",
      }}></div>
      <div className="typing__dot" style={{
        float: "left",
        width: "8px",
        height: "8px",
        margin: "0 4px",
        background: "#8d8c91",
        borderRadius: "50%",
        opacity: "01",
        animation: "loadingFade 1s infinite",
        animationDelay: "0.2s",
      }}></div>
      <div className="typing__dot" style={{
        float: "left",
        width: "8px",
        height: "8px",
        margin: "0 4px",
        background: "#8d8c91",
        borderRadius: "50%",
        opacity: "0",
        animation: "loadingFade 1s infinite",
        animationDelay: "0.4s",
      }}></div>
    </div>
  );
};

export default TypingDots;
