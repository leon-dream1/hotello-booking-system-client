import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";

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

const MyBooking = () => {
  const { user } = useAuth();
  const [myBooking, setMyBooking] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/booking/${user.email}`)
      .then((res) => {
        console.log(res.data);
        setMyBooking(res.data);
      })
      .catch((err) => console.log(err));
  }, [user.email]);

  const handleBookButton = () => {
    openModal();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/booking/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          // Update Ui
          const remaining = myBooking.filter((booking) => booking?._id !== id);
          setMyBooking(remaining);
          toast.success("You have just Canceled the Booking!!!!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          All Booking
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">#</th>
                <th className="p-3">Room Type</th>
                <th className="p-3">Price</th>
                <th className="p-3">Size</th>
                <th className="p-3">Date</th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {myBooking.map((booking, idx) => (
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
                    <span className="px-4 py-2 font-semibold rounded-md bg-blue-700 text-white cursor-pointer">
                      <span>Update</span>
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      onClick={handleBookButton}
                      className="px-4 py-2 font-semibold rounded-md bg-red-700 text-white cursor-pointer"
                    >
                      <span>Cancel</span>
                    </span>
                  </td>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                  >
                    <div className="mt-4">
                      <div className="mt-6">
                        <h4 className="text-[25px] font-von mb-5">
                          Are you sure to Cancel the Booking????
                        </h4>
                        <div className="flex flex-row gap-4">
                          <button
                            onClick={() => handleDelete(booking?._id)}
                            className="input input-bordered w-1/2 bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
                          >
                            Yes
                          </button>
                          <button
                            onClick={closeModal}
                            className="input input-bordered w-1/2 bg-red-700 text-white text-[22px] font-semibold font-merriweather cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
