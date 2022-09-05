import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
function Ad({ dataAdSlot = "2330142456" }) {
  useEffect(() => {
    try {
      !window.adsbygoogle
        ? (window.adsbygoogle = window.adsbygoogle || []).push({})
        : console.log("Adsbygoogle already exists");
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div className={styles.container}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2397723075092719"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default Ad;
