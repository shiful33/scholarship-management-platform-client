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
      <div className="text-center p-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4">Fetching user role...</p>
      </div>
    );
  }


  return (
    <div className={`drawer ${isSidebarOpen ? "lg:drawer-open" : ""}`}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content text-primary font-semibold text-2xl">
        {/* Navbar */}
        <nav className="navbar w-full bg-orange-500 text-white shadow-xl">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <GiToggles className="text-2xl" />
          </label>

          <button
            onClick={handleSidebarToggle}
            className="btn btn-square btn-ghost hidden lg:flex mr-4"
            aria-label={isSidebarOpen ? "close sidebar" : "open sidebar"}
          >
            {isSidebarOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <GiToggles className="text-2xl" />
            )}
          </button>

          <div className="px-4 font-bold text-xl">{dashboardTitle}</div>
        </nav>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
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
