import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Room = () => {
  const [allRoom, setAllRoom] = useState([]);
  const { loading } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:5000/room").then((res) => {
      setAllRoom(res.data);
    });
  }, []);
  const navigate = useNavigate();

  if (loading) return;
    
  return (
    <div className="container mx-auto mt-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
