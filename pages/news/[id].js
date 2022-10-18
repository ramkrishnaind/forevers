import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import GenerateCoinBtn from "../../components/GenerateCoinBtn/GenerateCoinBtn";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from "next/script";
import { AppContext } from "./../../app/state/contexts/AppContext";
import { getCookie, setCookie } from "cookies-next";
import Countdown from "react-countdown";
import Ad from "../../components/Ad/Ad";
import CountdownTimer from "../../components/Countdown";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import LeftAdvertisement from "../../components/News/LeftAdvertisement";
import RightAdvertisement from "../../components/News/RIghtAdvertisement";
import RelatedNPosts from "../../components/News/RIghtAdvertisement/RelatedNPosts";
import Comments from "../../components/News/Comments";
import getWindowDimensions from "../../hooks/useWindowDimensions";
// import { lazy } from 'react';
// const { addData, deleteData, updateData, isData } =lazy(() => import("../../components/utilities/indexDB"))
// // const { addData, deleteData, updateData, isData } = dynamic(
// //   () => import("../../components/utilities/indexDB"),
// //   {
// //     ssr: false,
// //   }
// // );
import {
  addData,
  deleteData,
  updateData,
  isData,
  readData,
} from "../../components/utilities/indexDB";
function News() {
  const { height, width: widthScreen } = getWindowDimensions();
  const [targetPost, setTargetPost] = React.useState();
  const [coinCollected, setCoinCollected] = React.useState(false);
  const [slugChanged, setSlugChanged] = React.useState(false);
  const [state, dispatch] = useContext(AppContext);
  const [checkAccMsg, setCheckAccMsg] = useState("Check My Account");
  const [status, setStatus] = React.useState("");
  const [collectingCoin, setCollectingCoin] = React.useState(false);
  const [isFetching, setFetching] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;
  const isCollectCoin = () => {
    return localStorage.getItem("collectCoin") === "1";
  };
  useEffect(() => {
    // debugger;
    const { googletag } = window;
    if (googletag) {
      googletag.cmd.push(function () {
        googletag.pubads()?.refresh();
      });
    }
    localStorage.setItem("collectCoin", "0");
  }, [id]);
  React.useEffect(() => {
    // debugger;
    !window.adsbygoogle
      ? (window.adsbygoogle = window.adsbygoogle || []).push({})
      : console.log("Adsbygoogle already exists");
    setSlugChanged(true);
    setTimeout(() => {
      setSlugChanged(false);
    }, 10);
  }, [id]);
  React.useEffect(() => {
    const setAdvertisement = async () => {
      const dbName = "advertisementDB";
      var db;
      // async function addData(top, bottom) {
      //   const prom = new Promise((resolve, reject) => {
      //     if (!window?.indexedDB) reject(null);
      //     //Retrieve the transaction for specific object, specify the mode - readonly, readwrite and versionchange
      //     var transaction = db.transaction(["advertisement"], "readwrite");

      //     // Handler Invoked when all the data is added to the database.
      //     transaction.oncomplete = function (event) {
      //       console.log("Add Completed!");
      //     };

      //     //Error Handler
      //     transaction.onerror = function (event) {
      //       reject(event);
      //     };

      //     const customerDataNew = { id: "id1", top, bottom };

      //     //Add new customer data to the store
      //     var objectStore = transaction.objectStore("advertisement");

      //     var request = objectStore.add(customerDataNew);
      //     request.onsuccess = function (event) {
      //       console.log("Data Added..." + event.target.result);
      //       resolve(event.target.result);
      //     };
      //   });
      //   return prom;
      // }
      // async function isData() {
      //   const prom = new Promise((resolve, reject) => {
      //     if (!window?.indexedDB) reject(null);
      //     var transaction = db.transaction(["advertisement"]);
      //     var objectStore = transaction.objectStore("advertisement");
      //     var request = objectStore.get("id");
      //     request.onerror = function (event) {
      //       // Handle errors!
      //       resolve(false);
      //     };
      //     request.onsuccess = function (event) {
      //       console.log("request.result", request.result);
      //       resolve(request.result);
      //       // document.getElementById("data").innerHTML = "Name for SSN 444-44-4444 is " + request.result.name;
      //     };
      //   });
      //   return prom;
      // }
      //Update existing data through primary key and put method
      // async function updateData(top, bottom) {
      //   var objectStore = db
      //     .transaction(["advertisement"], "readwrite")
      //     .objectStore("advertisement");
      //   var request = objectStore.get("id");
      //   request.onerror = function (event) {};
      //   request.onsuccess = function (event) {
      //     //Get the current data
      //     var data = event.target.result;

      //     // update the value
      //     data.top = top;
      //     data.bottom = bottom;

      //     // Put the updated object to store.
      //     var requestUpdate = objectStore.put(data);
      //     requestUpdate.onerror = function (event) {
      //       // error
      //     };
      //     requestUpdate.onsuccess = function (event) {
      //       console.log("Success - the data is updated!");
      //     };
      //   };
      // }
      setTimeout(() => {
        if (window?.indexedDB) {
          var request = indexedDB.open(dbName, 2);

          //Error Handler
          request.onerror = function (event) {
            console.log("error: ");
          };

          //Success Handler
          request.onsuccess = function (event) {
            db = request.result;
            debugger;
            console.log("success: " + db);
            const fn = async () => {
              debugger;
              let va = document.querySelector("[data-google-av-adk='758328918'] a");

              // if (!va) return;
              const top = va?.href?.split("adurl=")[1];
              va = document.querySelector("[data-google-av-adk='2548305653'] a");
              if (!va) return;
              const bottom = va.href.split("adurl=")[1];
              if (!(await isData(db))) {
                await addData(db, top, bottom);
              } else {
                await updateData(db, top, bottom);
              }
              console.log("data1", await readData(db));
            };
            fn();
          };
          //Handler invoked on successful opening of database
          //Upgrade the existing DB object if the version is different or create the objects
          request.onupgradeneeded = function (event) {
            var db = event.target.result;

            // autoIncrement: true
            //Create Object store with primary key
            var objectStore = db.createObjectStore("advertisement", {
              keyPath: "id",
            });

            //Define the required Indexes
            objectStore.createIndex("top", "top", { unique: false });
            objectStore.createIndex("bottom", "bottom", { unique: true });

            //Add data to the object
            // customerData.forEach(function (advertisement) {
            //   objectStore.add(advertisement);
            // });
          };
        }
      }, 20000);

      debugger;
      // let va = document.querySelector(".ns-xmgap-e-2.svg-anchor");
      // if (!va) return;
      // const top = va.href.split("adurl=")[1];
      // va = document.querySelector(".long-title");
      // if (!va) return;
      // const bottom = va.href.split("adurl=")[1];
      // const { addData, deleteData, updateData, isData } = indexedDB();
    };
    setTimeout(() => {
      setAdvertisement();
    }, 500);
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
    // debugger;
    setTimeout(() => {
      // debugger;
      if (window.location.hash) {
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        if (hash === "footer") {
          widthScreen < 768
            ? document.querySelector(".footer-mob").scrollIntoView()
            : document.querySelector(".footer.hidden").scrollIntoView();
        } else if (hash === "top") {
          document.querySelector("#top").scrollIntoView();
        }
        // hash found
      } else {
        // No hash found
      }
    }, 3000);
  }, [id]);
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
    // debugger;
    if (post) dispatch({ type: "set-current-post", payload: post?.data });
    return post;
  }
  if (isFetching) {
    return <p>Loading...</p>;
  }
  // const targetPost = getPost(id);
  function handleClickCollectCoin() {
    // setCollectingCoin(true);
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
        id="collectCoin"
        // onClick={() => {
        //   document.querySelector(".footer").scrollIntoView();
        // }}
      >
        <button
          className={styles.btn}
          onClick={() => {
            // localStorage.setItem("collectCoin", "1");
            setCollectingCoin(true);
            widthScreen < 768
              ? document.querySelector(".footer-mob").scrollIntoView()
              : document.querySelector(".footer.hidden").scrollIntoView();
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
      <Ad currentPath="below collect coin" dataAdSlot="1707448970" />
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

  function transferFunds(e) {
    setCoinCollected(true);
    setCookie("token", "0x0000000000000000000000000000000000000000", {
      maxAge: 60 * 60 * 24 * 30,
    });
    if (!coinCollected) handleClickCollectCoin();
    setTimeout(() => {
      window.location.replace(`${process.env.NEXT_PUBLIC_APP_URL}/user`);
    }, 1000);
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
          // href={`${process.env.NEXT_PUBLIC_APP_URL}/user`}
          disabled={coinCollected}
          onClick={transferFunds}
          className={`${styles.collectCoinBtn} cursor-pointer text-center w-60`}
        >
          {checkAccMsg}
        </a>
        {/* <Ad currentPath="below check msg" dataAdSlot="6352398854" /> */}
      </div>
    );
  };
  const renderer2 = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return state.postsHash ? <Completionist2 /> : null;
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
            dataAdSlot="8046175358"
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
            {/* <Ad currentPath="top news ad" dataAdSlot="7088316902" /> */}
            <div className="mx-auto block">
              <div id="top"></div>
              <Ad currentPath="countdown ad" dataAdSlot="6233506017" />
              {status == "4" && !collectingCoin && state?.postsHash ? (
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

                  <CountdownTimer
                    appendText="Generating Coin in..."
                    timeInSeconds={20}
                    renderer={<Completionist />}
                  />
                  <Ad currentPath="countdown ad" dataAdSlot="4079010180" />
                </>
              ) : null}
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

            <RelatedNPosts orientation="horizontal" N={3} W={1} />
            {/* comment by anas comment above<Ad
              currentPath="below latest"
              dataAdSlot="2563521642"
              // className="hidden md:hidden"
            /> */}
            <Comments />
            <footer
              id="footer"
              className="footer hidden md:block order-4 md:order-4 "
            >
              {collectingCoin && state?.postsHash ? (
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
                  <CountdownTimer
                    appendText="Transferring to Your Account..."
                    timeInSeconds={5}
                    renderer={<Completionist2 />}
                  />

                  {/* <Ad
                    currentPath="contdown footer ad"
                    dataAdSlot="3504295119"
                  /> */}
                </>
              ) : (
                ""
              )}
              {/* <Ad2 /> */}
            </footer>
          </div>
          <div className="order-3 md:order-3  md:w-1/5 bg-[#F2F2F0]">
            {!slugChanged && <RightAdvertisement />}
            <footer
              id="footer"
              className="footer-mob md:hidden order-4 md:order-4 "
            >
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
                  <CountdownTimer
                    appendText="Transferring to Your Account in ..."
                    timeInSeconds={5}
                    renderer={<Completionist2 />}
                  />
                  {/* <Countdown
                    autoStart={collectingCoin}
                    date={Date.now() + 5000}
                    renderer={renderer2}
                  /> */}
                  {/* <Ad
                    currentPath="contdown footer ad"
                    dataAdSlot="3504295119"
                  /> */}
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
