function AppReducer(state, action) {
  const type = action.type;
  if (type == "setposts") {
    return { ...state, posts: action.payload };
  } else if (type == "setmutage") {
    return { ...state, mutage: action.payload };
  } else if (type == "setid") {
    return { ...state, uid: action.payload };
  }
}
export default AppReducer;
