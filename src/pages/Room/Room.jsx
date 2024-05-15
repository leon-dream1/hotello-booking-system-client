import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const Room = () => {
  const [allRoom, setAllRoom] = useState([]);
  const navigate = useNavigate();
  const { loading } = useAuth();

  useEffect(() => {
    axios.get(`https://hotello-booking-system-server.vercel.app/room`).then((res) => {
      setAllRoom(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const minPrice = form.min.value;
    const maxPrice = form.max.value;
    axios
      .get(`https://hotello-booking-system-server.vercel.app/filterRoom?min=${minPrice}&max=${maxPrice}`)
      .then((res) => {
        setAllRoom(res.data);
        form.reset();
      });
  };
  if (loading) return;

  return (
    <div className="container mx-auto mt-[50px]">
      <Helmet>
        <title>Room</title>
      </Helmet>
      <form className="mt-[50px] w-[80%] lg:w-[20%] mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="number"
            name="min"
            placeholder="Minimum Price"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="max"
            placeholder="Maximum Price"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Find"
            className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
          />
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[50px] m-4 lg:m-0">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
