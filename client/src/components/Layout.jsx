import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="overflow-hidden text-customBlack bg-BgWhite sm:p-4 w-full min-h-[100svh] relative">
      <div className="custom-blur top-[-10%] right-5 max-xl:hidden"></div>
      <div className="custom-blur top-[36%] left-[-8rem] max-xl:hidden"></div>

      <main className="w-full h-full max-w-[1500px] mx-auto z-[1] relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
