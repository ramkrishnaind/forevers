import React, { useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import Link from "next/link";
const initialData = {
  username: "",
  password: "",
};
function Login({ setLoggedIn }) {
  const [data, setData] = useState(initialData);
  const [errMsg, setErrMsg] = useState(false);
  function handleSignIn() {
    setErrMsg(false);
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/xadmin";
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.status == "success") {
          setLoggedIn(true);
        } else {
          setErrMsg(true);
        }
      })
      .catch((err) => {
        setErrMsg(true);
        return;
      });
  }
  return (
    <div className={styles.app}>
      <div
        className={styles.container}
        onKeyDown={(e) => (e.key == "Enter" ? handleSignIn() : "")}
      >
        <h2>Welcome to Forevers Admin Console</h2>
        <div className={styles.input}>
          <label>Username</label>
          <input
            type="text"
            value={data["username"]}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input
            type="password"
            value={data["password"]}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        {errMsg ? (
          <p
            className={styles.error}
            style={{ color: "red", margin: 5, fontSize: "12px" }}
          >
            Sorry! You can not login yet.
          </p>
        ) : (
          ""
        )}
        <button className={styles.loginBtn} onClick={handleSignIn}>
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
