import { useSelector } from "react-redux";
import AuctionCard from "./AuctionCard";

const FeaturedAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  
  return (
    <>
      <section className="my-8 lg:px-5">
        <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          Featured Auctions
        </h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {allAuctions?.slice(0, 8).map((element) => {
            return (
              <AuctionCard
                element={element}
                key={element._id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FeaturedAuctions;