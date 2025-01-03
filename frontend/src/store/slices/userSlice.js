import axiosInstance from "@/utils/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    requestState(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    requestFailed(state){
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    verifySuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state) {
      state.loading = false;
    },
    fetchLeaderboardRequest(state) {
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderboardFailed(state) {
      state.loading = false;
      state.leaderboard = [];
    },
    clearAllErrors(state) {
      state.loading = false;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.requestState());

  try {
    const response = await axiosInstance.post(`/user/register`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());

    return response;
  } catch (error) {
    dispatch(userSlice.actions.requestFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const verify = (data) => async (dispatch) => {
  dispatch(userSlice.actions.requestState());
  try {
    const response = await axiosInstance.post("/user/otp-verification", data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch(userSlice.actions.verifySuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.requestFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const resendOTP = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/user/resend-otp", data, {
      headers: { "Content-Type": "application/json" },
    });
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      "/user/forgot",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());

  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      `/user/password/reset/${data.token}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());

    return response;

  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
}

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.requestState());
  try {
    const response = await axiosInstance.post(`/user/login`, data, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.requestFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/user/logout`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.requestState());
  try {
    const response = await axiosInstance.get("/user/me", {
      withCredentials: true,
    });

    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.requestFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const response = await axiosInstance.get("/user/leaderboard", {
      withCredentials: true,
    });

    dispatch(
      userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard)
    );
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};

export default userSlice.reducer;
