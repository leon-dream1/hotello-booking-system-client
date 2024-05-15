import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import FeaturedRoom from "../FeaturedRoom/FeaturedRoom";
import HotelLocation from "../HotelLocation/HotelLocation";
import Review from "../UserReview/UserReview";
import NewsLetter from "../NewsLetter/NewsLetter";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Hotello | Book your Favorite Room</title>
      </Helmet>
      <Banner />
      <FeaturedRoom />
      <HotelLocation />
      <NewsLetter />
      <Review />
    </div>
  );
};

export default Home;
