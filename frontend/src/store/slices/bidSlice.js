import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAuctionDetail } from "./auctionSlice";
import axiosInstance from "@/utils/axiosInstance";

const bidSlice = createSlice({
  name: "bid",
  initialState: {
    loading: false,
  },
  reducers: {
    bidRequest(state) {
      state.loading = true;
    },
    bidFinished(state) {
      state.loading = false;
    },
  },
});

export const placeBid = (id, data) => async (dispatch) => {
  dispatch(bidSlice.actions.bidRequest());
  try {
    const response = await axiosInstance.post(`/bid/place/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(bidSlice.actions.bidFinished());
    toast.success(response.data.message);
    dispatch(getAuctionDetail(id))
  } catch (error) {
    dispatch(bidSlice.actions.bidFinished());
    toast.error(error.response.data.message);
  }
};

export default bidSlice.reducer