import Banner from "../Banner/Banner";
import FeaturedRoom from "../FeaturedRoom/FeaturedRoom";
import HotelLocation from "../HotelLocation/HotelLocation";
// import SpecialOffer from "../SpecialOffer/SpecialOffer";
import Review from "../UserReview/UserReview";

const Home = () => {
  return (
    <div>
      {/* <SpecialOffer /> */}
      <Banner />
      <FeaturedRoom />
      <HotelLocation />
      <Review />
    </div>
  );
};

export default Home;
