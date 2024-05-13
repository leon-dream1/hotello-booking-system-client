import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

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

/* eslint-disable react/prop-types */
const BookingTable = ({ booking, idx, myBooking, setMyBooking, getData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleUpdate = (id, roomId, prevDate) => {
    console.log(id, roomId, prevDate, bookingDate);
    if (
      new Date(prevDate).toLocaleString() ===
      new Date(bookingDate).toLocaleString()
    ) {
      toast.error("You have choose the same date!!!!!");
      closeModal();
    } else if (!bookingDate) {
      toast.error("You have choose the same date!!!!!");
      closeModal();
    } else {
      axios
        .patch(`http://localhost:5000/booking/${id}`, {
          date: new Date(bookingDate).toLocaleString(),
        })
        .then((res) => {
          if (res.data.modifiedCount) {
            toast.success("Date is updated Successfully..........");
            closeModal();
            getData();
          }
        });
    }
  };

  const handleDelete = (id, roomId) => {
    axios
      .delete(`http://localhost:5000/booking/${id}?room_id=${roomId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          // Update Ui
          const remaining = myBooking.filter((booking) => booking?._id !== id);
          setMyBooking(remaining);
          toast.success("You have just Canceled the Booking!!!!");
          closeModal();
        }
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <tr
      key={booking._id}
      className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
    >
      <td className="p-3 text-xl">
        <p>{idx + 1}</p>
      </td>
      <td className="p-3 text-xl font-von">
        <p>{booking?.room_type}</p>
      </td>
      <td className="p-3 text-xl font-mono">
        <p>${booking?.price_per_night}</p>
      </td>
      <td className="p-3 text-xl">
        <p>{booking?.room_size}</p>
      </td>
      <td className="p-3 text-xl font-merriweather">
        <p>{new Date(booking?.date).toDateString()}</p>
      </td>
      <td className="p-3">
        <span
          onClick={openModal}
          className="px-4 py-2 font-semibold rounded-md bg-blue-700 text-white cursor-pointer"
        >
          <span>Update</span>
        </span>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="mt-4 py-[130px] px-[50px]">
            <div className="mt-6">
              <h4 className="text-[45px] font-von mb-5">
                {booking?.room_type} {booking?._id}
              </h4>
              <h4 className="text-[25px] font-merriweather mb-5">
                Select a New Date......
              </h4>
              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
              />
              <div className="flex flex-row gap-4 pt-4">
                <button
                  onClick={() =>
                    handleUpdate(booking?._id, booking?.room_id, booking?.date)
                  }
                  className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </td>
      <td className="p-3">
        <span
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="px-4 py-2 font-semibold rounded-md bg-red-700 text-white cursor-pointer"
        >
          <span>Cancel</span>
        </span>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <div className="py-4">
              <div className="mt-4">
                <div className="mt-6">
                  <h4 className="text-[25px] font-von mb-5">
                    Are you sure to Cancel the Booking????
                  </h4>
                  <div className="flex flex-row gap-4">
                    <button
                      onClick={() =>
                        handleDelete(booking?._id, booking?.room_id)
                      }
                      className="input input-bordered w-1/2 bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
                    >
                      Yes
                    </button>
                    <form method="dialog w-full">
                      <button className="input input-bordered w-full bg-red-700 text-white text-[22px] font-semibold font-merriweather cursor-pointer">
                        No
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </td>
      <td className="p-3 ">
        <span
          onClick={() => navigate(`/review/${booking?.room_id}`)}
          className="px-4 py-2 font-semibold rounded-md bg-[#FFAC41] text-white cursor-pointer"
        >
          <span>Give Review</span>
        </span>
        {/* <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form
              onSubmit={(e) => handleSubmit(e, booking?.room_id)}
              className="p-[50px]"
            >
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  defaultValue={booking?.displayName}
                  name="name"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <select className="input input-bordered w-full">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Comment"
                  required
                  name="comment"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Submit"
                  className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
                />
              </div>
            </form>
           
          </div>
        </dialog> */}
      </td>
    </tr>
  );
};

export default BookingTable;
