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
    <div style={{ flex: 1, display: "flex" }}>
      <Head>
        <title>Forevers.in</title>
      </Head>
      <main className="container-sm flex flex-col flex-1">
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
        {/* <div> */}
        <img src="/assets/modi.jpg" alt="pm-image" />
        {/* <Ad /> */}

        {/* <DynamicTimer /> */}
        {/* <div style={{ flex: 1 }}>afjafjl</div> */}
        <News />
        {/* </div> */}
      </main>
    </div>
  );
}

export default Home;
