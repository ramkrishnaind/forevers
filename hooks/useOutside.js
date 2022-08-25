import React, { useRef, useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, dotsRef, searchRef, show, dotClicked) {
  const [clickedOutside, setClickedOutside] = useState(!show);
  debugger;
  useEffect(() => {
    setClickedOutside(!show);
  }, show);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !(dotsRef.current && dotsRef.current.contains(event.target)) &&
        !(searchRef.current && searchRef.current.contains(event.target))
      ) {
        // alert("You clicked outside of me!");
        debugger;
        setClickedOutside(true);
      } else if (dotsRef.current && dotsRef.current.contains(event.target)) {
        setClickedOutside(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return clickedOutside;
}
export default useOutsideAlerter;
