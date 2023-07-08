import React, { useState } from "react";
import { IoMdShareAlt } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import Avatar from "../img/avatar.png";
import { useQuery } from "@tanstack/react-query";
import PostProfileLoader from "./Loaders/PostProfileLoader";
import { dislikePost, followUserRequest, getUser, likePost, unFollowUserRequest } from "../api/requests";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../store/userSlice";

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    enabled: post?.userId !== null,
    queryKey: ["users", `${post?.userId}`],
    queryFn: () => getUser(post?.userId),
  });

  const postUser = data?.data;

  const handleLike = async (postId) => {
    await likePost(postId);
    setLiked(true);
  };

  const handleDislike = async (postId) => {
    await dislikePost(postId);
    setLiked(false);
  };

  const handleUnfollow = (userId) => {
    unFollowUserRequest(userId)
    dispatch(unfollowUser(userId))
  }

  const handleFollow = (userId) => {
    followUserRequest(userId)
    dispatch(followUser(userId))
  }

  return (
    <div className="flex flex-col p-4 bg-cardColor rounded-lg gap-4 shadow">
      {isLoading ? (
        <PostProfileLoader />
      ) : (
        <div className="flex_between gap-2">
          <div className="flex items-center">
            <Link
              to={`profile/${post?.userId}`}
              className="rounded-full w-[30px] h-[30px] overflow-hidden"
            >
              <img
                src={postUser?.profilePicture || Avatar}
                alt="post-img"
                className="w-full object-cover"
              />
            </Link>

            <b className="text-clampXs">{postUser?.username || "No name"}</b>
          </div>

          {user?._id === post?.userId ? null : user.following.includes(post.userId) ? (
            <button
              className="btn-gradient px-3 py-1"
              onClick={() => handleUnfollow(post?.userId)}
            >
              UnFollow
            </button>
          ) : (
            <button
              className="btn-gradient px-3 py-1"
              onClick={() => handleFollow(post?.userId)}
            >
              Follow
            </button>
          )}
        </div>
      )}

      {post?.image && (
        <img
          src={post.image}
          alt="post-img"
          className="w-full max-h-[20rem] object-cover rounded-lg"
        />
      )}

      <hr className="w-full border border-gray-100" />

      <div>{post?.desc}</div>

      <div className="flex justify-between items-center w-full ">
        {/* buttons */}
        <div className="flex items-center gap-4 mt-3 ">
          {liked ? (
            <AiFillHeart
              className={`svg-style active-liked`}
              onClick={() => handleDislike(post?._id)}
            />
          ) : (
            <AiFillHeart
              className={`svg-style`}
              onClick={() => handleLike(post?._id)}
            />
          )}
          <FaCommentDots className="svg-style" />
          <IoMdShareAlt className="svg-style" />
        </div>

        <span className="text-sm">
          <strong>{post?.likes.length}</strong> likes
        </span>
      </div>
    </div>
  );
};

export default Post;
