import FeaturedAuctions from "@/components/FeatureAuctions";
import Leaderboard from "@/components/Leaderboard";
import UpcomingAuctions from "@/components/UpcomingAuctions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <div>
        <h1
          className={`text-[#111] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl text-center`}
        >
          Transparent Auctions
        </h1>
        <div className="flex gap-4 my-8 justify-center">
          {!isAuthenticated && (
            <>
              <Link
                to="/auth/auctioneer/sign-up"
                className="bg-primary font-semibold hover:bg-primary-800 rounded-md px-8 flex items-center py-2 text-white transition-all duration-300"
              >
                Become an auctioneer
              </Link>
              <Link
                to={"/auth/bidder/sign-up"}
                className="bg-primary font-semibold hover:bg-primary-800 rounded-md px-8 flex items-center py-2 text-white transition-all duration-300"
              >
                Become an bidder
              </Link>
              <Link
                to={"/auth/login"}
                className="text-[#DECCBE] bg-transparent border-[#DECCBE] border-2 hover:bg-[#fffefd] hover:text-[#fdba88] font-bold text-xl py-1 px-4 rounded-md"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl text-center">
          How it works
        </h3>
        <div className="flex flex-col justify-center gap-4 md:flex-row md:flex-wrap w-full">
          {howItWorks.map((element) => {
            return (
              <div
                key={element.title}
                className="bg-white flex flex-col gap-2 p-2 rounded-md h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] hover:shadow-md transition-all duration-300"
              >
                <h5 className="font-bold">{element.title}</h5>
                <p>{element.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
    </>
  );
};

export default Home;
