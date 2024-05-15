import { useForm } from "react-hook-form";

const NewsLetter = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="py-[100px] bg-[#e6be87]">
      <h4 className="text-black font-von text-[30px] text-center mb-4">
        Get in touch
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-[20px] w-[90%] lg:w-[20%] mx-auto"
      >
        <div>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            {...register("email")}
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Subscribe"
            className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default NewsLetter;
