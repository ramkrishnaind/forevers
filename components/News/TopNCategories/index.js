import App from "next/app";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { AppContext } from "../../../app/state/contexts/AppContext";
const TopNCategories = () => {
  const [state, dispatch] = useContext(AppContext);
  const [relatedCategroies, setRelatedCategories] = useState([]);
  useEffect(() => {
    const arr = [];
    state?.categories.forEach((item) => {
      if (!arr.includes(item.trim()) && !item.includes("\\")) {
        arr.push(item.trim());
      }
    });
    setRelatedCategories(arr);
  }, [state?.categories]);
  return (
    <div className="bg-white px-2">
      <h2 className="text-center bg-gray-500 py-2 px-2 text-lg text-white ">
        Post categories
      </h2>
      <ul className="items-center justify-center">
        {relatedCategroies.length > 0 &&
          relatedCategroies.map((item, index) => (
            <li
              className="text-black py-1 my-3 hover:text-white hover:bg-black ease-in-out duration-300 hover:p-2 hover:mx-auto hover:cursor-pointer"
              key={index}
            >
              <Link
                href="/"
                onClick={() => dispatch({ type: "clear-currentCategory" })}
              >
                <a
                  onClick={() => {
                    dispatch({
                      type: "set-currentCategory",
                      payload: item,
                    });
                    // menuClickHandler();
                  }}
                  className="capitalize"
                >
                  {item?.toLowerCase()}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopNCategories;
