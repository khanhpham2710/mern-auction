import DeleteAuctionDrawer from "@/components/DeleteAuctionDrawer";
import RepublishAuctionDrawer from "@/components/RepublishAuctionDrawer";
import useTimeLeft, { formatTimeLeft } from "@/lib/useTimeLeft";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [openRepublishDrawer, setOpenRepublishDrawer] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [dispatch, id, isAuthenticated, navigateTo, user.role]);

  const timeLeft = useTimeLeft(auctionDetail.startTime, auctionDetail.endTime);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
        <div className="text-[16px] flex flex-wrap gap-2 items-center">
          <Link
            to="/"
            className="font-semibold transition-all duration-300 hover:text-[#D6482B]"
          >
            Home
          </Link>
          <FaGreaterThan className="text-stone-400" />
          <Link
            to={"/view-my-auctions"}
            className="font-semibold transition-all duration-300 hover:text-[#D6482B]"
          >
            My Auctions
          </Link>
          <FaGreaterThan className="text-stone-400" />
          <p className="text-stone-600">{auctionDetail.title}</p>
        </div>
        {loading ? (
          <Loader2 />
        ) : (
          <div className="flex gap-4 flex-col 2xl:flex-row">
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex gap-4 flex-col lg:flex-row">
                <div className="bg-white w-[100%] lg:w-40 lg:h-40 flex justify-center items-center p-5">
                  <img
                    src={auctionDetail.image?.url}
                    alt={auctionDetail.title}
                  />
                </div>
                <div className="flex flex-col justify-around pb-4">
                  <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                    {auctionDetail.title}
                  </h3>
                  <div className="flex gap-20">
                    <div>
                      <p className="text-xl font-semibold">
                        Condition:{" "}
                        <span className="text-primary">
                          {auctionDetail.condition}
                        </span>
                      </p>
                      <p className="text-xl font-semibold">
                        Minimum Bid:{" "}
                        <span className="text-primary">
                          Rs.{auctionDetail.startingBid}
                        </span>
                      </p>
                      <p className="text-xl font-semibold">
                        {timeLeft.type}
                        {Object.keys(timeLeft).length > 1 ? (
                          <span className="text-primary font-bold ml-1">
                            {formatTimeLeft(timeLeft)}
                          </span>
                        ) : (
                          <span className="text-primary font-bold ml-1">
                            Time&apos;s up!
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <DeleteAuctionDrawer id={id} />
                      {new Date(auctionDetail.endTime) < Date.now() && <button
                        disabled={new Date(auctionDetail.endTime) > Date.now()}
                        onClick={() => setOpenRepublishDrawer(true)}
                        className="bg-sky-400 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-sky-700"
                      >
                        Republish Auction
                      </button>}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xl w-fit font-bold">
                Auction Item Description
              </p>
              <hr className="my-2 border-t-[1px] border-t-stone-700" />
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((element, index) => {
                  return (
                    <li key={index} className="text-[18px] my-2">
                      {element}
                    </li>
                  );
                })}
            </div>
            <div className="flex-1 border-black border-2 mb-10">
              <header className="bg-stone-200 py-4 text-[24px] font-semibold px-4 border-b-2 border-black">
                BIDS
              </header>
              <div className="bg-white px-4 min-h-[100px] relative">
                {auctionBidders &&
                auctionBidders.length > 0 &&
                new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now() ? (
                  auctionBidders.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className="py-2 flex items-center justify-between"
                      >
                        <div className="flex flex-1 items-center gap-4">
                          <img
                            src={element.profileImage || "/imageHolder.jpg"}
                            alt={element.userName}
                            className="w-12 h-12 rounded-full my-2 hidden md:block"
                          />
                          <p className="text-[18px] font-semibold">
                            {element.userName}
                          </p>
                        </div>
                        <p className="flex-1 text-center">{element.amount}</p>
                        {index === 0 ? (
                          <p className="text-[20px] font-semibold text-green-600 flex-1 text-end">
                            1st
                          </p>
                        ) : index === 1 ? (
                          <p className="text-[20px] font-semibold text-blue-600 flex-1 text-end">
                            2nd
                          </p>
                        ) : index === 2 ? (
                          <p className="text-[20px] font-semibold text-yellow-600 flex-1 text-end">
                            3rd
                          </p>
                        ) : (
                          <p className="text-[20px] font-semibold text-gray-600 flex-1 text-end">
                            {index + 1}th
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : Date.now() < new Date(auctionDetail.startTime) ? (
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Auction not started</p>
                ) : (
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Auction ended</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <RepublishAuctionDrawer
        id={id}
        openDrawer={openRepublishDrawer}
        setOpenDrawer={setOpenRepublishDrawer}
      />
    </>
  );
};

export default ViewAuctionDetails;
