import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../components/Logo";
import useAuth from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";



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
    <>
      <li>
        <NavLink
          to="/"
          className={`font-semibold ${
            isScrolled
              ? "text-gray-800 hover:text-[#212121]"
              : "text-[#404040] hover:text-[#212121]"
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
              : "text-[#404040] hover:text-[#212121]"
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
              : "text-[#404040] hover:text-[#212121]"
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
                  : "text-[#404040] hover:text-[#212121]"
              }`}
            >
              Admin Scholar
            </NavLink>
          </li>
        </>
      )}
    </>
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
    ? "bg-transparent bg-opacity-95 shadow-md backdrop-blur-sm"
    : "bg-transparent";

  const logoColor = isScrolled ? "text-[#404040]" : "text-white";

  const loginButtonClasses = isScrolled
    ? "bg-transparent text-[#0c5f5a]"
    : "bg-transparent text-[#0c5f5a] border-[#0c5f5a]";

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${navbarClasses}`}
    >
      <div className="navbar w-full mx-auto px-4 lg:px-0 flex justify-between">
        <div className="navbar-start">
          {/* Dropdown Menu (Mobile) */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost lg:hidden transition-colors duration-300 ${
                isScrolled ? "text-gray-800" : "text-gray-800"
              }`}
            >
              <svg
                className="h-5 w-5"
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
              className="menu menu-md font-semibold dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow text-[20px]"
            >
              {/* Mobile menu with dropdown menu added */}
              {links}
              {user ? (
                <>
                  <li>
                    <Link to="/dashboard/my-profile">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )}
            </ul>
          </div>

          <div
            className={`text-2xl font-bold transition-colors duration-300 ${logoColor}`}
          >
            <Logo />
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[18px]">{links}</ul>
        </div>

        {/* LogIn / Profile Dropdown / Application Button */}
        <div className="lg:navbar-end flex justify-center lg:justify-end gap-3 mt-3">
          {/* Application Scholarship Button */}
          {/* <Link
            to="/application-scholarship"
            className="font-normal border-2 hover:bg-transparent px-6 py-2 cursor-pointer rounded-lg bg-orange-600 hover:text-[#404040] transition-all duration-300 text-white border-orange-600 flex items-center"
          >
            <span className="font-bold">Application Scholarship</span>
          </Link> */}

          {/* User/Profile Dropdown or Login Button */}
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
                    className="rounded-full w-10 h-10 object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-[#0c5f5a]" />
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow text-base"
              >
                <li className="px-3 py-2 text-gray-700 font-semibold border-b">
                  {user.displayName || user.email}
                </li>
                <li>
                  <Link to="/dashboard/my-profile" className="justify-between">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/admin-addScholar">Admin Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className={`font-normal border-2 px-6 py-2 cursor-pointer rounded-lg hover:bg-[#0c5f5a] hover:text-white transition-all duration-300 ${loginButtonClasses}`}
            >
            <span className="font-bold">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
