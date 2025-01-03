import Header from "./Header";
import Footer from "./Footer";
import SideDrawer from "./SideDrawer";
import { Outlet } from "react-router-dom";

function MainLayout() {

  return (
    <>
    <SideDrawer />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
