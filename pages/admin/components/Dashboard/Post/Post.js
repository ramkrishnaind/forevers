import React, { useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
function Post({ data, id, updatePosts }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  function deletePost() {
    if (confirmDelete) {
      const url = process.env.NEXT_PUBLIC_HOST_URL + `/foreversPosts`;
      axios.delete(url, { data: { id } }).then((res) => {
        console.log(res);
        setConfirmDelete(false);
        updatePosts(Math.random());
      });
    } else {
      setConfirmDelete(true);
    }
  }
  if (!data) {
    return <></>;
  }
  function createMarkup() {
    console.log("data.details", data.details);
    return {
      __html: data.details,
    };
  }
  return (
    <div className={styles.container}>
      <div className="w-[15rem] pr-5">
        <img
          src={data.imgUrl}
          alt="img"
          className={`${data.left} w-full object-cover rounded-lg`}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.head}>
          <p className={styles.title}>{data.title}</p>
          {data.author && <span className={styles.author}>{data.author}</span>}

          <div className="relative p-3">
            <button
              onClick={deletePost}
              className={`${
                confirmDelete ? styles["button-confirm"] : styles.button
              }`}
            >
              {confirmDelete ? "Confirm" : "X"}
            </button>
            {confirmDelete && (
              <button
                onClick={() => setConfirmDelete(!confirmDelete)}
                className={`absolute right-0 top-0 ${styles["button-cancel"]} bg-pink-200`}
              >
                X
              </button>
            )}
          </div>
        </div>
        <p dangerouslySetInnerHTML={createMarkup()} />
        {/* <p className={styles.body}>{data.details}</p> */}
      </div>
    </div>
  );
}

export default Post;
