import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const ReviewFromUser = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios
      .get(`https://hotello-booking-system-server.vercel.app/checkBookingForReview/${roomId}`)
      .then((res) => {
        if (!res.data.success) {
          toast(
            "Sorry!!!!! You can not give a review..Please Book a Room First"
          );
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, [roomId]);

  //Review
  const onSubmit = (data) => {
    const reviewData = { ...data, date: new Date().toLocaleString() };
    axios
      .post(`https://hotello-booking-system-server.vercel.app/review?room_id=${data?.roomId}`, reviewData)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast("Thank You for your Review!!");
          reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto mt-[100px]">
      <Helmet>
        <title>Review</title>
      </Helmet>
      <h4 className="text-[30px] text-center font-von text-[#FFAC41]">
        Give Your valuable Review here
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="p-[50px]">
        <div className="mb-4">
          <input
            className="input input-bordered w-full"
            defaultValue={parseInt(roomId)}
            {...register("roomId")}
            readOnly
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            defaultValue={user?.displayName}
            {...register("name")}
            readOnly
          />
        </div>
        <div className="mb-4">
          <select
            className="input input-bordered w-full"
            {...register("rating")}
          >
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
            {...register("comment")}
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
  );
};

export default ReviewFromUser;
