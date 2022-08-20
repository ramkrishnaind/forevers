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

function Home() {
  React.useEffect(() => {
    // !window.adsbygoogle
    //   ? (window.adsbygoogle = window.adsbygoogle || []).push({})
    //   : console.log("Adsbygoogle already exists");
  }, []);
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
          <Ad />

          {/* <DynamicTimer /> */}
          <News />
        </div>
      </main>
    </>
  );
}

export default Home;
