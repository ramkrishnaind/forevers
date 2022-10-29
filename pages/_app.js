import React, { useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import "./../styles/globals.css";

import { GlobalContext } from "./../app/state/contexts/AppContext";
import Head from "next/head";
import Script from "next/script";
import Ad from "../components/Ad/Ad";
function enableGoogleAdsense() {
  const head = document.getElementsByTagName("head")[0];
  const scriptElement = document.createElement(`script`);
  scriptElement.type = `text/javascript`;
  scriptElement.async;
  scriptElement.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7006648733841921";
  scriptElement.crossOrigin = "anonymous";
  head.appendChild(scriptElement);
}
function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    console.log("Added EventListners");
    document
      .querySelector("#div-gpt-ad-1666968727085-0")
      .addEventListener("click", addEL);
  }, []);
  const [slugChanged, setSlugChanged] = React.useState(false);
  let scriptEle;

  function loadJS(FILE_URL, async = true) {
    try {
      document.body.removeChild(scriptEle);
    } catch {}
    try {
      scriptEle.removeEventListener("load", loadEvent);
    } catch {}
    //   console.log("removed");
    // }
    scriptEle = document.createElement("script");

    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", async);
    // scriptEle.setAttribute("data-ad-client", "ca-pub-7006648733841921");

    document.body.appendChild(scriptEle);
    const loadEvent = () => {
      console.log("File loaded");

      const { googletag } = window;
      googletag?.cmd.push(function () {
        googletag.pubads().disableInitialLoad();
        googletag.enableServices();
      });
    };
    // success event
    scriptEle.addEventListener("load", loadEvent);
    // error event
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file", ev);
    });
  }
  const router = useRouter();
  useEffect(() => {
    setSlugChanged(true);
    setTimeout(() => {
      setSlugChanged(false);
    }, 1000);
  }, [router.asPath]);
  useEffect(() => {
    debugger;
    var ads = document.getElementsByClassName("adsbygoogle").length;
    console.log("ads.length", ads);
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  // debugger;
  useEffect(() => {
    debugger;
    var ads = document.getElementsByClassName("adsbygoogle").length;
    console.log("ads.length.2", ads);
    window.adsbygoogle = [];
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, [router.asPath]);
  useEffect(() => {
    // debugger;
    const { googletag } = window;
    if (googletag) {
      googletag.cmd.push(function () {
        googletag.pubads()?.refresh();
      });
    }
  }, [router.asPath]);
  console.log("router", router);
  // React.useEffect(() => {}, []);
  React.useEffect(() => {
    // loadJS(
    //   "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7006648733841921"
    // );
    enableGoogleAdsense();
    // document.write(
    //   '<script data-ad-client="ca-pub-7006648733841921" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
    // );
  }, [router.asPath]);
  const admin = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F2F2F0",
        }}
        className="flex-col md:flex-row gap-3"
      >
        {/* <Script
          id="Adsense-id"
          data-ad-client="7006648733841921"
          async="true"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        /> */}

        <div className="w-full hidden md:flex-1 md:block"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            // width: "80vw",

            minHeight: "100vh",
            // flex: 1,
          }}
          className="w-full md:w-1000px"
        >
          <Header marginX={"220px"} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              // margin: "auto",
              minWidth: "100%",
              // position: "relative",

              flex: 1,
            }}
            // className="md:top-[5rem] top-[4rem]"
          >
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
        <div className="w-full hidden md:block md:flex-1"></div>
      </div>
    </>
  );
  const other = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F2F2F0",
        }}
        className="flex-col md:flex-row gap-3"
      >
        {/* <Script
          id="Adsense-id"
          data-ad-client="7006648733841921"
          async="true"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        /> */}

        <div className="w-full hidden md:flex-1 md:block">
          {/* <Ad currentPath="page add" dataAdSlot="2909822801" /> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            // width: "80vw",

            minHeight: "100vh",
            // flex: 1,
          }}
          className="w-full md:w-1000px"
        >
          <Header marginX={"220px"} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              // margin: "auto",
              minWidth: "100%",
              // position: "relative",

              flex: 1,
            }}
            // className="md:top-[5rem] top-[4rem]"
          >
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
        <div className="w-full hidden md:block md:flex-1">
          {/* <Ad currentPath="below footer ad" dataAdSlot="2989713855" /> */}
        </div>
      </div>
    </>
  );
  const news = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F2F2F0",
        }}
      >
        {/* <Script
          id="Adsense-id"
          async
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7006648733841921"
          crossorigin="anonymous"
        /> */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",

            // width: "80vw",
            minHeight: "100vh",
            // flex: 1,
          }}
          className="w-full md:w-1280px"
        >
          <Header marginX={"80px"} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // position: "relative",
              // justifyContent: "center",
              // alignItems: "center",
              // margin: "auto",
              minWidth: "100%",
              flex: 1,
            }}
            className="w-full md:w-4/6"
          >
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
  return (
    <GlobalContext>
      {/* {!slugChanged && (
        <Script
          id="Adsense-id"
          data-ad-client="ca-pub-7006648733841921"
          async="true"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
      )} */}
      {/* <Script
        id="Adsense-id"
        async
        // data-ad-client="ca-pub-2397723075092719"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7006648733841921"
        crossorigin="anonymous"
      /> */}
      <Head>
        {/* <Script
          id="Adsense-id"
          data-ad-client="ca-pub-7006648733841921"
          async="true"
          strategy="beforeInteractive"
          crossorigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <script
          async
          crossorigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7006648733841921"
        ></script> */}
      </Head>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-3FQ8TMKYFR');
              `,
        }}
      />
      {router.asPath.includes("/admin")
        ? admin
        : router.asPath.includes("/news/")
        ? news
        : other}
      {/* {router.asPath.includes("/admin")
        ? admin
        : router.asPath.includes("/news/")
        ? news
        : other} */}
    </GlobalContext>
  );
}

export default MyApp;
