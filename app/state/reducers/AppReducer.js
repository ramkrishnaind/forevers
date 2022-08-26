function AppReducer(state, action) {
  const type = action.type;
  if (type == "setposts") {
    return {
      ...state,
      currentCategory: "",
      currentPosts: [],
      posts: action.payload,
    };
  } else if (type == "set-category-posts") {
    return {
      ...state,
      currentCategory: "",
      currentPosts: [],
      categoryPosts: action.payload,
    };
  } else if (type == "set-categories") {
    return { ...state, categories: action.payload };
  } else if (type == "setmutage") {
    return { ...state, mutage: action.payload };
  } else if (type == "setid") {
    return { ...state, uid: action.payload };
  } else if (type == "clear-more") {
    return { ...state, more: false };
  } else if (type == "clear-currentCategory") {
    return { ...state, currentCategory: "", currentPosts: [] };
  } else if (type == "set-more-currentCategory") {
    const newState = { ...state };
    console.log("newState", newState);
    switch (action.payload.trim().toLowerCase()) {
      case "latest news":
        debugger;
        newState.currentCategory = action.payload;
        newState.currentPosts = [...newState.posts];

        break;
      default:
        newState.currentCategory = action.payload;
        newState.currentPosts = [...newState.categoryPosts[action.payload]];
        break;
    }
    newState.more = true;
    return { ...newState };
  } else if (type == "set-currentCategory") {
    debugger;
    const newState = { ...state };
    console.log("newState", newState);
    switch (action.payload.trim().toLowerCase()) {
      case "latest news":
        debugger;
        newState.currentCategory = action.payload;
        newState.currentPosts = [...newState.posts];
        break;
      default:
        newState.currentCategory = action.payload;
        newState.currentPosts = [...newState.categoryPosts[action.payload]];
        break;
    }
    return { ...newState };
  } else if (type == "filter") {
    debugger;
    const newState = { ...state };
    console.log("newState", newState);
    newState.currentCategory = "Filtered Posts";
    newState.currentPosts = [
      ...newState.posts.filter((item) =>
        item.data.title
          .toLowerCase()
          .trim()
          .includes(action.payload.trim().toLowerCase())
      ),
    ];

    return { ...newState };
  } else if (type == "outside-search") {
    const newState = { ...state };
    if (!action.payload) {
      newState.currentCategory = "";
      newState.currentPosts = [];
    }
    return { ...newState, outsideSearch: action.payload };
  }
}
export default AppReducer;
