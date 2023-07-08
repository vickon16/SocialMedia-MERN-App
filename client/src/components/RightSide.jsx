import React, { useState } from "react";
import { MdSettings, MdHome, MdComment, MdNotifications } from "react-icons/md";
import TrendCard from "./TrendCard";
import ShareModal from "./ShareModal";

const RightSide = ({type}) => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <aside className={`w-1/6 ${type === "mobile" ? "xl:hidden" : "max-xl:hidden"} md:min-w-[300px] flex flex-col gap-5`}>
      <div className="mt-4 flex_between w-[80%] mx-auto">
        <MdHome className="svg-style" />
        <MdSettings className="svg-style" />
        <MdNotifications className="svg-style" />
        <MdComment className="svg-style" />
      </div>

      <TrendCard />

      <button
        className="btn-gradient w-[60%] mx-auto items-center py-2"
        onClick={() => setModalOpened(true)}
      >
        Share
      </button>

      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </aside>
  );
};

export default RightSide;
