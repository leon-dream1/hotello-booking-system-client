import { Link, NavLink } from "react-router-dom";
import logo from "/logo.svg";

const Navbar = () => {
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
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;