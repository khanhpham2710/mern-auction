import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllAuctionItems } from "./auctionSlice";
import axiosInstance from "@/utils/axiosInstance";

const adminSlice = createSlice({
  name: "Admin",
  initialState: {
    loading: false,
    monthlyRevenue: [],
    totalAuctioneers: [],
    totalBidders: [],
    paymentProofs: [],
    singlePaymentProof: {},
  },
  reducers: {
    requestForMonthlyRevenue(state) {
      state.loading = true;
      state.monthlyRevenue = [];
    },
    successForMonthlyRevenue(state, action) {
      state.loading = false;
      state.monthlyRevenue = action.payload;
    },
    failedForMonthlyRevenue(state) {
      state.loading = false;
      state.monthlyRevenue = [];
    },
    requestForAllUsers(state) {
      state.loading = true;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    successForAllUsers(state, action) {
      state.loading = false;
      state.totalAuctioneers = action.payload.auctioneersArray;
      state.totalBidders = action.payload.biddersArray;
    },
    failureForAllUsers(state) {
      state.loading = false;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    requestForPaymentProofs(state) {
      state.loading = true;
      state.paymentProofs = [];
    },
    successForPaymentProofs(state, action) {
      state.loading = false;
      state.paymentProofs = action.payload;
    },
    failureForPaymentProofs(state) {
      state.loading = false;
      state.paymentProofs = [];
    },
    requestForSinglePaymentProofDetail(state) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    successForSinglePaymentProofDetail(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    failureForSinglePaymentProofDetail(state) {
      state.loading = false;
      state.singlePaymentProof = {};
    },
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
    clearAllErrors(state) {
      state.loading = false;
      state.singlePaymentProof = {};
    },
  },
});

export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForMonthlyRevenue());
  try {
    const response = await axiosInstance.get("admin/monthlyincome", {
      withCredentials: true,
    });
    dispatch(
      adminSlice.actions.successForMonthlyRevenue(
        response.data.totalMonthlyRevenue
      )
    );
  } catch (error) {
    dispatch(adminSlice.actions.failedForMonthlyRevenue());
    console.error(error.response.data.message);
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForAllUsers());
  try {
    const response = await axiosInstance.get(
      "admin/users/getall",
      { withCredentials: true }
    );
    dispatch(adminSlice.actions.successForAllUsers(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.failureForAllUsers());
    console.error(error.response.data.message);
  }
};

export const getAllPaymentProofs = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForPaymentProofs());
  try {
    const response = await axiosInstance.get(
      "admin/paymentproofs/getall",
      { withCredentials: true }
    );
    dispatch(
      adminSlice.actions.successForPaymentProofs(
        response.data.paymentProofs
      )
    );
  } catch (error) {
    dispatch(adminSlice.actions.failureForPaymentProofs());
    console.error(error.response.data.message);
  }
};

export const deletePaymentProof = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.delete(
      `admin/paymentproof/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(adminSlice.actions.setLoadingFalse());
    dispatch(getAllPaymentProofs());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(adminSlice.actions.setLoadingFalse());
    console.error(error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const getSinglePaymentProofDetail = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForSinglePaymentProofDetail());
  try {
    const response = await axiosInstance.get(
      `admin/paymentproof/${id}`,
      { withCredentials: true }
    );
    dispatch(
      adminSlice.actions.successForSinglePaymentProofDetail(
        response.data.paymentProofDetail
      )
    );
  } catch (error) {
    dispatch(adminSlice.actions.failureForSinglePaymentProofDetail());
    console.error(error.response.data.message);
  }
};

export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
  dispatch(adminSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.put(
      `admin/paymentproof/status/update/${id}`,
      { status, amount },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(adminSlice.actions.setLoadingFalse());
    toast.success(response.data.message);
    dispatch(getAllPaymentProofs());
    dispatch(adminSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(adminSlice.actions.setLoadingFalse());
    console.error(error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const deleteAuctionItem = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.setLoadingTrue());
  try {
    const response = await axiosInstance.delete(
      `admin/auctionitem/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(adminSlice.actions.setLoadingFalse());
    toast.success(response.data.message);
    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(adminSlice.actions.setLoadingFalse());
    console.error(error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const clearAllAdminSliceErrors = () => (dispatch) => {
  dispatch(adminSlice.actions.clearAllErrors());
};

export default adminSlice.reducer;
