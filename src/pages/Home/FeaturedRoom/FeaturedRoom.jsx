import axios from "axios";
import { useEffect, useState } from "react";
import SingleFeaturedRoom from "../SingleFeaturedRoom/SingleFeaturedRoom";

const FeaturedRoom = () => {
  const [featuredRoom, setFeaturedRoom] = useState([]);

  useEffect(() => {
    axios.get(`https://hotello-booking-system-server.vercel.app/room?limit=6`).then((res) => {
      setFeaturedRoom(res.data);
    });
  }, []);

  return (
    <div className="container mx-auto mt-[100px]">
      <h2 className="text-[#FFAC41] text-center font-von text-[25px] lg:text-[50px]">
        Featured Room
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[50px] m-4">
        {featuredRoom.map((room) => (
          <SingleFeaturedRoom key={room._id} room={room} featuredRoom={featuredRoom} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRoom;
