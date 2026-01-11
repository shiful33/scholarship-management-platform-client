import { Link, NavLink } from "react-router-dom";
import {
  FaUser,
  FaPlusCircle,
  FaList,
  FaHome,
  FaChartBar,
  FaUsersCog,
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const menuItems = {
    admin: [
      { name: "Dashboard Home", path: "/dashboard", icon: <FaChartBar /> },
      {
        name: "Manage Users",
        path: "/dashboard/manage-users",
        icon: <FaUsersCog />,
      },
      {
        name: "Add Scholarship",
        path: "/dashboard/add-scholarship",
        icon: <FaPlusCircle />,
      },
      {
        name: "Manage Applications",
        path: "/dashboard/manage-applications",
        icon: <FaList />,
      },
    ],
    manager: [
      { name: "Dashboard Home", path: "/dashboard", icon: <FaChartBar /> },
      {
        name: "Pending Scholarships",
        path: "/dashboard/pending",
        icon: <FaList />,
      },
      {
        name: "Add Scholarship",
        path: "/dashboard/add-scholarship",
        icon: <FaPlusCircle />,
      },
    ],
    user: [
      { name: "My Profile", path: "/dashboard/my-profile", icon: <FaUser /> },
      {
        name: "My Applications",
        path: "/dashboard/my-applications",
        icon: <FaList />,
      },
    ],
  };

  const currentMenu = menuItems[role] || menuItems["user"];

  return (
    <div className="w-64 min-h-screen border-r border-gray-200 bg-base-200 text-base-content dark:border-gray-700">
      <div className="p-6 text-2xl font-bold border-b border-gray-200 dark:border-gray-700">
        <span className="text-teal-600">Scholar</span>Dash
      </div>
      <ul className="gap-2 p-4 menu">
        {currentMenu.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-teal-500 text-white shadow-md"
                    : "hover:bg-teal-100 dark:hover:bg-gray-700"
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          </li>
        ))}
        <div className="opacity-50 divider"></div>
        <li>
          <Link
            to="/"
            className="flex items-center gap-3 p-3 transition-all rounded-lg hover:bg-teal-100 dark:hover:bg-gray-700"
          >
            <FaHome /> Back to Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
