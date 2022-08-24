import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import TopNewsHightlight from "./TopNewsHighlight/TopNewsHightlight";
import NewsHighlight from "./NewsHighlight/NewsHighlight";
import axios from "axios";
import { AppContext } from "./../../app/state/contexts/AppContext";

function News() {
  const [state, dispatch] = useContext(AppContext);
  console.log(state);
  // useEffect(() => {
  //   const url = process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts";
  //   (async () => {
  //     axios.get(url).then((res) => {
  //       console.log("res.data.data", res.data.data);
  //       dispatch({ type: "setposts", payload: res.data.data });
  //     });
  //   })();
  // }, []);

  return (
    <div className="container-sm md:flex w-100 col-1 flex-1">
      <div className="w-100 md:flex-1">
        <h3 className="bg-gray-500 py-2 px-2 text-lg text-white">
          Latest News
        </h3>
        <div>
          {state.posts.length == 0 ? (
            <h1>Fetcing Posts</h1>
          ) : (
            state.posts.map((obj) => {
              return (
                // <div>This is some text</div>
                <NewsHighlight key={obj.id} data={obj.data} id={obj.id} />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default News;
