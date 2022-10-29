import React from "react";

const AdManager = ({ adCode = "1666968727085" }) => {
  return (
    <div
      id={`div-gpt-ad-${adCode}-0`}
      style={{ minWidth: "336px", minHeight: "280px" }}
    ></div>
  );
};

export default AdManager;
