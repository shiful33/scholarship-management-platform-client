import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaTimes, FaUserCog, FaWpforms } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";



import useRole from "../hooks/useRole";
import LoadingPage from "../pages/LoadingPage";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import { GiToggles } from "react-icons/gi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) {
        return <LoadingPage message="Authenticating user role..." />;
    }

  const dashboardTitle = role.charAt(0).toUpperCase() + role.slice(1) + " Dashboard";

  const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


  return (
    <div className={`drawer ${isSidebarOpen ? 'lg:drawer-open' : ''}`}> 

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

                    {isSidebarOpen && (
                        <button
                            onClick={handleSidebarToggle}
                            className="btn btn-square btn-ghost hidden lg:flex mr-4" 
                            aria-label="close sidebar"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    )}
                    
                    {!isSidebarOpen && (
                         <button
                            onClick={handleSidebarToggle}
                            className="btn btn-square btn-ghost hidden lg:flex mr-4"
                            aria-label="open sidebar"
                        >
                            <GiToggles className="text-2xl" /> 
                        </button>
                    )}


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
 
                <div className={`min-h-full bg-[#0c5f5a] ${isSidebarOpen ? 'w-64' : 'lg:w-0 w-64'}`}> 
                    {isSidebarOpen && <DashboardSidebar role={role} />} 
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
