import { Swiper, SwiperSlide } from "swiper/react";
// import Slide from "./Slide";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { RiDrinks2Line } from "react-icons/ri";
import {
  MdEventAvailable,
  MdFreeBreakfast,
  MdLocalOffer,
} from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { FaGift } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import { CgGym } from "react-icons/cg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SpecialOffer from "../SpecialOffer/SpecialOffer";

const Banner = () => {
  return (
    <Swiper
      className=""
      navigation={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
      }}
      loop={true}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
    >
      <SpecialOffer />
      <SwiperSlide>
        <div className={`h-[800px] bg-bgImg1 bg-no-repeat bg-cover z-10`}>
          <div className="h-[800px] flex flex-col items-center justify-center bg-black opacity-70">
            <h1 className="text-[80px] font-von text-white font-extrabold">
              Welcome to <span className="text-[#FFAC41]">Hotello</span>
            </h1>
            <div className="flex gap-8 space-x-[80px] mt-[50px]">
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <RiDrinks2Line size={50} />
                <h4 className="text-[30px] font-merriweather font-bold">
                  Drinks
                </h4>
              </div>
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <MdEventAvailable size={50} />
                <h4 className="text-[30px] font-merriweather font-bold">
                  Special Events
                </h4>
              </div>
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <CgGym size={50} />
                <h4 className="text-[30px] font-merriweather font-bold">Gym</h4>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={`h-[800px] bg-bgImg1 bg-no-repeat bg-cover`}>
          <div className="h-[800px] flex flex-col items-center justify-center bg-black opacity-70">
            <h1 className="text-[80px] font-von text-white font-extrabold">
              Golden <span className="text-[#FFAC41] font-von">Autumn </span>
              Offer
            </h1>
            <div className="flex gap-8 space-x-[80px] mt-[50px]">
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <FaWifi size={50} />
                <h4 className="text-[30px] font-merriweather ">Free Wifi</h4>
              </div>
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <LuParkingCircle size={50} />
                <h4 className="text-[30px] font-merriweather">Free Parking</h4>
              </div>
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <MdFreeBreakfast size={50} />
                <h4 className="text-[30px] font-merriweather">BreakFast</h4>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={`h-[800px] bg-bgImg1 bg-no-repeat bg-cover`}>
          <div className="h-[800px] flex flex-col items-center justify-center bg-black opacity-70">
            <h1 className="text-[80px] font-von text-white font-extrabold">
              Enjoy <span className="text-[#FFAC41] font-von">The </span>{" "}
              Experience
            </h1>
            <div className="flex gap-8 space-x-[80px] mt-[50px]">
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <CiDiscount1 size={50} />
                <h4 className="text-[30px] font-merriweather">Discount</h4>
              </div>
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <MdLocalOffer size={50} />
                <h4 className="text-[30px] font-merriweather">Best offer</h4>
              </div>
              <div className="text-white font-extrabold flex flex-col items-center space-y-4">
                <FaGift size={50} />
                <h4 className="text-[30px] font-merriweather">Special Gift</h4>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
