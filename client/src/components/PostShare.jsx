import React, { useState, useRef } from "react";
import Avatar from "../img/avatar.png";
import { HiOutlinePhotograph, HiPlay, HiLocationMarker } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";

import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/requests";
import Loader from "./Loader";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { queryClient } from "../index";
import { Link } from "react-router-dom";
import useUploadImage from "../hooks/useUploadImage";

const PostShare = () => {
  const { user } = useSelector((state) => state.user);
  const [desc, setDesc] = useState("");

  const imageRef = useRef();
  const {
    uploadError,
    image,
    setImage,
    isImgUploading,
    setIsImgUploading,
    downloadUrl,
    setDownloadUrl,
    setUploadError,
  } = useUploadImage();

  const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, error, mutate } = useMutation({
    mutationFn: (mutationData) => createPost(mutationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const isDisabled = !desc || desc.length <= 3 || isImgUploading;

  const handleConfirmPost = () => {
    if (!user || isDisabled) return;

    open();
  };

  const handleImageChange = (e) => {
    setImage(e.target?.files[0]);
    setIsImgUploading(true);
  };

  const handleSubmit = async (e) => {
    if (!desc) return;
    const newPost = { desc };

    if (downloadUrl) {
      newPost.image = downloadUrl;
    }

    mutate(newPost);
    setDesc("");
    setImage("");
    setDownloadUrl("");
    setIsImgUploading(false);
    setUploadError("");
    close();
  };

  return (
    <section className="flex flex-col gap-3 bg-cardColor p-4 rounded-lg shadow">
      <div className="flex items-center gap-2">
        <Link
          to={`profile/${user?._id}`}
          className="rounded-full w-[2.5rem] h-[2.5rem] overflow-hidden"
        >
          <img
            src={user?.profilePicture || Avatar}
            alt="post-img"
            className=" w-full object-cover"
          />
        </Link>
        <input
          type="text"
          placeholder="What's happening..."
          className="input-style"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          minLength={4}
        />
        <button
          className="btn bg-emerald-600 text-white h-full -ml-2 px-2 hover:bg-emerald-500"
          onClick={handleConfirmPost}
          disabled={isDisabled}
        >
          GO
        </button>
      </div>

      {isLoading ? (
        <div className="flex_center my-2">
          <Loader size="30" />
        </div>
      ) : (
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={true}
          title={"Confirm Post"}
        >
          <div className="flex flex-col gap-y-3 relative">
            <div>
              <p className="text-gray-400 text-sm mb-1">Description :</p>
              <p>{desc}</p>
            </div>

            {image && (
              <div>
                <p className="text-gray-400 text-sm mb-2">Image : </p>
                {isImgUploading ? (
                  <Loader size="30" />
                ) : (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview-img"
                    className="w-full max-h-[20rem] object-cover rounded-lg"
                  />
                )}
              </div>
            )}

            {error?.response?.data && (
              <p className="text-red-500 text-center">
                {error.response.data || error.message}
              </p>
            )}

            {uploadError && (
              <p className="text-red-500 text-center">{uploadError}</p>
            )}

            <button
              className="btn-gradient px-5 py-1 w-full sm:w-fit mt-3 mb-32 xs:mb-14"
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              Submit Post
            </button>

            <div className="flex items-center justify-between w-full flex-wrap gap-y-3 absolute bottom-0 left-0">
              <div
                className="text-clampXs flex_center rounded-md px-2 py-1 text-photo gap-[2px] cursor-pointer"
                onClick={() => imageRef.current.click()}
              >
                <HiOutlinePhotograph className="text-lg" />
                Photo
              </div>

              <div className="text-clampXs flex_center rounded-md px-2 py-1 text-video gap-[2px] cursor-pointer">
                <HiPlay className="text-lg" />
                Video
              </div>

              <div className="text-clampXs flex_center rounded-md px-2 py-1 text-location gap-[2px] cursor-pointer">
                <HiLocationMarker className="text-lg" />
                Location
              </div>

              <div className="text-clampXs flex_center rounded-md px-2 py-1 text-schedule gap-[2px] cursor-pointer">
                <AiOutlineSchedule className="text-lg" />
                Shedule
              </div>

              <div className="hidden">
                <input
                  type="file"
                  name="myImage"
                  ref={imageRef}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default PostShare;
