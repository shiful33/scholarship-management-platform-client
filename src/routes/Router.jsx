import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import AllScholarships from "../pages/AllScholarships";
import AddScholarship from "../pages/AddScholarship";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminScholar from "../pages/AdminDashboard/AdminScholar";
import UpdateScholarship from "../pages/AdminDashboard/UpdateScholarship";
import MyProfile from "../pages/AdminDashboard/MyProfile";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import Analytics from "../pages/AdminDashboard/Analytics";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/all-scholarships",
                element: <AllScholarships />
            },
            {
                path: "/add-scholarship",
                element: <PrivateRoute>
                    <AddScholarship />
                </PrivateRoute>
            },
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login,
            },
            {
                path: "register",
                Component: Register,
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
           {
                path: "admin-addScholar",
                Component: AdminScholar
           },
           {
                path: "update-scholarship/:id", 
                element: <UpdateScholarship />
            },
            {
                path: "my-profile",
                element: <MyProfile />
            },
            {
                path: "manage-users",
                element: <ManageUsers />    
            },
            {
                path: "analytics",
                element: <Analytics />    
            },
        ]
    }
]);