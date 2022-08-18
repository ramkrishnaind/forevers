import React, { useState } from "react";
import styles from "./style.module.scss";
function Ad() {
  return (
    <div className={styles.container}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2397723075092719"
        data-ad-slot="2330142456"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default Ad;
