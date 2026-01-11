import { createBrowserRouter, Route } from "react-router";
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
import ErrorPage from "../pages/ErrorPage";
import StudentProfile from "../pages/Dashboard/StudentProfile";
import ModeratorReview from "../components/Dashboard/Moderator/ModeratorReview";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/AdminHome";
import MyReviews from "../pages/Dashboard/MyReviews";
import EditReview from "../pages/Dashboard/EditReview";
import ManageScholarships from "../pages/ManageScholarships";
import ManageAppliedApplication from "../pages/Dashboard/ManageAppliedApplication";
import AdminReviews from "../pages/Dashboard/AdminReviews";
import About from "../pages/About";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import TermsOfUse from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import CookiePolicy from "../pages/CookiePolicy";

export const router = createBrowserRouter([
  // Main Layout
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-scholarships", element: <AllScholarships /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
      { path: "terms-of-use", element: <TermsOfUse /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "cookie-policy", element: <CookiePolicy /> },
      {
        path: "scholarship-details/:id",
        element: (
          <PrivateRoute>
            {" "}
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
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
      {
        path: "manageAppliedApplication",
        element: <ManageAppliedApplication />,
      },
      { path: "admin-reviews", element: <AdminReviews /> },
      { path: "edit-review", element: <EditReview /> },
      { path: "student-profile", element: <StudentProfile /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "my-applications", element: <MyApplications /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "edit-review/:id", element: <EditReview /> },
      { path: "moderator-review", element: <ModeratorReview /> },
      {
        path: "addScholarship",
        element: (
          <ModeratorRoute>
            <AddScholarship />
          </ModeratorRoute>
        ),
      },
      {
        path: "allScholarships",
        element: (
          <ModeratorRoute>
            <AllScholarships />
          </ModeratorRoute>
        ),
      },
      {
        path: "/dashboard/updateScholarship/:id",
        element: (
          <ModeratorRoute>
            <UpdateScholarship />
          </ModeratorRoute>
        ),
      },
      //  Admin Routes
      { path: "admin-addScholar", element: <AdminScholar /> },
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },

      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },

      { path: "addScholership", element: <AddScholarship /> },
      { path: "manage-scholarships", element: <ManageScholarships /> },
      {
        path: "updateScholarship/:id",
        element: <UpdateScholarship />,
        loader: ({ params }) =>
          fetch(
            `https://scholarship-management-platform-ser.vercel.app/scholarship/${params.id}`
          ),
      },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "analytics", element: <Analytics /> },
      { path: "student-profile", element: <StudentProfile /> },
    ],
  },

  // 404 Page
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
