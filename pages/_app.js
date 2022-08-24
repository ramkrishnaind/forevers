import React, { useContext } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import "./../styles/globals.css";
import { GlobalContext } from "./../app/state/contexts/AppContext";
import Head from "next/head";
import Script from "next/script";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // console.log("router", router);
  React.useEffect(() => {
    // console.log("dispatch", dispatch);
    // !window.adsbygoogle
    //   ? (window.adsbygoogle = window.adsbygoogle || []).push({})
    //   : console.log("Adsbygoogle already exists");
    // if (state.posts.length > 0) {
    //   return;
    // }
  }, []);
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
          async
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2397723075092719"
          crossorigin="anonymous"
        /> */}
        <div className="w-full hidden md:block md:w-1/6">Ad will be shown</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            // width: "80vw",
            minHeight: "100vh",
            // flex: 1,
          }}
          className="w-full md:w-4/6"
        >
          <Header />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              // margin: "auto",
              minWidth: "100%",
              flex: 1,
            }}
          >
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
        <div className="w-full hidden md:block md:w-1/6">Ad will be shown</div>
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
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2397723075092719"
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
          className="md:w-5/6"
        >
          <Header />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              // margin: "auto",
              minWidth: "100%",
              flex: 1,
            }}
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
      {router.asPath.includes("/news/") ? news : other}
    </GlobalContext>
  );
}

export default MyApp;
