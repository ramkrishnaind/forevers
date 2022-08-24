import AppReducer from "../reducers/AppReducer";
import { useReducer, createContext } from "react";

const initialState = { posts: [], categories: [], categoryPosts: {} };

export const AppContext = createContext(initialState);

export const GlobalContext = ({ children }) => {
  const state = useReducer(AppReducer, initialState);
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
