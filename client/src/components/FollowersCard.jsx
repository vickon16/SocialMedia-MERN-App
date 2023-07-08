import React from "react";
import FollowCardLoader from "./Loaders/FollowCardLoader";
import { useQuery } from "@tanstack/react-query";
import {followUserRequest, getUserFollowers, unFollowUserRequest } from "../api/requests";
import Avatar from "../img/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../store/userSlice";
import { Link } from "react-router-dom";

const FollowersCard = ({user}) => {
  const currentUser = useSelector(state=> state.user.user);
  const dispatch = useDispatch();

  const { isLoading, data: followers } = useQuery({
    enable : user !== null,
    queryKey: ["currentuser", "followers", `${user?._id}`],
    queryFn: () => getUserFollowers(user?._id),
  });

  const handleUnfollow = (userId) => {
    unFollowUserRequest(userId)
    dispatch(unfollowUser(userId))
  }

  const handleFollow = (userId) => {
    followUserRequest(userId)
    dispatch(followUser(userId))
  }

  return (
    <div className="w-full rounded gap-4 flex flex-col">
      <h3 className="text-clampSm font-bold mt-4">Who is following {currentUser?._id === user?._id ? "you" : `${user?.username}`}</h3>

      {isLoading ? (
        [...Array(5).keys()].map((_, i) => <FollowCardLoader key={i} />)
      ) : (
        <>
          {followers?.data.length === 0 ? (
            <h2 className="text center text-gray-500">No one.</h2>
          ) : followers?.data.map((follower) => (
            <div className="flex_between" key={follower._id}>
              <div className="flex gap-3">
              <Link to={`profile/${follower?._id}`} className="w-[2.7rem] h-[2.7rem] rounded-full overflow-hidden">
                <img
                  src={follower?.profilePicture || Avatar}
                  alt="followers-img"
                  className="w-full object-cover"
                />
              </Link>

                <div className="flex justify-center flex-col">
                  <span className="font-bold">{follower.username}</span>
                  <span className="text-sm text-gray-500">
                    @{follower.email}
                  </span>
                </div>
              </div>

              {currentUser?._id !== user?._id ? null : user.following.includes(follower._id) ? (
                <button className="btn-gradient px-3 py-1" onClick={() => handleUnfollow(follower?._id)}>UnFollow</button>
              ) : (
                <button className="btn-gradient px-3 py-1" onClick={() => handleFollow(follower?._id)}>Follow</button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FollowersCard;
