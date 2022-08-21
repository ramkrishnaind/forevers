import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import classes from "./addPost.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import TextEditor from "../../../components/utilities/TextEditor";
import ReactTags from "react-tag-autocomplete";
import AutoComplete from "../../../components/utilities/Autocomplete";
const initialState = {
  title: "",
  details: "",
  author: "",
  imgUrl: "",
};
function AddPost() {
  const [successMsg, setSuccessMsg] = useState(false);
  const reactTags = React.createRef();
  const [tags, setTags] = useState();
  const router = useRouter();
  const categories = [
    // { id: 3, name: "Bananas" },
    // { id: 4, name: "Mangos" },
    // { id: 5, name: "Lemons" },
    // { id: 6, name: "Apricots" },
    // { id: 1, name: "Apples" },
    // { id: 2, name: "Pears" },
  ];
  const [categoriesFetched, setCategoriesFetched] = useState([]);
  const [categoriesToAdd, setCategoriesToAdd] = useState(
    categories.map((i) => i.name)
  );
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/postCategories";
    (async () => {
      axios.get(url).then((res) => {
        console.log("res.data", res.data);
        setCategoriesFetched(
          res.data.data.map((item, index) => ({
            id: index + 1,
            name: item.data.name,
          }))
        );
      });
    })();
  }, []);
  const initialTags = [
    // { id: 1, name: "Apples" },
    // { id: 2, name: "Pears" },
  ];

  // const [tagsState, setTagsState] = useState({
  //   tags: [
  //     { id: 1, name: "Apples" },
  //     { id: 2, name: "Pears" },
  //   ],
  //   suggestions: [
  //     { id: 3, name: "Bananas" },
  //     { id: 4, name: "Mangos" },
  //     { id: 5, name: "Lemons" },
  //     { id: 6, name: "Apricots" },
  //     { id: 1, name: "Apples" },
  //     { id: 2, name: "Pears" },
  //   ],
  // });
  // const onDelete = (i) => {
  //   const tags = tagsState.tags.slice(0);
  //   tags.splice(i, 1);
  //   setTagsState((prevState) => {
  //     return {
  //       ...prevState,
  //       tags: [...tags],
  //     };
  //   });
  //   // props.onTagsChanged(tags);
  // };
  const tagsChangeHandler = (tags) => {
    setTags(tags);
    const tagNames = tags.map((i) => i.name);
    const prevCategories = categoriesFetched.map((i) => i.name);
    const categoriesNew = tagNames.filter((i) => !prevCategories.includes(i));

    setData({ ...data, categories: tagNames });
    setCategoriesToAdd((prev) => [...prev, ...categoriesNew]);
  };

  const onAddition = (tag) => {
    const tags = [].concat(tagsState.tags, tag);
    setTagsState((prevState) => {
      return {
        ...prevState,
        tags: [...tags],
      };
    });
    // props.onTagsChanged(tags);
  };
  console.log("tags", tags);
  console.log("categoriesFetched", categoriesFetched);
  console.log("setCategoriesToAdd", categoriesToAdd);

  const [data, setData] = React.useState(initialState);
  async function handleAddPost() {
    if (data.title.length > 0 && data.details.length > 0 && tags.length > 0) {
      const url = process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts";
      const urlCategories =
        process.env.NEXT_PUBLIC_HOST_URL + "/postCategories";
      categoriesToAdd.forEach(async (category, index) => {
        try {
          await axios.post(urlCategories, { name: category });
        } catch {}
      });
      axios.post(url, data).then((res) => {
        if (res.data.status == "success") {
          setSuccessMsg(true);
          setData(initialState);
          setTimeout(() => {
            setCategoriesFetched(null);
          }, 4000);
          router.push("/");
        }
      });
    }
  }
  console.log("data", data);
  return (
    <div className={styles.container}>
      <form>
        <h3>Add Post</h3>
        <div className={styles.input}>
          <label>Title</label>
          <input
            type="text"
            required
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div className={styles.input}>
          <label>Details</label>
          <TextEditor
            content={data.details}
            setContent={(content) => setData({ ...data, details: content })}
          />
          {/* <textarea
            type="text"
            required
            value={data.details}
            onChange={(e) => setData({ ...data, details: e.target.value })}
          /> */}
        </div>
        <div className={styles.input}>
          <label>Author</label>
          <input
            type="text"
            placeholder="(Optional)"
            value={data.author}
            onChange={(e) => setData({ ...data, author: e.target.value })}
          />
        </div>
        <div className={styles.input}>
          <label>Category</label>
          {categoriesFetched && categoriesFetched.length > 0 && (
            <AutoComplete
              title="Select Categories"
              tags={initialTags}
              suggestions={categoriesFetched}
              onTagsChanged={tagsChangeHandler}
              className={classes.reactTags}
            />
          )}

          {/* <ReactTags
            placeholderText={"Enter a value"}
            ref={reactTags}
            minQueryLength={1}
            tags={tagsState.tags}
            suggestions={tagsState.suggestions}
            onDelete={onDelete}
            allowNew
            onAddition={onAddition}
            className={classes.reactTags}
          /> */}
        </div>

        <div className={styles.input}>
          <label>ImageURL</label>
          <input
            type="text"
            value={data.imgUrl}
            onChange={(e) => setData({ ...data, imgUrl: e.target.value })}
          />
        </div>
      </form>
      <p
        className={styles.successMsg}
        style={{ display: successMsg ? "block" : "none" }}
      >
        <span> Post Added Successfully ✔️</span>
        <br />
        Click{" "}
        <Link href="/admin">
          <u style={{ cursor: "pointer" }}>here</u>
        </Link>{" "}
        to go back to admin console.
      </p>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "40%" }}
      >
        <button onClick={handleAddPost} className={styles.addPostBtn}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddPost;
