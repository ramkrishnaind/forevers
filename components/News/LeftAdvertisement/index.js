import React from "react";
import TopNCategories from "./TopNCategories";
import RandomNPosts from "./RandomNPosts";
import Ad from "../../Ad/Ad";
const index = () => {
  return (
    <div className=" bg-[#F2F2F0] flex flex-col gap-3">
      {/* comment by anas left sidebar <Ad currentPath="Above TopNCategories" dataAdSlot="4977620935" />*/}
      <TopNCategories />
      {/* comment by anas left sidebar 2<Ad currentPath="Below TopNCategories" dataAdSlot="6023071307" />*/}
      <RandomNPosts />
    </div>
  );
};

export default index;
