import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import GenerateCoinBtn from "../../components/GenerateCoinBtn/GenerateCoinBtn";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { AppContext } from "./../../app/state/contexts/AppContext";
import { getCookie, setCookie } from "cookies-next";
import Countdown from "react-countdown";
import Ad from "../../components/Ad/Ad";

import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import LeftAdvertisement from "../../components/News/LeftAdvertisement";
import RightAdvertisement from "../../components/News/RIghtAdvertisement";
import RelatedNPosts from "../../components/News/RIghtAdvertisement/RelatedNPosts";
import Comments from "../../components/News/Comments";
function News() {
  const [targetPost, setTargetPost] = React.useState();
  const [slugChanged, setSlugChanged] = React.useState(false);
  const [state, dispatch] = useContext(AppContext);
  const [checkAccMsg, setCheckAccMsg] = useState("Check My Account");
  const [status, setStatus] = React.useState("");
  const [collectingCoin, setCollectingCoin] = React.useState(false);
  const [isFetching, setFetching] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    debugger;
    const { googletag } = window;
    if (googletag) {
      googletag.cmd.push(function () {
        googletag.pubads()?.refresh();
      });
    }
  }, [id]);
  React.useEffect(() => {
    debugger;
    !window.adsbygoogle
      ? (window.adsbygoogle = window.adsbygoogle || []).push({})
      : console.log("Adsbygoogle already exists");
    setSlugChanged(true);
    setTimeout(() => {
      setSlugChanged(false);
    }, 10);
  }, [id]);
  React.useEffect(() => {
    // !window.adsbygoogle
    //   ? (window.adsbygoogle = window.adsbygoogle || []).push({})
    //   : console.log("Adsbygoogle already exists");
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts";
    (async () => {
      setFetching(true);
      axios.get(url).then((res) => {
        dispatch({ type: "setposts", payload: res.data.data });
        setFetching(false);
      });
    })();
    const urlCat =
      process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts/categories";
    (async () => {
      setFetching(true);
      axios.get(urlCat).then((res) => {
        dispatch({ type: "set-categories", payload: res.data.data });
        setFetching(false);
      });
    })();
    const urlCatPosts =
      process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts/categoryPosts";
    (async () => {
      setFetching(true);
      axios.get(urlCatPosts).then((res) => {
        dispatch({ type: "set-category-posts", payload: res.data.data });
        setFetching(false);
      });
    })();
    console.log("state", state);
  }, []);
  React.useEffect(() => {
    !window.adsbygoogle
      ? (window.adsbygoogle = window.adsbygoogle || []).push({})
      : console.log("Adsbygoogle already exists");
    setStatus(localStorage.getItem("mozilla-support-status"));
    console.log("state", state);
    // if (state.posts.length > 0) {
    //   return;
    // }
    // const url = process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts";
    // (async () => {
    //   setFetching(true);
    //   axios.get(url).then((res) => {
    //     dispatch({ type: "setposts", payload: res.data.data });
    //     setFetching(false);
    //   });
    // })();
    // debugger;
    setTargetPost(getPost(id));
  }, [id, state.posts]);

  function getEquivalentSlug(title) {
    let slug = "";
    let oldTitle = title;
    for (let i = 0; i < oldTitle.length; i++) {
      if (oldTitle[i] == " ") {
        slug += "-";
      } else {
        slug += oldTitle[i]?.toLowerCase();
      }
    }
    if (slug.substr(slug.length - 1) === "?")
      slug = slug.substr(0, slug.length - 1);
    return slug;
  }

  function getPost(postSlug) {
    // debugger;
    const allPosts = state.posts;
    let post = null;
    for (let i = 0; i < allPosts?.length; i++) {
      // debugger;
      const slug = getEquivalentSlug(allPosts[i].data.title);
      if (slug == postSlug) {
        post = allPosts[i];
        break;
      }
    }
    debugger;
    if (post) dispatch({ type: "set-current-post", payload: post?.data });
    return post;
  }
  if (isFetching) {
    return <p>Loading...</p>;
  }
  // const targetPost = getPost(id);
  function handleClickCollectCoin() {
    setCollectingCoin(true);
    // Increment Coin in user profile...
    const uid = localStorage.getItem("uad-cache");
    // debugger;
    if (uid.length == 28) {
      const url = process.env.NEXT_PUBLIC_HOST_URL + "/users/ic";
      axios.post(url, { uid }).then((res) => {
        if (res.data.status == "error") {
          setCheckAccMsg("Coin not collected. Try Again");
        }
      });
    }
  }
  const Completionist = () => (
    <div className="flex-col flex">
      {/* <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                document.write(
                  '<script src="//banner.incrementxserv.com/scripts/pageads.js?vzId=IXV694356VB6E22E&vzR=' +
                    Math.floor(Math.random() * 100(new Date().getTime() / 1000)) +
                    '"></script>'
                );
              `,
        }}
      /> */}
      <div
        className="flex justify-center"
        onClick={() => {
          document.querySelector(".footer").scrollIntoView();
        }}
      >
        <button
          className={styles.btn}
          onClick={() => {
            document.querySelector(".footer").scrollIntoView();
          }}
        >
          Collect Coin
        </button>
        {/* <a
          onClick={() => {
            document.querySelector(".footer").scrollIntoView();
          }}
          className={`${styles.collectCoinBtn} text-center`}
        >
          Collect Coin
        </a> */}
      </div>
      <Ad currentPath="below collect coin" dataAdSlot="1790551941" />
    </div>
  );
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <h2
          style={{ color: "black" }}
          className="mx-auto text-center text-2xl mt-3"
        >
          Generating Coin in {seconds} Seconds..
        </h2>
      );
    }
  };

  function transferFunds() {
    setCookie("token", "0x0000000000000000000000000000000000000000", {
      maxAge: 60 * 60 * 24 * 30,
    });
    // handleClickCollectCoin();
  }
  const Completionist2 = () => {
    localStorage.removeItem("mozilla-support-status");
    return (
      <div className="flex justify-center flex-col items-center">
        {/* <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                document.write(
                  '<script src="//banner.incrementxserv.com/scripts/pageads.js?vzId=IXP275725VEG2137&vzR=' +
                    Math.floor(Math.random() * 100(new Date().getTime() / 1000)) +
                    '"></script>'
                );
              `,
          }}
        /> */}
        <a
          href={`${process.env.NEXT_PUBLIC_APP_URL}/user`}
          onClick={transferFunds}
          className={`${styles.collectCoinBtn} text-center w-60`}
        >
          {checkAccMsg}
        </a>
        <Ad currentPath="below check msg" dataAdSlot="5932158699" />
      </div>
    );
  };
  const renderer2 = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist2 />;
    } else {
      // Render a countdown
      return (
        <>
          {/* <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                document.write(
                  '<script src="//banner.incrementxserv.com/scripts/pageads.js?vzId=IXQ933127VED84F6&vzR=' +
                    Math.floor(Math.random() * 100(new Date().getTime() / 1000)) +
                    '"></script>'
                );
              `,
            }}
          /> */}
          <h2
            style={{ color: "black" }}
            className="mx-auto text-center text-2xl mt-3"
          >
            Transferring to Your Account in {seconds} Seconds..
          </h2>
          <Ad
            currentPath="transfering in your account"
            dataAdSlot="2371600903"
          />
        </>
      );
    }
  };
  function createMarkup() {
    // console.log("data.details", data.details);
    // const p = document.createElement("p");
    // p.innerHTML = data?.details || "";

    // return p.innerText;
    return {
      __html: targetPost.data.details,
    };
  }
  if (targetPost) {
    return (
      <>
        <Head>
          <title>{targetPost.data.title}</title>
        </Head>
        <div className="flex px-3 md:px-0 md:flex-row flex-col gap-3  bg-[#F2F2F0]">
          {/* <Ad /> */}
          <div className="order-2 md:order-1 w-full md:w-1/5 pt-3  bg-[#F2F2F0]">
            {!slugChanged && <LeftAdvertisement />}
          </div>
          <div className="order-1 md:order-2  sm:w-full md:flex-1 md:min-h-[80vh]  bg-white px-2">
            <Ad currentPath="top news ad" dataAdSlot="5712118102" />
            <div className="mx-auto block">
              {status == "4" && !collectingCoin ? (
                <>
                  {/* <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `
                            document.write(
                              '<script src="//banner.incrementxserv.com/scripts/pageads.js?vzId=IXQ202375V7392DB&vzR=' +
                                Math.floor(Math.random() * 100(new Date().getTime() / 1000)) +
                                '"></script>'
                            );
                          `,
                    }}
                  /> */}
                  <Countdown date={Date.now() + 20000} renderer={renderer} />
                  <Ad currentPath="countdown ad" dataAdSlot="2291709858" />
                </>
              ) : (
                ""
              )}
            </div>
            <h3 className="text-4xl py-3 capitalize">
              {targetPost.data.title}
            </h3>
            <img
              src={targetPost.data.imgUrl}
              className="w-full object-cover md:max-h-[25rem]"
            />
            <p
              style={{ textAlign: "justify" }}
              dangerouslySetInnerHTML={createMarkup()}
            />
            <RelatedNPosts orientation="horizontal" N={3} />
            <Ad
              currentPath="below latest"
              dataAdSlot="2563521642"
              // className="hidden md:hidden"
            />
            <Comments />
            <footer className="footer hidden md:block order-4 md:order-4 ">
              {collectingCoin ? (
                <>
                  {/* <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `
                            document.write(
                              '<script src="//banner.incrementxserv.com/scripts/pageads.js?vzId=IXV694356VB6E22E&vzR=' +
                                Math.floor(Math.random() * 100(new Date().getTime() / 1000)) +
                                '"></script>'
                            );
                          `,
                    }}
                  /> */}
                  <Countdown date={Date.now() + 5000} renderer={renderer2} />
                  <Ad
                    currentPath="countdown footer ad"
                    dataAdSlot="1790551941"
                  />
                </>
              ) : (
                ""
              )}
              {/* <Ad2 /> */}
            </footer>
          </div>
          <div className="order-3 md:order-3  md:w-1/5 bg-[#F2F2F0]">
            {!slugChanged && <RightAdvertisement />}
            <footer className="footer md:hidden order-4 md:order-4 ">
              {collectingCoin ? (
                <>
                  {/* <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `
                            document.write(
                              '<script src="//banner.incrementxserv.com/scripts/pageads.js?vzId=IXV694356VB6E22E&vzR=' +
                                Math.floor(Math.random() * 100(new Date().getTime() / 1000)) +
                                '"></script>'
                            );
                          `,
                    }}
                  /> */}
                  <Countdown date={Date.now() + 5000} renderer={renderer2} />
                  <Ad
                    currentPath="countdown footer ad"
                    dataAdSlot="1790551941"
                  />
                </>
              ) : (
                ""
              )}
              {/* <Ad2 /> */}
            </footer>
          </div>

          {/* <p style={{ textAlign: "center" }}>{targetPost.data.details}</p> */}
          {/* <Ad /> */}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default News;
