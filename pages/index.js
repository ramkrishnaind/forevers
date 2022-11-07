import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import Script from "next/script";
import Header from "./../components/Header/Header";
import Ad from "./../components/Ad/Ad";
//import ExternalAd from "../components/ExternalAd";
import News from "../components/News/News";
import PaginatedItems from "../components/Paginate";
import dynamic from "next/dynamic";
// import Ad from "./../components/Ad/Ad";
import axios from "axios";
import { AppContext } from "./../app/state/contexts/AppContext";
import TopNCategories from "../components/News/TopNCategories";
const DynamicTimer = dynamic(() => import("../components/Timer/Timer"), {
  ssr: false,
});

const DynamicAd = dynamic(() => import("../components/Ad/Ad"), {
  ssr: false,
});

// import Ad from "../components/FooterAd1/Ad";
function Home() {
  const [state, dispatch] = useContext(AppContext);
  const [isFetching, setFetching] = React.useState(false);
  const [currCate, setCurrCat] = React.useState(false);
  const categories = state?.categories || [];
  // debugger;
  const modifiedCategories = state?.categories.filter((value, index, self) => {
    return self.findIndex((v) => v === value) === index;
  });

  //  const adCodes = ["7322737737", "9685177197", "3435463614", "3243891929"];
  React.useEffect(() => {
    setCurrCat(null);
    setTimeout(() => {
      setCurrCat(state.currentCategory);
    }, 10);
  }, [state.currentCategory]);
  React.useEffect(() => {
    // debugger;
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
  }, []);
  console.log("state", state);
  return (
    <div
      style={{ flex: 1, display: "flex" }}
      onClick={() => dispatch({ type: "outside-search", payload: true })}
    >
      <Head>
        <title>Findnorton.com</title>
      </Head>
      <main className="container-sm flex relative flex-col flex-1">
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
        {/* <div> */}
        <div>
          <img
            src="/assets/modi.jpg"
            alt="pm-image"
            style={{ width: "100%" }}
            className="md:object-cover md:w-100 md:inline hidden"
          />
              {/*<!-- Ezoic - top_of_page - top_of_page -->*/}
          <div id="ezoic-pub-ad-placeholder-101"> </div>
            {/*<!-- End Ezoic - top_of_page - top_of_page -->*/}
          {/*<ExternalAd vzId="IXP275725VEG2137" />*/}
          {/* <Ad currentPath="Generate Coin" dataAdSlot="2563521642" /> */}
        </div>
        {state.postsHash ? <DynamicTimer query={state.postsHash} /> : null}
        {/* <DynamicAd /> */}
        {/* <Ad /> */}

        {/* <DynamicTimer /> */}
        {/* <div style={{ flex: 1 }}>afjafjl</div> */}
        {/* <PaginatedItems itemsPerPage={4} /> */}
        {currCate && (
          <PaginatedItems
            itemsPerPage={6}
            category={state?.currentCategory}
            categoryPosts={state.currentPosts}
            initialPage={state.more ? 2 : 1}
            className="pagination"
          >
            <News />
          </PaginatedItems>
        )}
        {/* {state.posts.length > 0 && (
          <PaginatedItems
            itemsPerPage={6}
            category="Latest News"
            categoryPosts={state.posts}
            items={categories}
            initialPage={2}
            className="pagination"
          >
            <News />
          </PaginatedItems>
        )} */}
        {!state?.currentCategory && (
          <>
            <News
              category={"Latest News"}
              categoryPosts={
                state?.posts?.length > 6
                  ? state?.posts?.slice(0, 6)
                  : state?.posts
              }
              more={state?.posts?.length > 6}
            />

            {categories.slice(0, 8).map((categoryItem, index) => (
              <>
                <News
                  key={index}
                  category={categoryItem}
                  more={state?.categoryPosts[categoryItem]?.length > 6}
                  categoryPosts={
                    state.categoryPosts[categoryItem] > 6
                      ? state.categoryPosts[categoryItem].slice(0, 6)
                      : state.categoryPosts[categoryItem]
                  }
                />
                {/*  {index !== 0 && index == 2 && (
                  <Ad
                    currentPath={`between sections${0}`}
                    dataAdSlot={adCodes[0]}
                    // className="hidden md:hidden"
                  />
                )}
                {index !== 0 && index == 6 && (
                  <Ad
                    currentPath={`between sections${1}`}
                    dataAdSlot={adCodes[1]}
                    // className="hidden md:hidden"
                  />
                )} */}
              </>
            ))}
            <TopNCategories />
           {/* <!-- Ezoic - bottom_of_page - bottom_of_page -->
<div id="ezoic-pub-ad-placeholder-102"> </div>
<!-- End Ezoic - bottom_of_page - bottom_of_page --> */}
              {/* <Ad
              currentPath={`end of categrories`}
              dataAdSlot={"4816992340"}
              // className="hidden md:hidden"
            /> */}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
