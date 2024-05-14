import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Helmet } from "react-helmet";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const { logInWithEmailAndPassword, googleLogin, faceBookLogin } = useAuth();

  const onSubmit = (data) => {
    setError("");
    const { email, password } = data;
    logInWithEmailAndPassword(email, password)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        toast.success("Log in successfully.........");
        reset({
          email: "",
          password: "",
        });
        axios
          .post(
            "http://localhost:5000/jwt",
            { email },
            { withCredentials: true }
          )
          .then((res) => console.log(res.data));

        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error.code);
        setError("Password is Not matching");
        toast.error("password is incorrect");
      });
  };

  const handleGoogleLogIn = () => {
    googleLogin()
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        toast.success("Log in successfully.........");
        axios
          .post(
            "http://localhost:5000/jwt",
            { email: result.user.email },
            { withCredentials: true }
          )
          .then((res) => console.log(res.data));
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFacebookLogIn = () => {
    faceBookLogin()
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        toast.success("Log in successfully.........");
        axios
          .post(
            "http://localhost:5000/jwt",
            { email: result.user.email },
            { withCredentials: true }
          )
          .then((res) => console.log(res.data));
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-7xl h-[520px] mt-[150px]">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{ backgroundImage: "url('/banner3.jpg')" }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <Helmet>
            <title>Login</title>
          </Helmet>
          <h1 className="text-center text-[20px] md:text-[30px] lg:text-[40px] font-inter text-slate-700 font-medium mb-[15px]">
            Login To Explore A Room
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-[20px]">
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
                type="password"
                placeholder="Type Your Password"
                className="input input-bordered w-full"
                required
                {...register("password")}
              />
            </div>
            {error ? <span className="text-red-700">{error}</span> : ""}
            <div>
              <input
                type="submit"
                value="Log in"
                className="input input-bordered w-full bg-[#425CEC] text-white text-[22px] font-semibold font-merriweather cursor-pointer"
              />
            </div>
          </form>
          <div className="space-x-5 text-center mt-2">
            <span className="text-[16px] text-[#131313] font-inter">
              Do not have an Account?
            </span>
            <span
              onClick={() => navigate("/register")}
              className="text-[18px] text-blue-600 font-semibold underline font-montserrat cursor-pointer"
            >
              Register
            </span>
          </div>
          <div
            onClick={handleGoogleLogIn}
            className="mt-10 flex items-center bg-[#425CEC] text-white text-[18px] font-semibold font-merriweather cursor-pointer space-x-4  lg:space-x-[100px] py-2 rounded-lg justify-start md:justify-center lg:justify-start"
          >
            <FaGoogle size={24} className="ml-[30px] lg:ml-[70px]" />
            <button>Continue With Google</button>
          </div>
          <div
            onClick={handleFacebookLogIn}
            className="mt-5 flex items-center bg-[#425CEC] text-white text-[18px] font-semibold font-merriweather cursor-pointer space-x-4 lg:space-x-[100px] py-2 rounded-lg justify-start md:justify-center lg:justify-start"
          >
            <FaFacebook size={24} className="ml-[30px] lg:ml-[70px]" />
            <button>Continue With FaceBook</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
