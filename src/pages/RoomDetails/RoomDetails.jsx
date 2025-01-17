import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Modal from "react-modal";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

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

const RoomDetails = () => {
  const selectedRoom = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState(new Date().toLocaleString());
  const [modalIsOpen, setIsOpen] = useState(false);

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

  const handleBooking = () => {
    const bookingData = {
      room_type: selectedRoom.room_type,
      room_id: selectedRoom.room_id,
      description: selectedRoom.description,
      price_per_night: selectedRoom.price_per_night,
      room_size: selectedRoom.room_size,
      date: bookingDate,
      review: selectedRoom.review,
      images: selectedRoom.images,
      special_offers: selectedRoom.special_offers,
      email: user.email,
      displayName: user.displayName,
    };
    console.table(bookingData);

    axios
      .post(
        `https://hotello-booking-system-server.vercel.app/booking?id=${selectedRoom?._id}`,
        bookingData
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          closeModal();
          toast("Congratulation!!!! Room is Booked For you");
          navigate("/myBooking");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto mt-[100px] lg:mt-[100px]">
      <Helmet>
        <title>Room Details Of {selectedRoom?._id}</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center m-[20px] lg:m-0">
        <div>
          <img
            src={selectedRoom?.images}
            alt=""
            className="rounded-md w-full"
          />
        </div>
        <div>
          <div className="mb-2">
            <span className="block text-[25px] md:[35px] lg:text-[50px] font-medium tracking-widest uppercase dark:text-violet-600">
              {selectedRoom?.room_type}
            </span>
            <h2 className="text-xl font-semibold font-merriweather pt-3 text-amber-600">
              Available: {selectedRoom?.availability ? "true" : "false"}
            </h2>

            <h2 className="text-[25px] font-semibold tracking-wide font-raleway text-blue-400 pt-2">
              Price per Night: ${selectedRoom.price_per_night}
            </h2>
          </div>
          <p className="pb-6 text-stone-600">
            Room size:{" "}
            <span className="text-[#FFAC41]">{selectedRoom.room_size}</span>
          </p>
          <div className="text-black text-[30px] font-von pb-6">
            Special Offer ----
            {selectedRoom.special_offers.map((offer, idx) => (
              <span key={idx} className="text-[18px]">
                <li>{offer?.offer_title}</li>
                <li>{offer?.offer_description}</li>
              </span>
            ))}
          </div>

          <p className="text-xl pb-6 text-stone-600">
            {selectedRoom.description}
          </p>
          <div className="my-4">
            <p className="text-[22px] font-von">
              Select A Date For Your Wanted Room
            </p>
            <DatePicker
              selected={bookingDate}
              onChange={(date) => setBookingDate(date)}
              className="input input-bordered w-full font-semibold font-merriweather"
            />
          </div>
          {selectedRoom?.availability ? (
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
            <div className="mt-4">
              <span className="block text-[20px] md:[35px] lg:text-[50px] font-medium tracking-widest uppercase dark:text-violet-600">
                {selectedRoom?.room_type}
              </span>
              <h2 className="text-[25px] font-semibold tracking-wide font-raleway text-blue-400 pt-2">
                Price per Night: ${selectedRoom.price_per_night}
              </h2>
              <p className="pb-6 text-stone-600 text-xl">
                Room size:
                <span className="text-[#FFAC41]">{selectedRoom.room_size}</span>
              </p>

              <p className="text-xl pb-6 text-stone-600">
                {selectedRoom.description}
              </p>
              <p className="text-xl font-von">
                Booking Date : {bookingDate?.toLocaleString()}
              </p>

              <div className="mt-6">
                <button
                  onClick={handleBooking}
                  className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
          <button
            onClick={() => navigate(`/review/${selectedRoom?.room_id}`)}
            className="mt-5 input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather"
          >
            Give a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
