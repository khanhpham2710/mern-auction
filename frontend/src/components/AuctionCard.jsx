import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RepublishAuctionDrawer from "./RepublishAuctionDrawer";
import DeleteAuctionDrawer from "./DeleteAuctionDrawer";
import { Card, CardContent } from "./ui/card";
import useTimeLeft, { formatTimeLeft } from "@/lib/useTimeLeft";
import { toast } from "react-toastify";

function AuctionCard({ element }) {
  const { user, isAuthenticated } = useSelector((store) => store.user);
  
  const handleView = () => {
    if (!isAuthenticated){
      toast.warning("Please login");
    }
  }

  const {
    title,
    startTime,
    endTime,
    startingBid,
    createdBy,
    _id: id,
  } = element;
  const imgSrc = element.image?.url;

  const timeLeft = useTimeLeft(startTime,endTime)

  const [openRepublishDrawer, setOpenRepublishDrawer] = useState(false);

  return (
    <>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h5 className="font-semibold text-[18px] group-hover:text-[#d6482b] mb-2">
            {title}
          </h5>
          {startingBid && (
            <p className="text-stone-600 font-light">
              Starting Bid:{" "}
              <span className="text-[#fdba88] font-bold ml-1">
                {startingBid}
              </span>
            </p>
          )}
          <p className="text-stone-600 font-light">
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-[#fdba88] font-bold ml-1">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-[#fdba88] font-bold ml-1">
                Time&apos;s up!
              </span>
            )}
          </p>
          <div className="flex flex-col gap-2 mt-4 flex-1 justify-end">
            <Link
              className="bg-stone-700 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-black"
              onClick={handleView}
              to={
                createdBy == user._id
                  ? `/auction/details/${id}`
                  : `/auction/item/${id}`
              }
            >
              View Auction
            </Link>
            {createdBy == user._id && (
              <>
                <DeleteAuctionDrawer id={id}/>
                {new Date(endTime) < Date.now() && <button
                  disabled={new Date(endTime) > Date.now()}
                  onClick={() => setOpenRepublishDrawer(true)}
                  className="bg-sky-400 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-sky-700"
                >
                  Republish Auction
                </button>}
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <RepublishAuctionDrawer
        id={id}
        openDrawer={openRepublishDrawer}
        setOpenDrawer={setOpenRepublishDrawer}
      />
    </>
  );
}

export default AuctionCard;
