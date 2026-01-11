import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../components/Logo";
import useAuth from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "../../components/ThemeToggle";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <div className="flex dark:text-white">
      <li>
        <NavLink
          to="/"
          className={`font-semibold ${
            isScrolled
              ? "text-gray-800 hover:text-white"
              : "dark:text-white hover:text-orange-600"
          }`}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-scholarships"
          className={`font-semibold ${
            isScrolled
              ? "text-gray-800 hover:text-[#212121]"
              : "dark:text-white hover:text-orange-600"
          }`}
        >
          All Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-scholarship"
          className={`font-semibold ${
            isScrolled
              ? "text-gray-800 hover:text-[#212121]"
              : "dark:text-white hover:text-orange-600"
          }`}
        >
          Add Scholarship
        </NavLink>
      </li>

      {user && (  
        <>
          <li>
            <NavLink
              to="/dashboard/admin-addScholar"
              className={`font-semibold ${
                isScrolled
                  ? "text-gray-800 hover:text-[#212121]"
                  : "dark:text-white hover:text-orange-600"
              }`}
            >
              Admin Scholar
            </NavLink>
          </li>
        </>
      )}
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);



    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = isScrolled
    ? "bg-transparent bg-opacity-95 shadow-md backdrop-blur-sm "
    : "bg-transparent text-orange-500";

  const logoColor = isScrolled ? "text-[#404040]" : "text-white";

  const loginButtonClasses = isScrolled
    ? "bg-transparent text-orange-500"
    : "bg-transparent text-orange-500 border-[#0c5f5a]";

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${navbarClasses}`}
    >
      <div className="grid w-full px-4 mx-auto mb-2 shadow md:justify-between md:flex navbar lg:px-0 ">
        <div className="navbar-start">
          {/* Mobile Menu Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="border bg-base-100 btn lg:hidden"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
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
              className="menu menu-md font-semibold dropdown-content bg-gray-600 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow text-[20px]"
            >
              {links}
              {/* Mobile logic for login/logout can stay here */}
            </ul>
          </div>

          <div
            className={`text-2xl font-bold transition-colors duration-300 ${logoColor}`}
          >
            <Logo />
          </div>
        </div>

        <div className="hidden navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1 text-[18px]">{links}</ul>
        </div>

        {/* Right Side: ThemeToggle + Auth */}
        <div className="flex items-center gap-4 navbar-end">
          {/* Theme Toggle Button Here */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-[#0c5f5a] p-0"
              >
                {user.photoURL ? (
                  <img
                    alt="User Avatar"
                    src={user.photoURL}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-[#0c5f5a]" />
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow text-base text-gray-700 dark:text-gray-200"
              >
                <li className="px-3 py-2 font-semibold border-b dark:border-gray-700">
                  {user.displayName || user.email}
                </li>
                <li>
                  <Link to="/dashboard/my-profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="font-bold text-red-500"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className={`font-bold rounded-md bg-gradient-to-r from-teal-400 to-orange-200 hover:from-orange-300 hover:to-teal-400 px-6 py-2 transition-all duration-300 shadow-sm text-[#0c5f5a]`}
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
