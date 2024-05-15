import { useForm } from "react-hook-form";
import HotelLocation from "../Home/HotelLocation/HotelLocation";

const Contact = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <div className=" grid grid-cols-1 md:grid-cols-2 items-center pt-[50px] lg:pt-[150px] gap-8">
        <div className="p-[50px] lg:p-0">
          <p className="text-[#131313] font-von text-[18px] mb-[30px]">
            Waters midst. Creature man female. Them You’re female there his for
            first were have whose and blessed darkness his man Darkness had
            you’re hath fill were. Gathering may living move the had evening
            called behold. Blessed darkness subdue he open she had of void sea
            one let after light thing have creeping living the brought.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex flex-row gap-4">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-1/2"
                {...register("name")}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-1/2"
                {...register("email")}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="textarea"
                placeholder="Message"
                className="input input-bordered w-full"
                {...register("message")}
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Send Message"
                className="input input-bordered w-1/2 bg-[#C19B76] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
              />
            </div>
          </form>
        </div>
        <div>
          <img src="/banner1.jpg" alt="" className="bg-cover" />
        </div>
      </div>
      <HotelLocation />
    </div>
  );
};

export default Contact;
