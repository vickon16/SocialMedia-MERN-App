import React from "react";
import Cover from "../img/cover.jpg";
import Avatar from "../img/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { getUserPostsQuery } from "../api/requests";

const ProfileRight = ({ user }) => {
  const { isLoading, data: userPosts } = useQuery({
    enabled: user !== null,
    queryKey: ["posts", "user", `${user?._id}`],
    queryFn: () => getUserPostsQuery(user?._id),
  });

  return (
    <aside className="flex flex-col gap-4 overflow-auto cusLg:w-3/4">
      <section className="sm:rounded-tl-[1rem] sm:rounded-tr-[1rem] overflow-x-clip flex flex-col bg-cardColor shadow w-full">
        <div className="relative flex_center flex-col mb-14">
          <img
            src={user?.coverPicture || Cover}
            alt="profile-img"
            className="object-cover h-[200px] w-full"
          />
          <div className="absolute w-full left-0 bottom-[-2rem] flex items-center gap-4 px-2">
            <div className="w-20 h-20 rounded-full shadow-md overflow-hidden">
              <img
                src={user?.profilePicture || Avatar}
                alt="profile-img"
                className=" object-cover w-full"
              />
            </div>
            <div className="bg-white p-4 w-full max-w-[15rem] rounded">
              <h2 className="text-customGradient2 font-semibold text-clampSm mb-1">
                {user?.username}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col m-4 gap-3">
          <hr className="w-[50%] border border-gray-100" />

          <div className="flex items-center justify-around w-fit gap-4">
            <div className="flex_center flex-col gap-1 px-3 py-1">
              <span className="font-bold text-clampSm">
                {typeof user?.following.length === "number"
                  ? user.following.length
                  : "---"}
              </span>
              <span className="text-clamp2Xs text-gray-500">Following</span>
            </div>

            <div className="h-full border-l border-gray-200"></div>

            <div className="flex_center flex-col gap-1 px-3 py-1">
              <span className="font-bold text-clampSm">
                {typeof user?.following.length === "number"
                  ? user.followers.length
                  : "---"}
              </span>
              <span className="text-clamp2Xs text-gray-500">Followers</span>
            </div>

            <div className="h-full border-l border-gray-200"></div>

            <div className="flex_center flex-col gap-1 px-3 py-1">
              {isLoading ? (
                <span className="w-[20px] h-[25px] bg-gray-300"></span>
              ) : (
                <span className="font-bold text-clampSm">
                  {userPosts?.data?.length}
                </span>
              )}
              <span className="text-clamp2Xs text-gray-500">Posts</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="p-4 bg-cardColor shadow-sm">
        <h2 className="text-gray-600 font-semibold text-clampSm mb-4 mt-2">
          About
        </h2>

        <article className="text-gray-600">
          {user?.about || <p className="text-gray-400">No about</p>}
        </article>
      </section>
    </aside>
  );
};

export default ProfileRight;
