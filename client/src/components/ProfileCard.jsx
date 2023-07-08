import React from "react";
import Cover from "../img/cover.jpg";
import Avatar from "../img/avatar.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  const { user, userPosts } = useSelector((state) => state.user);

  return (
    <section className="rounded-[1rem] overflow-x-clip flex flex-col bg-cardColor shadow w-full">
      <div className="relative flex_center flex-col">
        <img src={user?.coverPicture || Cover} alt="profile-img" className="w-full object-cover" />
        <Link to={`profile/${user?._id}`} className="absolute bottom-[-2rem] w-16 h-16 rounded-full overflow-hidden">
          <img
            src={user?.profilePicture || Avatar}
            alt="profile-img"
            className="w-full shadow-md object-cover"
          />
        </Link>
      </div>

      <div className="flex flex-col items-center mt-11 gap-1">
        <span className="font-bold text-clampSm">{user?.username}</span>
        <span className="text-clamp2Xs text-gray-400">{user?.email}</span>
        <span className="text-clamp2Xs text-gray-500">
          {user?.worksAt || "- - - -"}
        </span>
      </div>

      <div className="flex_center flex-col m-4 gap-3">
        <hr className="w-[85%] border border-gray-200" />

        <div className="flex items-center justify-around w-[85%] gap-4">
          <div className="flex_center flex-col gap-1">
            <span className="font-bold text-clampXs">
              {typeof user?.following.length === "number"
                ? user.following.length
                : "---"}
            </span>
            <span className="text-clamp2Xs text-gray-500">Following</span>
          </div>

          <div className="h-full border-l border-gray-200"></div>

          <div className="flex_center flex-col gap-1">
            <span className="font-bold text-clampXs">
              {typeof user?.following.length === "number"
                ? user.followers.length
                : "---"}
            </span>
            <span className="text-clamp2Xs text-gray-500">Followers</span>
          </div>

          <div className="h-full border-l border-gray-200"></div>

          <div className="flex_center flex-col gap-1">
            <span className="font-bold text-clampXs">{userPosts.overallPostLength}</span>
            <span className="text-clamp2Xs text-gray-500">Posts</span>
          </div>
        </div>
      </div>

      <hr className="w-[85%] border border-gray-200" />
      <Link to={`/profile/${user?._id}`} className="underline text-customGradient2 underline-offset-2 font-semibold text-center p-3">
        My Profile
      </Link>
    </section>
  );
};

export default ProfileCard;
