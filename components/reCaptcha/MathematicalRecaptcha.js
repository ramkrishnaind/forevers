import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Ad from "../Ad/Ad";
function MathematicalRecaptcha({ passCaptcha }) {
  const canvasRef = useRef(null);
  const [randomNum, setRandomNum] = React.useState("");
  const [text, setText] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);
  function getRandomString() {
    const random = parseInt(Math.random() * 1000);
    return random.toString();
  }
  useEffect(() => {
    const num = getRandomString();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "60px cursive";
    context.letterSpacing = "5px";
    context.textAlign = "center";
    context.fontWeight = "bold";
    context.fillText(num, canvas.width / 2, canvas.height / 2);
    setRandomNum(num);
  }, [isValid]);
  function handleClick() {
    if (text == randomNum) {
      passCaptcha(true);
      setIsValid(true);
    } else {
      setIsValid(false);
      setText("");
    }
  }
  return (
    <div className={styles.container}>
      <canvas ref={canvasRef}></canvas>
      <p style={{ visibility: !isValid ? "visible" : "hidden" }}>
        reCaptcha does not match
      </p>
      <input
        type="text"
        value={text}
        placeholder="Enter captcha code"
        onChange={(e) => setText(e.target.value)}
        className=" border-gray-300 rounded-lg px-3 py-2 my-3 border-2 "
      />
      <button className={styles.btn} onClick={handleClick}>
        Submit
      </button>
      <Ad
        currentPath={`below captcha code`}
        dataAdSlot={"6225480772"}
        // className="hidden md:hidden"
      />
    </div>
  );
}

export default MathematicalRecaptcha;
