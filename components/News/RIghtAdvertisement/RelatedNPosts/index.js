import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppContext } from "../../../../app/state/contexts/AppContext";
import NewsHighlight from "../../NewsHighlight/NewsHighlight";

const AutoPlay = ({ N = 5, orientation = "Vertical", W }) => {
  const [state] = useContext(AppContext);
  const [relatedPosts, setRelatedPosts] = useState([]);
  console.log("state now", state);
  const currentCategories = state?.currentPosts?.[0]?.data?.categories || [];
  useEffect(() => {
    if (currentCategories && currentCategories?.length > 0) {
      const postsCurrentCategory = state.posts.filter((item) => {
        const found = false;
        currentCategories.forEach((currentCategory) => {
          if (item?.data?.categories.includes(currentCategory)) {
            found = true;
            return;
          }
        });
        return found;
      });
      if (postsCurrentCategory && postsCurrentCategory.length > 0) {
        setRelatedPosts(postsCurrentCategory.slice(0, N));
      }
    }
  }, [currentCategories]);
  // const relatedPosts = state?.posts;

  return (
    <>
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-white px-2">
          <h2 className="text-center bg-gray-500 py-2 px-2 text-lg text-white ">
            Related posts
          </h2>
          <div
            className={`px-2 ${
              orientation == "horizontal"
                ? " md:flex md:justify-between md:px-3 md:flex-wrap"
                : ""
            }`}
          >
            {/* <Slider {...settings}> */}
            {(relatedPosts || [])?.map((obj, index) => {
              return (
                // <div>This is some text</div>
                <NewsHighlight
                  W={W}
                  optionalHeight={"16"}
                  key={obj.id || index}
                  data={obj.data ? obj.data : obj}
                  id={obj.id || index}
                />
              );
            })}
            {/* </Slider> */}
          </div>
        </div>
      )}
    </>
  );
};
export default AutoPlay;
