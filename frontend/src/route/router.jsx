import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
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
import BidderRegister from "@/pages/auth/BidderRegister";
import AuctioneerRegister from "@/pages/auth/AuctioneerRegister";
import Login from "@/pages/auth/Login";
import HowItWorks from "@/pages/HowItWorks";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";

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
      },
      {
        path: "/how-it-works-info",
        element: <HowItWorks />
      },
      {
        path: "/about",
        element: <AboutUs />
      },
      {
        path:"/contact",
        element: <Contact />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "auctioneer/sign-up",
        element: <AuctioneerRegister />
      },
      {
        path: "bidder/sign-up",
        element: <BidderRegister />
      },
      {
        path: "login",
        element: <Login />
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
