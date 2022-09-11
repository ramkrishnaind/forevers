import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Script from "next/script";
function Ad(...props) {
  //{ dataAdSlot = "2330142456" }
  const { currentPath, dataAdSlot = "2330142456" } = props;
  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, [currentPath]);
  useEffect(() => {
    const { googletag } = window;
    if (googletag) {
      googletag.cmd.push(function () {
        googletag.pubads().refresh();
      });
    }
  }, []);
  // <Script
  //   id="Adsense-id"
  //   async
  //   onError={(e) => {
  //     console.error("Script failed to load", e);
  //   }}
  //   strategy="afterInteractive"
  //   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2397723075092719"
  //   crossorigin="anonymous"
  // />;
  // ...props
  // useEffect(() => {
  //   try {
  //     !window.adsbygoogle
  //       ? (window.adsbygoogle = window.adsbygoogle || []).push({})
  //       : console.log("Adsbygoogle already exists");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  return (
    <div key={currentPath}>
      {/*START horizonalAds Google Adsense */}
      <ins
        className="adsbygoogle horizonalAds"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2397723075092719"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      {/* END horizonalAds Google Adsense */}
    </div>

    // <div className={styles.container}>
    //   <ins
    //     className="adsbygoogle"
    //     style={{ display: "block" }}
    //     data-ad-client="ca-pub-2397723075092719"
    //     data-ad-slot={dataAdSlot}
    //     data-ad-format="auto"
    //     data-full-width-responsive="true"
    //   ></ins>
    // </div>
  );
}

export default Ad;
