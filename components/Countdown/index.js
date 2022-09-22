import React, { useEffect, useState } from "react";

const Countdown = ({ timeInSeconds = 5, appendText = "", renderer }) => {
  const [timeout, setTimout] = useState();
  const [finished, setFinished] = useState(false);
  const [counter, setCounter] = useState(timeInSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimout(interval);
      if (counter === 0) {
        setFinished(true);
        clearInterval(timeout);
      } else if (!finished) {
        setCounter(counter--);
      }
    }, 1000);
    return () => {
      if (timeout) {
        clearInterval(timeout);
      }
    };
  }, [timeInSeconds]);
  if (finished) return renderer;
  else
    return (
      <div className="flex justify-center items-center">
        {appendText + " " + counter + " seconds"}
      </div>
    );
};

export default Countdown;
