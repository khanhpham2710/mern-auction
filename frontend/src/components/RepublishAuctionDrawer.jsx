import { republishAuction } from "@/store/slices/auctionSlice";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";

const RepublishAuctionDrawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector((state) => state.auction);
  const handleRepbulishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed ${
        openDrawer && id ? "bottom-0" : "-bottom-full"
      }  left-0 w-full transition-all duration-300 h-full bg-[#00000087] flex items-end`}
    >
      <div className="bg-white h-fit transition-all duration-300 w-full">
        <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
          <h3 className="text-[#D6482B]  text-3xl font-semibold text-center mb-1">
            Republish Auction
          </h3>
          <p className="text-stone-600">
            Let&apos;s republish auction with same details but new starting and
            ending time.
          </p>
          <form className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-stone-600">
                Republish Auction Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h,mm aa"}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-stone-600">
                Republish Auction End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h,mm aa"}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
              />
            </div>
            <div>
              <button
                type="button"
                className="bg-blue-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
                onClick={handleRepbulishAuction}
              >
                {loading ? "Republishing" : "Republish"}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="bg-yellow-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-yellow-700"
                onClick={() => setOpenDrawer(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RepublishAuctionDrawer;
