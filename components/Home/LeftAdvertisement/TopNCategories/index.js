import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppContext } from "../../../../app/state/contexts/AppContext";
import NewsHighlight from "../../../News/NewsHighlight/NewsHighlight";
const AutoPlay = () => {
  const [state] = useContext(AppContext);
  console.log("state?.categoryPosts", state);
  const settings = {
    //   dots: true,
    infinite: true,
    slidesToShow: 4,
    vertical: true,
    //   centerMode: true,
    //   fade: true,
    slidesToScroll: 4,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  return (
    <>
      <h2 className="text-center bg-gray-500 py-2 px-2 text-lg text-white ">
        Latest news
      </h2>
      <div>
        <Slider {...settings}>
          {(state?.posts || [])?.map((obj, index) => {
            return (
              // <div>This is some text</div>
              <NewsHighlight
                optionalHeight={"4rem"}
                key={obj.id || index}
                data={obj.data ? obj.data : obj}
                id={obj.id || index}
              />
            );
          })}
        </Slider>
      </div>
    </>
  );
};
export default AutoPlay;
