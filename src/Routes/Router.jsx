import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/HomePage/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Error from "../Pages/Error/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../Pages/Rider/Rider.jsx";
import SendParcel from "../Pages/SendParcel/SendParcel.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels.jsx";
import Payment from "../Pages/Dashboard/Payment/Payment.jsx";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess.jsx";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled.jsx";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory.jsx";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders.jsx";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders.jsx";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries.jsx";
import RiderRoute from "./RiderRoute.jsx";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries.jsx";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack.jsx";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome.jsx";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                path: "/",
                Component: Home,
            },
            {
                path: "/aboutus",
                Component: AboutUs,
            },
            {
                path: "/coverage",
                Component: Coverage,
                loader: () => fetch('/serviceCenters.json').then(res => res.json()),
            },
            {
                path: "/parcel-track/:trackingId",
                Component: ParcelTrack
            },
            {
                path: "/rider",
                element: <PrivateRoutes><Rider /></PrivateRoutes>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json()),
            }, {
                path: "/send-parcel",
                element: <PrivateRoutes><SendParcel /></PrivateRoutes>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json()),
            },

            {
                path: "*",
                Component: Error,
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
            {
                path: 'my-parcels',
                Component: MyParcels,
            },
            {
                path: 'payment/:parcelId',
                Component: Payment,
            },
            {
                path: 'payment-history',
                Component: PaymentHistory,
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess,
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled,
            },

            //rider only routes
            {
                path: 'assigned-deliveries',
                element: <RiderRoute><AssignedDeliveries /></RiderRoute>,
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoute><CompletedDeliveries /></RiderRoute>,
            },

            //admin only routes
            {
                path: 'approve-riders',
                element: <AdminRoute><ApproveRiders /></AdminRoute>,
            },
            {
                path: 'assign-riders',
                element: <AdminRoute><AssignRiders /></AdminRoute>,
            },
            {
                path: 'users-management',
                element: <AdminRoute><UsersManagement /></AdminRoute>,
            }
        ]
    }

]);