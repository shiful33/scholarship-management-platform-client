import React from "react";
import { Link, NavLink } from "react-router";
import {
  MdOutlineAdminPanelSettings,
  MdManageAccounts,
  MdOutlineReviews,
} from "react-icons/md";
import {
  FaUserCog,
  FaWpforms,
  FaTasks,
  FaHistory,
  FaPlusSquare,
} from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

const getSidebarLinks = (role) => {
  switch (role) {
    case "admin":
      return (
        <>
          <SidebarLink to="/dashboard/add-scholarship" icon={FaPlusSquare}>
            Add Scholarship
          </SidebarLink>
          <SidebarLink
            to="/dashboard/manage-scholarships"
            icon={MdOutlineAdminPanelSettings}
          >
            Manage Scholarships
          </SidebarLink>
          <SidebarLink to="/dashboard/manage-users" icon={FaUserCog}>
            Manage Users
          </SidebarLink>
          <SidebarLink to="/dashboard/analytics" icon={SiGoogleanalytics}>
            Analytics
          </SidebarLink>
        </>
      );
    case "moderator":
      return (
        <>
          <SidebarLink to="/dashboard/manage-applications" icon={FaTasks}>
            Manage Applications
          </SidebarLink>
          <SidebarLink to="/dashboard/all-reviews" icon={MdOutlineReviews}>
            All Reviews
          </SidebarLink>
        </>
      );
    case "student":
      return (
        <>
          <SidebarLink to="/dashboard/my-applications" icon={FaWpforms}>
            My Applications
          </SidebarLink>
          <SidebarLink to="/dashboard/my-reviews" icon={MdOutlineReviews}>
            My Reviews
          </SidebarLink>
          {/* Add Review link will be conditionally shown in My Applications table */}
        </>
      );
    default:
      return null;
  }
};

const SidebarLink = ({ to, icon: Icon, children }) => {
  const defaultClasses =
    "p-4 text-white hover:bg-teal-700 transition duration-200 flex items-center space-x-3";
  const activeClasses = "bg-teal-700 font-bold";

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${defaultClasses} ${isActive ? activeClasses : "font-medium"}`
        }
      >
        <Icon className="text-2xl text-white" />
        <span>{children}</span>
      </NavLink>
    </li>
  );
};

const DashboardSidebar = ({ role }) => {
  const sidebarLinks = getSidebarLinks(role);

  return (
    <div className="flex min-h-full flex-col items-start bg-[#0c5f5a] w-64">
      <h1 className="text-2xl font-extrabold text-white p-4 w-full text-center border-b border-teal-700">
        {role.charAt(0).toUpperCase() + role.slice(1)} Menu
      </h1>

      <ul className="menu w-full grow text-base">
        {sidebarLinks}

        <div className="divider text-teal-300 mx-4 my-2"></div>

        <SidebarLink to="/dashboard/my-profile" icon={MdManageAccounts}>
          My Profile
        </SidebarLink>
        <SidebarLink to="/" icon={FaHistory}>
          Go Home
        </SidebarLink>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
