import AuctionCard from "@/components/AuctionCard";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated, navigateTo]);

  return (
    <>
      <div className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
        <h1 className="text-[#d6482b] text-2lg font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-4xl 2xl:text-6xl">
          My Auctions
        </h1>
        {loading ? (
          <Loader2 />
        ) : (
          <div
            className={`${
              myAuctions.length > 2 && "flex-grow"
            } flex flex-wrap gap-6`}
          >
            {myAuctions.length > 0 ? (
              myAuctions?.map((element) => {
                return <AuctionCard element={element} key={element._id} />;
              })
            ) : (
              <h3 className="text-[#666] text-xl font-semibold mb-2 min-[480px]:text-xl lg:text-2xl mt-5">
                You have not posted any auction.
              </h3>
            )}{" "}
            :
          </div>
        )}
      </div>
    </>
  );
};

export default MyAuctions;
