import React from "react";
import Posts from "./Posts";
import PostShare from "./PostShare";

const MainSide = () => {
  return (
    <aside className="w-4/6 max-cusLg:w-full flex flex-col gap-4 h-[95svh] max-cusLg:h-[88svh] md:min-w-[520px] overflow-auto">
      <PostShare />
      <Posts />
    </aside>
  );
};

export default MainSide;
