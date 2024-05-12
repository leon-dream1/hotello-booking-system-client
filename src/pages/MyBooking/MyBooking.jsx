import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
// import { toast } from "react-toastify";

// import UpdateModal from "./UpdateModal";
import BookingTable from "./BookingTable";

const MyBooking = () => {
  const { user } = useAuth();
  const [myBooking, setMyBooking] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:5000/booking/${user.email}`)
      .then((res) => {
        setMyBooking(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
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
                <BookingTable
                  key={booking?._id}
                  idx={idx}
                  booking={booking}
                  myBooking={myBooking}
                  setMyBooking={setMyBooking}
                  getData={getData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
