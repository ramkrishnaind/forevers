function AppReducer(state, action) {
  const type = action.type;
  if (type == "setposts") {
    return { ...state, posts: action.payload };
  } else if (type == "set-category-posts") {
    return { ...state, categoryPosts: action.payload };
  } else if (type == "set-categories") {
    return { ...state, categories: action.payload };
  } else if (type == "set-category-posts") {
    return { ...state, categoryPosts: action.payload };
  } else if (type == "setmutage") {
    return { ...state, mutage: action.payload };
  } else if (type == "setid") {
    return { ...state, uid: action.payload };
  }
}
export default AppReducer;
