import React from "react";
import FollowersCard from "./FollowersCard";
import InfoCard from "./InfoCard";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const ProfileLeft = ({user}) => {
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col gap-4 overflow-auto cusLg:w-1/4 cusLg:min-w-[280px] ">
      <button className="px-3 py-1 flex items-center gap-x-1 group w-fit" onClick={() => navigate(-1)}>
        <MdArrowBack size={25} className="group-hover:scale-110" /> Back
      </button>
      <InfoCard user={user} />
      <FollowersCard user={user} />
      <Logout />
    </aside>
  );
};

export default ProfileLeft;
