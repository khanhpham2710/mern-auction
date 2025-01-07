import Header from "./Header";
import Footer from "./Footer";
import SideDrawer from "./SideDrawer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <SideDrawer />
      <Header />
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default MainLayout;
