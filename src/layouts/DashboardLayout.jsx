import { GiToggles } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import useRole from "../hooks/useRole";


const DashboardLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { role, isRoleLoading } = useRole();

  const dashboardTitle = 
  role === "admin" ? "Admin Dashboard" : 
  role === "moderator" ? "Moderator Dashboard" : 
  role === "student" ? "Student Dashboard" : 
  "User Dashboard";

  if (isRoleLoading) {
    return (
      <div className="p-20 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4">Fetching user role...</p>
      </div>
    );
  }


  return (
    <div className={`drawer ${isSidebarOpen ? "lg:drawer-open" : ""}`}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="text-2xl font-semibold drawer-content text-primary">
        {/* Navbar */}
        <nav className="w-full text-white bg-orange-500 shadow-xl navbar">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <GiToggles className="text-2xl" />
          </label>

          <button
            onClick={handleSidebarToggle}
            className="hidden mr-4 btn btn-square btn-ghost lg:flex"
            aria-label={isSidebarOpen ? "close sidebar" : "open sidebar"}
          >
            {isSidebarOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <GiToggles className="text-2xl" />
            )}
          </button>

          <div className="px-4 text-xl font-bold">{dashboardTitle}</div>
        </nav>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>

      <div className="z-50 drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div
          className={`min-h-full bg-[#0c5f5a] ${
            isSidebarOpen ? "w-64" : "lg:w-0 w-64"
          }`}
        >
          <DashboardSidebar role={role} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
