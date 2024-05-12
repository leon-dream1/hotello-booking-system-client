import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile, setUser, setLoading } = useAuth();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, email, photoURL, password } = data;
    createUser(email, password)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        toast.success("Your Registration is successful.........");
        updateUserProfile(name, photoURL)
          .then(() => {
            setUser(result.user);
            setLoading(false);
            axios
              .post(
                "http://localhost:5000/jwt",
                { email: email },
                { withCredentials: true }
              )
              .then((res) => console.log(res.data));

            toast.success("Update is saved successfully......");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div
      className="flex w-full max-w-md mx-auto overflow-hidden bg-white 
    rounded-lg shadow-lg lg:max-w-7xl h-[500px] mt-[150px]"
    >
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{ backgroundImage: "url('/banner2.jpg')" }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <p className="mt-3 text-xl text-center text-black mb-4">
          Welcome back!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[20px]">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
              {...register("name")}
            />
          </div>
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
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              {...register("photoURL")}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <input
              type="password"
              placeholder="Type Your Password"
              className="input input-bordered w-full"
              required
              {...register("password", {
                pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
              })}
            />
          </div>
          {errors.password ? (
            <span className="text-red-700">
              Password should have an Uppercase letter a Lowercase letter and at
              least 6 character
            </span>
          ) : (
            ""
          )}
          <div>
            <input
              type="submit"
              value="Register"
              className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
            />
          </div>
        </form>
        <div className="space-x-5 text-center mt-2">
          <span className="text-[16px] text-[#131313] font-inter">
            Already Have an Account?
          </span>
          <span
            onClick={() => navigate("/login")}
            className="text-[18px] text-blue-600 font-semibold underline font-montserrat cursor-pointer"
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
