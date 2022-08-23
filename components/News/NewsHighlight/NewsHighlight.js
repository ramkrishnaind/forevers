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
  function createMarkup() {
    console.log("data.details", data.details);
    const p = document.createElement("p");
    p.innerHTML = data?.details || "";

    return p.innerText;
    // return {
    //   __html: data.details,
    // };
  }
  return (
    <div className="container-sm md:px-20 flex gap-3">
      <Link href={`/news/${slug}`}>
        <div className="md:flex">
          <img
            src={data.imgUrl}
            alt="post-img"
            className="w-screen max-w-sm shadow-lg h-52"
          />
          {/* <p dangerouslySetInnerHTML={createMarkup()} />; */}
          <p className="w-screen" style={{ wordBreak: "break-all" }}>
            {createMarkup()}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default NewsHighlight;
