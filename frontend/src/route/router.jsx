import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import Auth from "@/pages/Auth";

const router = createBrowserRouter([
  {
      path : "/",
      element : <MainLayout />,
      children : [
          {
              path : "",
              element : <Home />
          },
          {
            path: "auth",
            element: <Auth />
          },
      ]
  }
])

export default router;