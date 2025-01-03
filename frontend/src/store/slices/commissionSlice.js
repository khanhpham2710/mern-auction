import axiosInstance from "@/utils/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
    dispatch(commissionSlice.actions.setLoadingTrue());
    try {
      const response = await axiosInstance.post(
        "/commission/proof",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(commissionSlice.actions.setLoadingFalse());
      toast.success(response.data.message);
    } catch (error) {
      dispatch(commissionSlice.actions.setLoadingFalse());
      toast.error(error.response.data.message);
    }
  };
  
  export default commissionSlice.reducer;