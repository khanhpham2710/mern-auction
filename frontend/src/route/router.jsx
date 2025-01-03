import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import RegisterAndSignIn from "@/pages/auth/RegisterAndSignIn";
import OtpVerification from "@/pages/auth/OtpVerification";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Auth from "@/layout/Auth";
import Auctions from "@/pages/Auctions";
import Leaderboard from "@/pages/Leaderboard";
import SubmitCommission from "@/pages/SubmitCommision";
import CreateAuction from "@/pages/CreateAuction";
import UserProfile from "@/pages/UserProfile";
import MyAuctions from "@/pages/MyAuctions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/auctions",
        element: <Auctions />
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />
      },
      {
        path: "/submit-commission",
        element: <SubmitCommission />
      },
      {
        path: "create-auction",
        element: <CreateAuction />
      },
      {
        path: "/me",
        element: <UserProfile />
      },
      {
        path: "/view-my-auctions",
        element: <MyAuctions />
      }
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <RegisterAndSignIn />
      },
      {
        path: "otp-verification/:email/:phone",
        element : <OtpVerification />
      },
      {
        path:"password/forgot", 
        element:<ForgotPassword />
      },
      {
        path:"password/reset/:token", 
        element:<ResetPassword />
      }
    ]
  },
]);

export default router;
