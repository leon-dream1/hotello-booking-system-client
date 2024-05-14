import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import BookingTable from "./BookingTable";
import { Helmet } from "react-helmet";

const MyBooking = () => {
  const { user } = useAuth();
  const [myBooking, setMyBooking] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:5000/booking/${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMyBooking(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  console.log("booking", myBooking);
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <Helmet>
          <title>Booking</title>
        </Helmet>
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
                <th className="p-3">Action</th>
                <th className="p-3">Action</th>
                <th className="p-3">Review</th>
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
