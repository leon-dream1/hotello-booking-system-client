import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import useAuth from "../hooks/useAuth";
import userIcon from "/user.png";
import { Tooltip } from "react-tooltip";
import axios from "axios";

const Navbar = () => {
  const { user, logOut, setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        setUser("");
        axios
          .post("http://localhost:5000/logout", {email : user.email} , { withCredentials: true })
          .then((res) => console.log(res.data));
      })
      .catch((error) => console.log(error));
  };
  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-[20px] font-merriweather text-[#FFAC41] font-bold"
            : "text-[20px] font-merriweather font-medium"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-[20px] font-merriweather text-[#FFAC41] font-bold"
            : "text-[20px] font-merriweather font-medium"
        }
        to="/allRoom"
      >
        Rooms
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-[20px] font-merriweather text-[#FFAC41] font-bold"
            : "text-[20px] font-merriweather font-medium"
        }
        to="/myBooking"
      >
        My Booking
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-[20px] font-merriweather text-[#FFAC41] font-bold"
            : "text-[20px] font-merriweather font-medium"
        }
        to="/about"
      >
        About Us
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-[20px] font-merriweather text-[#FFAC41] font-bold"
            : "text-[20px] font-merriweather font-medium"
        }
        to="/contact"
      >
        Contact Us
      </NavLink>
    </>
  );
  return (
    <div className="bg-[#333333] p-2">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {links}
              </ul>
            </div>
            <Link to="/" className="cursor-pointer">
              <img src={logo} alt="" className="w-[70%]" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-10 text-white">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="flex items-center space-x-1 md:space-x-4">
                <div className="dropdown dropdown-end">
                  <div>
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div
                        className="w-8 rounded-full"
                        data-tooltip-id="my-tooltip"
                      >
                        <img
                          alt="Tailwind CSS Navbar component"
                          src={user.photoURL ? user.photoURL : { userIcon }}
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a>{user.displayName}</a>
                      </li>
                    </ul>
                  </div>
                  <Tooltip
                    id="my-tooltip"
                    content={user.displayName}
                    offset={20}
                    className="z-10"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-[#ee4040] text-white text-[14px] md:text-[18px] font-merriweather font-semibold px-[10px] md:px-[35px] py-[5px] rounded-lg"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex space-x-6">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white text-[18px] px-[25px] py-[15px] rounded-md font-merriweather"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 text-white text-[18px] px-[25px] py-[15px]  rounded-md font-merriweather"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
