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
    <Link href={`/news/${slug}`}>
      <div className={styles.highlightContainer}>
        <img src={data.imgUrl} alt="post-img" />
        {/* <p dangerouslySetInnerHTML={createMarkup()} />; */}
        <p>{createMarkup()}</p>
      </div>
    </Link>
  );
}

export default NewsHighlight;
