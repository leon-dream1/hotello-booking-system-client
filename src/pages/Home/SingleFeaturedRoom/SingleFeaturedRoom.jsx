/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

// eslint-disable-next-line react/prop-types
const SingleFeaturedRoom = ({ room, featuredRoom }) => {
  const [bookingDate, setBookingDate] = useState(new Date().toLocaleString());
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    _id,
    // eslint-disable-next-line react/prop-types
    images,
    room_type,
    room_size,
    price_per_night,
    review,
    description,
    availability,
  } = room;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleBookButton = () => {
    if (!user) {
      return navigate("/login");
    }
    openModal();
  };

  const handleBooking = (id) => {
    const selectedFeaturedRoom = featuredRoom.find((room) => room._id === id);
    // console.log(selectedFeaturedRoom);
    const bookingData = {
      ...selectedFeaturedRoom,
      date: bookingDate,
      email: user.email,
      displayName: user.displayName,
    };
    console.table(bookingData);

    axios
      .post(`http://localhost:5000/booking?id=${id}`, bookingData)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          closeModal();
          toast("Congratulation!!!! Room is Booked For you");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      key={_id}
      className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg"
    >
      <img
        className="object-cover w-full h-56 cursor-pointer"
        onClick={() => navigate(`/room/${_id}`)}
        src={images}
        alt="avatar"
      />

      <div className="space-y-5 p-5">
        <h2 className="text-[20px] font-von font-bold text-[#131313]">
          {room_type}
        </h2>
        {/* eslint-disable-next-line react/prop-types */}
        <p>{description.slice(0, 100)}....</p>
        <p className="text-black font-merriweather">Room size :{room_size}</p>
        <p>
          Price per Night :{" "}
          <span className="text-[22px] text-slate-800 font-bold">
            ${price_per_night}
          </span>
        </p>
        <p className="text-[18px]">
          Total Review:
          <span className="text-[#FFAC41]">{review}</span>{" "}
        </p>
        {availability ? (
          <button
            onClick={handleBookButton}
            className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
          >
            Book Now
          </button>
        ) : (
          <button
            disabled={true}
            className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather"
          >
            Already Booked
          </button>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <button
            className="bg-red-800 px-[20px] py-[10px] rounded text-white cursor-pointer"
            onClick={closeModal}
          >
            Close
          </button>
          <div className="my-4">
            <span className="block text-[20px] md:[35px] lg:text-[50px] font-medium tracking-widest uppercase dark:text-violet-600">
              {room_type}
            </span>
            <h2 className="text-[25px] font-semibold tracking-wide font-raleway text-blue-400 pt-2">
              Price per Night: ${price_per_night}
            </h2>
            <p className="text-[22px] font-von pt-4">
              Select A Date For Your Wanted Room
            </p>
            <DatePicker
              selected={bookingDate}
              onChange={(date) => setBookingDate(date)}
              className="input input-bordered w-full font-semibold font-merriweather"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={() => handleBooking(_id)}
              className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SingleFeaturedRoom;
