import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import AllScholarships from "../pages/AllScholarships";
import AddScholarship from "../pages/AddScholarship";


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
    }
]);