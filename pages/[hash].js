import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import Script from "next/script";
import Header from "./../components/Header/Header";
import Ad from "./../components/Ad/Ad";
import News from "../components/News/News";
import dynamic from "next/dynamic";

import axios from "axios";
import { AppContext } from "./../app/state/contexts/AppContext";

const DynamicTimer = dynamic(() => import("../components/Timer/Timer"), {
  ssr: false,
});
const DynamicAd = dynamic(() => import("../components/Ad/Ad"), {
  ssr: false,
});

function Home() {
  const router = useRouter();
  const { hash } = router.query;
  useEffect(() => {
    // !window.adsbygoogle
    //   ? (window.adsbygoogle = window.adsbygoogle || []).push({})
    //   : console.log("Adsbygoogle already exists");
    if (hash) {
      localStorage.setItem("mozilla-support-status", hash);
    }
  }, [hash]);

  return (
    <>
      <Head>
        <title>Forevers.in</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.app}>
          <img
            src="/assets/modi.jpg"
            alt="pm-image"
            style={{ width: "100%" }}
          />
          {hash ? <DynamicTimer query={hash} /> : <h1>...</h1>}
          <DynamicAd />
          <News />
        </div>
      </main>
    </>
  );
}

export default Home;
