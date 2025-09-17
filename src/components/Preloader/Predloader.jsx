import React from "react";
import "./Preloader.css";

function Preloader({ text }) {
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
      {text && <p className="preloader__text">{text}</p>}
    </div>
  );
}

export default Preloader;
