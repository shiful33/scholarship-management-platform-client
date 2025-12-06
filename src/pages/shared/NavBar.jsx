import React from "react";
import { SiSemanticscholar } from "react-icons/si";
import Logo from "../../components/Logo";
import { NavLink } from "react-router";

const NavBar = () => {

    const links = <>
       <li><NavLink to="/">Home</NavLink></li>
       <li><NavLink to="/all-scholarships">All Scholarships</NavLink></li>
        
    </>

  return (
    <div>
      <div className="grid gap-3 lg:flex navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-md font-semibold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
            {links}
            </ul>
          </div>
        <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu  menu-lg text-[#606162] font-semibold menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar flex justify-center lg:justify-end gap-4">
          <button className="font-normal border-2 bg-transparent px-6 py-2 cursor-pointer  rounded-lg hover:bg-[#0c5f5a] hover:text-white transition-all duration-300 border-[#0c5f5a]">Student <span className="font-bold">Log In</span></button>
          <button className="font-normal border-2 hover:bg-transparent px-6 py-2 cursor-pointer  rounded-lg bg-[#c94e20] hover:text-[#404040] transition-all duration-300 text-white border-[#c94e20]">Student <span className="font-bold">Sign Up</span></button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
