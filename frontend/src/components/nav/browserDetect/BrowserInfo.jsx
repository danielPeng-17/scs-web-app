import React from "react";

const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  let browserName;
  if (userAgent.indexOf("Firefox") !== -1) {
    browserName = "Firefox";
  } else if (userAgent.indexOf("Chrome") !== -1) {
    browserName = "Chrome";
  } else if (userAgent.indexOf("Trident") !== -1) {
    browserName = "Internet Explorer";
  } else {
    browserName = "Unknown";
  }
  return browserName;
};

const BrowserInfo = () => {
  const browserName = getBrowserName();
  return (
    <div style={{ position: "fixed", bottom: 0, left: 20, width: "100%", backgroundColor: "white" }}>
      <p style={{ textAlign: "left", fontSize: "22px" }}>Browser: {browserName}</p>
    </div>
  );
};

export default BrowserInfo;