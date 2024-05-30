import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import "react-range-slider-input/dist/style.css";
import FilterRoom from "./FilterRoom";

const Room = () => {
  const [allRoom, setAllRoom] = useState([]);
  const [value, setValue] = useState([0, 2000]);
  const [selectedRating, setSelectedRating] = useState("");
  const navigate = useNavigate();
  const { loading } = useAuth();

  useEffect(() => {
    axios
      .get(`https://hotello-booking-system-server.vercel.app/room`)
      .then((res) => {
        setAllRoom(res.data);
      });
  }, []);

  const handleRating = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://hotello-booking-system-server.vercel.app/filterRoom?min=${value[0]}&max=${value[1]}&rating=${selectedRating}`
      )
      .then((res) => {
        setAllRoom(res.data);
      });
  };

  if (loading)
    <div className="w-full max-w-lg mx-auto animate-pulse p-9 mt-[300px]">
      <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600"></h1>

      <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
      <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
      <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
      <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    </div>;

  return (
    <div className="container mx-auto mt-[50px]">
      <Helmet>
        <title>Room</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[50px] m-4 lg:mt-[100px]">
        <FilterRoom
          value={value}
          setValue={setValue}
          handleSubmit={handleSubmit}
          handleRating={handleRating}
        />

        {allRoom.map((room) => (
          <div
            key={room?._id}
            className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg"
          >
            <img
              className="object-cover w-full h-56 cursor-pointer"
              onClick={() => navigate(`/room/${room?._id}`)}
              src={room.images}
              alt="avatar"
            />

            <div className="space-y-5 p-5">
              <h2 className="text-[20px] font-von font-bold text-[#131313]">
                {room?.room_type}
              </h2>
              <p>{room?.description.slice(0, 100)}....</p>
              <p className="text-black font-merriweather">
                Room size :{room?.room_size}
              </p>
              <p>
                Price per Night :{" "}
                <span className="text-[22px] text-slate-800 font-bold">
                  ${room?.price_per_night}
                </span>
              </p>
              <p className="text-[18px]">
                Total Review:{" "}
                <span className="text-[#FFAC41]">{room?.review}</span>{" "}
              </p>
              <p className="text-[18px]">
                Rating:{" "}
                <span className="text-green-700">
                  {room?.rating ? room?.rating : "Not rated yet"}
                </span>{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
