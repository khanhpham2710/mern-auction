import {
  clearAllAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AuctionItemDelete from "@/components/AuctionItemDelete";
import PaymentGraph from "@/components/PaymentGraph";
import BiddersAuctioneersGraph from "@/components/BidderAuctioneersGraph";
import PaymentProofs from "@/components/PaymentProof";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllAdminSliceErrors());
  }, [dispatch]);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user.role !== "Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo, user.role]);

  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <>
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Dashboard
          </h1>
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                Monthly Total Payments Received
              </h3>
              <PaymentGraph />
            </div>
            <div>
              <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                Users
              </h3>
              <BiddersAuctioneersGraph />
            </div>
            <div>
              <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                Payment Proofs
              </h3>
              <PaymentProofs />
            </div>
            <div>
              <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                Delete Items From Auction
              </h3>
              <AuctionItemDelete />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
