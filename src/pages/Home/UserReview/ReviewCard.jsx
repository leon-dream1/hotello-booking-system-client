/* eslint-disable react/prop-types */
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ReviewCard = ({ review }) => {
  console.log("review", review);
  return (
    <SwiperSlide className="h-[500px] flex flex-col items-center justify-center">
      <div className="bg-blue-700">
        {review?._id}
      </div>
    </SwiperSlide>
  );
};

export default ReviewCard;
