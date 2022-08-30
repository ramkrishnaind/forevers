import React, { useContext, useState, useEffect } from "react";
import Router from "next/router";
import styles from "./style.module.scss";
import Countdown from "react-countdown";
import { AppContext } from "./../../app/state/contexts/AppContext";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import MathematicalRecaptcha from "../reCaptcha/MathematicalRecaptcha";
import { getCookie, setCookie } from "cookies-next";
function GenerateCoinBtn() {
  const [state, dispatch] = useContext(AppContext);
  const [mining, setMining] = useState(false);
  const [notARobot, setNotARobot] = useState(false);
  useEffect(() => {
    debugger;
    if (state?.posts?.length === 0) {
      if (state?.posts?.lenght === 0) {
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
      }
    }
  }, []);
  function getEquivalentSlug(title) {
    let slug = "";
    let oldTitle = title;

    for (let i = 0; i < oldTitle.length; i++) {
      if (oldTitle[i] == " ") {
        slug += "-";
      } else {
        slug += oldTitle[i].toLowerCase();
      }
    }
    return slug;
  }
  function handleClick(e) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts";
    (async () => {
      axios.get(url).then((res) => {
        const allPosts = res.data.data;
        const slugs = allPosts.map((obj) => getEquivalentSlug(obj.data.title));
        const randomId = slugs[Math.floor(Math.random() * slugs.length)];
        const status = localStorage.getItem("mozilla-support-status");
        console.log(status);
        if (status == "3") {
          localStorage.setItem("mozilla-support-status", "4");
          Router.push("/news/" + randomId);
        }
      });
    })();
  }

  return notARobot ? (
    <button className={styles.btn} onClick={handleClick}>
      💲 Generate Coin 💲
    </button>
  ) : (
    <MathematicalRecaptcha passCaptcha={setNotARobot} />
  );
}

export default GenerateCoinBtn;
