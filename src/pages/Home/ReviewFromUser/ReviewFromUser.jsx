import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const ReviewFromUser = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  console.log(roomId);
  const { register, handleSubmit, reset } = useForm();

  //Review
  const onSubmit = (data) => {
    console.log(data);
    const reviewData = { ...data, date: new Date().toLocaleString() };
    console.log(reviewData);
    axios
      .post(`http://localhost:5000/review?room_id=${data?.roomId}`, reviewData)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          toast("Thank You for your Review!!");
          reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
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
