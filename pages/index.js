import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import Script from "next/script";
import Header from "./../components/Header/Header";
import Ad from "./../components/Ad/Ad";
import News from "../components/News/News";
import PaginatedItems from "../components/Paginate";
import dynamic from "next/dynamic";

import axios from "axios";
import { AppContext } from "./../app/state/contexts/AppContext";

const DynamicTimer = dynamic(() => import("../components/Timer/Timer"), {
  ssr: false,
});

function Home() {
  const [state, dispatch] = useContext(AppContext);
  const [isFetching, setFetching] = React.useState(false);
  const [currCate, setCurrCat] = React.useState(false);
  const categories = state?.categories || [];
  React.useEffect(() => {
    setCurrCat(null);
    setTimeout(() => {
      setCurrCat(state.currentCategory);
    }, 10);
  }, [state.currentCategory]);
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
  }, []);
  console.log("state", state);
  return (
    <div style={{ flex: 1, display: "flex" }}>
      <Head>
        <title>Forevers.in</title>
      </Head>
      <main className="container-sm flex relative flex-col flex-1">
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
        {/* <div> */}
        <div>
          <img
            src="/assets/modi.jpg"
            alt="pm-image"
            style={{ width: "100%" }}
            className="object-cover w-100"
          />
        </div>

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
              more={state?.posts.length > 6}
            />
            {categories.map((categoryItem, index) => (
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
            ))}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
