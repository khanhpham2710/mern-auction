import AuctionCard from "@/components/AuctionCard";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <section className="my-8">
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Auctions
          </h1>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-2">
            {allAuctions?.map((element) => (
              <AuctionCard element={element} key={element._id} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Auctions;
