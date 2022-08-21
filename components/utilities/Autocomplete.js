import React, { useState } from "react";
import ReactTags from "react-tag-autocomplete";
// import "./AutoComplete.css";
import classes from "./AutoComplete.module.css";

const AutoComplete = (props) => {
  const reactTags = React.createRef();
  const [tagsState, setTagsState] = useState({
    tags: props.tags || [],
    suggestions: props.suggestions || [
      { id: 1, name: "Apples" },
      { id: 2, name: "Pears" },
      { id: 3, name: "Bananas" },
      { id: 4, name: "Mangos" },
      { id: 5, name: "Lemons" },
      { id: 6, name: "Apricots" },
    ],
  });
  const onDelete = (i) => {
    const tags = tagsState.tags.slice(0);
    tags.splice(i, 1);
    setTagsState((prevState) => {
      return {
        ...prevState,
        tags: [...tags],
      };
    });
    props.onTagsChanged(tags);
  };
  const onAddition = (tag) => {
    const tags = [].concat(tagsState.tags, tag);
    setTagsState((prevState) => {
      return {
        ...prevState,
        tags: [...tags],
      };
    });
    props.onTagsChanged(tags);
  };
  return (
    <div className={classes.container}>
      {/* <div className={classes.labelContainer}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <label>{props.title}</label>
        </div>
      </div> */}
      <ReactTags
        placeholderText={props.placeholderText || "Enter a value"}
        ref={reactTags}
        minQueryLength={1}
        tags={tagsState.tags}
        suggestions={tagsState.suggestions}
        onDelete={onDelete}
        allowNew
        onAddition={onAddition}
        className={classes.reactTags}
      />
    </div>
  );
};

export default AutoComplete;
