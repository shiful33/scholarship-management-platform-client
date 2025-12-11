import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaUserCog, FaWpforms } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";


const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content text-primary font-semibold text-2xl">
        {/* Navbar */}
        <nav className="navbar w-full bg-[#c94e20] text-white text-2xl shadow-xl">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-bold text-base-300">Admin Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet />
        
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-[#0c5f5a] is-drawer-close:w-16 is-drawer-open:w-54">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-5 text-secondary"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden font-bold text-base-300">Home</span>
              </Link>
            </li>

            {/* Add Scholarship Links */}
            <li>
                <NavLink to="/add-scholarship" 
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Scholarships"
                ><MdOutlineAdminPanelSettings className="text-2xl text-secondary"/> 
                <span className="is-drawer-close:hidden font-bold text-base-300">Manage Scholarships</span>
                </NavLink>
            </li>

            {/* Manage Users Links */}
            <li>
                <NavLink to="/dashboard/manage-users" 
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Users"
                ><FaUserCog className="text-2xl text-secondary"/> 
                <span className="is-drawer-close:hidden font-bold text-base-300">Manage Users</span>
                </NavLink>
            </li>

            {/* Analytics Links */}
            <li>
                <NavLink to="/dashboard/analytics" 
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Analytics"
                ><SiGoogleanalytics className="text-2xl text-secondary"/> 
                <span className="is-drawer-close:hidden font-bold text-base-300">Analytics</span>
                </NavLink>
            </li>

            {/* My-Application Links */}
            <li>
                <NavLink to="/dashboard/my-applications" 
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Applications"
                ><FaWpforms className="text-2xl text-secondary"/> 
                <span className="is-drawer-close:hidden font-bold text-base-300">My Applications</span>
                </NavLink>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-6 text-secondary"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden  text-base-300 font-bold">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
