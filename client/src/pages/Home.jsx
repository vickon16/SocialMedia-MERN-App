import React from "react";

import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import MainSide from "../components/MainSide";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex gap-4">
        <LeftSide />
        <MainSide />
        <RightSide />
      </div>
    </>
  );
};

export default Home;
