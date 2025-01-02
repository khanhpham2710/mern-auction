import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import { RouterProvider } from "react-router-dom";
import router from "./route/router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    // dispatch(getAllAuctionItems());
    // dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
