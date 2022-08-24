import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
function NewsHighlight({ data, id }) {
  let slug = "";
  let oldTitle = data.title;
  for (let i = 0; i < oldTitle.length; i++) {
    if (oldTitle[i] == " ") {
      slug += "-";
    } else {
      slug += oldTitle[i].toLowerCase();
    }
  }
  function createMarkup(length = 30) {
    console.log("data.details", data.details);
    const p = document.createElement("p");
    p.innerHTML = data?.details || "";
    const arr = p.innerText.split(" ");
    const count = Math.floor(arr.length < length ? arr.length : length);
    const arrToTake = arr.map((item, index) => {
      if (index <= count) return item;
    });
    return arrToTake.join(" ") + (arr.length > length ? "..." : "");
    // return {
    //   __html: data.details,
    // };
  }
  return (
    <div className="py-3" style={{ cursor: "pointer" }}>
      <Link href={`/news/${slug}`}>
        <div className="md:flex gap-3">
          <div className="w-full md:w-1/4 px-3 md:px-0 md:pr-3 pt-1">
            <img
              src={data.imgUrl}
              alt="post-img"
              className="w-full rounded-md"
            />
          </div>

          {/* <p dangerouslySetInnerHTML={createMarkup()} />; */}
          <p
            className="w-full md:w-3/4 px-3 md:px-0 md:pr-3  hover:underline"
            style={{ wordBreak: "break-all" }}
          >
            {createMarkup(40)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default NewsHighlight;
