import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import AllScholarships from "../pages/AllScholarships";
import AddScholarship from "../pages/AddScholarship";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminScholar from "../pages/AdminDashboard/AdminScholar";
import UpdateScholarship from "../pages/AdminDashboard/UpdateScholarship";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import Analytics from "../pages/AdminDashboard/Analytics";
import Checkout from "../components/Checkout";
import MyApplications from "../pages/AdminDashboard/MyApplications";
import MyProfile from "../pages/AdminDashboard/MyProfile";

export const router = createBrowserRouter([
  // Main Layout
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-scholarships", element: <AllScholarships /> },
      { path: "scholarship-details/:id", element: <ScholarshipDetails /> },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "add-scholarship",
        element: (
          <PrivateRoute>
            <AddScholarship />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Auth Layout
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // Dashboard (Private)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <MyProfile /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "my-applications", element: <MyApplications /> },
      { path: "admin-addScholar", element: <AdminScholar /> },
      { path: "update-scholarship/:id", element: <UpdateScholarship /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "analytics", element: <Analytics /> },
    ],
  },

  // 404 Page
  {
    path: "*",
    element: (
      <div className="text-center py-32 text-4xl font-bold text-red-600">
        404 - Page Not Found
      </div>
    ),
  },
]);