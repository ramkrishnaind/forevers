import React, { useState, useRef, useEffect, useContext } from "react";
import GenerateCoinBtn from "../GenerateCoinBtn/GenerateCoinBtn";
import styles from "./style.module.scss";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { AppContext } from "../../app/state/contexts/AppContext";
import axios from "axios";
import Ad from "../Ad/Ad";
import Script from "next/script";
const Timer = ({ query }) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("0:0:0");
  const [status, setStatus] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [hash, setHash] = useState(query);
  const [state, dispatch] = useContext(AppContext);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds);
    }
  };

  const clearTimer = (e) => {
    setTimer("5");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    // Todo: Update seconds by adding 10 instead of 1 second
    deadline.setSeconds(deadline.getSeconds() + 5);
    return deadline;
  };
  useEffect(() => {
    (async function () {
      const localstatus = localStorage.getItem("mozilla-support-status");
      const date = new Date();
      const after = date.getMinutes();
      let uid = "";
      if (hash) {
        for (let i = 0; i < 28; i++) {
          uid += hash[i];
        }
      }
      const url = process.env.NEXT_PUBLIC_HOST_URL + "/users/get-user";
      console.log(uid, " inside timer component");
      axios
        .post(url, { uid })
        .then((res) => {
          const result = res.data.status == "success";
          if (uid + after == hash && result) {
            setUserExists(result);
            localStorage.setItem("mozilla-support-status", "3");
            localStorage.setItem("uad-cache", uid);
            clearTimer(getDeadTime());
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // Todo: check that if uid exists and minutes are same..
      // Todo: then show acc verification process..
    })();
  }, [hash]);
  if (!userExists) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      {timer == "0" ? (
        <div style={{ marginTop: "20px" }}>
          <GenerateCoinBtn />
        </div>
      ) : (
        <>
          {/* <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                document.write(
                  '<script src="//banner.incrementxserv.com/scripts/pageads.js?vzId=PNXM746966V21D4DF&vzR=' +
                    Math.floor(Math.random() * 100(new Date().getTime() / 1000)) +
                    '"></script>'
                );
              `,
            }}
          /> */}
            <Ad currentPath="Above timer above" dataAdSlot="2792852820" />
             <h2> Verifying your account...{timer} Seconds</h2>
           <Ad currentPath="Verifying your account" dataAdSlot="3248148395" />
        </>
      )}
    </div>
  );
};

export default Timer;
