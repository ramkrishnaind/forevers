import React from "react";
import RelatedNPosts from "./RelatedNPosts";
import TopNCategories from "../TopNCategories";
import Ad from "../../Ad/Ad";
const RightAdvertisement = () => {
  return (
    <div className=" bg-[#F2F2F0] flex flex-col gap-3">
      {/* <Ad currentPath="Above RelatedNPosts" dataAdSlot="6590085504" /> */}
      <RelatedNPosts />
      {/* <Ad currentPath="Below RelatedNPosts" dataAdSlot="4462577625" /> */}
      {/* <div className="mb-3"></div> */}
      <TopNCategories />
    </div>
  );
};

export default RightAdvertisement;
