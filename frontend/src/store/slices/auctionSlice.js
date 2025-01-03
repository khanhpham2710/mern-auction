import axiosInstance from "@/utils/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidders: {},
    myAuctions: [],
    allAuctions: [],
  },
  reducers: {
    setLoadingTrue(state){
        state.loading= true
    },
    setLoadingFalse(state){
        state.loading = false
    },
    getAllAuctionItemSuccess(state, action) {
      state.loading = false;
      state.allAuctions = action.payload;
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = false;
      state.auctionDetail = action.payload.auctionItem;
      state.auctionBidders = action.payload.bidders;
    },
    getMyAuctionsRequest(state) {
      state.loading = true;
      state.myAuctions = [];
    },
    getMyAuctionsSuccess(state, action) {
      state.loading = false;
      state.myAuctions = action.payload;
    },
    getMyAuctionsFailed(state) {
      state.loading = false;
      state.myAuctions = [];
    },
  },
});

export const getAllAuctionItems = () => async (dispatch) => {
  dispatch(auctionSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.get(
      "/auctionitem/allitems",
      { withCredentials: true }
    );
    dispatch(
      auctionSlice.actions.getAllAuctionItemSuccess(response.data.items)
    );
  } catch (error) {
    dispatch(auctionSlice.actions.setLoadingFalse());
    console.error(error);
  }
};

export const getMyAuctionItems = () => async (dispatch) => {
  dispatch(auctionSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.get(
      "/auctionitem/myitems",
      { withCredentials: true }
    );
    dispatch(auctionSlice.actions.getMyAuctionsSuccess(response.data.items));
  } catch (error) {
    dispatch(auctionSlice.actions.getMyAuctionsFailed());
    console.error(error);
  }
};

export const getAuctionDetail = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.get(
      `/auctionitem/auction/${id}`,
      { withCredentials: true }
    );
    dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));
  } catch (error) {
    dispatch(auctionSlice.actions.setLoadingFalse());
    console.error(error);
  }
};

export const createAuction = (data) => async (dispatch) => {
  dispatch(auctionSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.post(
      "/auctionitem/create",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(auctionSlice.actions.setLoadingFalse());
    toast.success(response.data.message);
    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(auctionSlice.actions.setLoadingFalse());
    toast.error(error.response.data.message);
  }
};

export const republishAuction = (id, data) => async (dispatch) => {
  dispatch(auctionSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.put(
      `/auctionitem/item/republish/${id}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(auctionSlice.actions.setLoadingFalse());
    toast.success(response.data.message);
    dispatch(getMyAuctionItems());
    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(auctionSlice.actions.setLoadingFalse());
    toast.error(error.response.data.message);
    console.error(error.response.data.message);
  }
};

export const deleteAuction = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.delete(
      `/auctionitem/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(auctionSlice.actions.setLoadingFalse());
    toast.success(response.data.message);
    dispatch(getMyAuctionItems());
    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(auctionSlice.actions.setLoadingFalse());
    toast.error(error.response.data.message);
    console.error(error.response.data.message);
  }
};

export default auctionSlice.reducer;