import { Modal } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUploadImage from "../hooks/useUploadImage";
import Loader from "./Loader";
import { useMutation } from "@tanstack/react-query";
import { updateUserQuery } from "../api/requests";
import {loginUser} from "../store/userSlice";
import { queryClient } from "../index";

const initialFormState = {
  username: "",
  worksAt: "",
  relationship: "",
  country: "",
  state: "",
  about: "",
};

function ProfileModal({ modalOpened, setModalOpened }) {
  const [formData, setFormData] = useState(initialFormState);
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    enable: currentUser !== null,
    mutationKey: ["user", "update", `${currentUser?._id}`],
    mutationFn: (mutationData) =>
      updateUserQuery(currentUser?._id, mutationData),
    onSuccess : ({data}) => {
      dispatch(loginUser(data));
      queryClient.invalidateQueries({queryKey : ["users", "find", `${currentUser?._id}`]})
    }
  });

  const {
    uploadError: uploadError_p,
    image: image_p,
    setImage: setImage_p,
    isImgUploading: isImgUploading_p,
    setIsImgUploading: setIsImgUploading_p,
    downloadUrl: downloadUrl_p,
    setDownloadUrl: setDownloadUrl_p,
    setUploadError: setUploadError_p,
  } = useUploadImage();

  const {
    uploadError: uploadError_c,
    image: image_c,
    setImage: setImage_c,
    isImgUploading: isImgUploading_c,
    setIsImgUploading: setIsImgUploading_c,
    downloadUrl: downloadUrl_c,
    setDownloadUrl: setDownloadUrl_c,
    setUploadError: setUploadError_c,
  } = useUploadImage();

  const { username, worksAt, country, state, about, relationship } = formData;

  const isDisabled =
    !username &&
    !worksAt &&
    !country &&
    !state &&
    !about &&
    !relationship &&
    !image_p &&
    !image_c;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileImage = (e) => {
    setImage_p(e.target.files[0]);
    setIsImgUploading_p(true);
  };

  const handleCoverImage = (e) => {
    setImage_c(e.target.files[0]);
    setIsImgUploading_c(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    // filter out empty formData keys
    let newData = {};
    username && (newData.username = formData.username);
    worksAt && (newData.worksAt = formData.worksAt);
    country && (newData.country = formData.country);
    state && (newData.state = formData.state);
    about && (newData.about = formData.about);
    relationship && (newData.relationship = formData.relationship);
    downloadUrl_p && (newData.profilePicture = downloadUrl_p);
    downloadUrl_c && (newData.coverPicture = downloadUrl_c);

    mutate(newData);
    setFormData(initialFormState);
    setDownloadUrl_c("");
    setDownloadUrl_p("");
    setUploadError_p("");
    setUploadError_c("");
    setModalOpened(false);
  };

  return (
    <Modal
      size="lg"
      position="center"
      transitionProps={{ transition: "fade", duration: 400 }}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
        <h2 className="text-clampSm font-semibold mb-4">Update your Profile</h2>

        <div className="flex flex-col gap-y-2">
          <label>
            <p className="mb-2">Username </p>
            <input
              type="text"
              className="input p-2"
              name="username"
              value={username}
              placeholder="UserName"
              onChange={handleChange}
            />
          </label>

          <label>
            <p className="mb-2">WorkAt </p>
            <input
              type="text"
              className="input p-2"
              name="worksAt"
              value={worksAt}
              placeholder="Works At"
              onChange={handleChange}
            />
          </label>

          <div className="flex_between flex-wrap gap-3">
            <label className="w-full sm:flex-[0.49]">
              <p className="mb-2">Relationship </p>
              <select
                name="relationship"
                className="p-2 input "
                value={relationship}
                onChange={handleChange}
              >
                <option value="">Select Relationship</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Dating">Dating</option>
                <option value="Divorced">Divorced</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="w-full sm:flex-[0.49]">
              <p className="mb-2">Country </p>
              <input
                type="text"
                className="input p-2"
                name="country"
                value={country}
                placeholder="Country"
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="w-full">
            <p className="mb-2">State </p>
            <input
              type="text"
              className="input p-2"
              name="state"
              value={state}
              placeholder="State"
              onChange={handleChange}
            />
          </label>

          <div className="flex_between flex-wrap gap-3">
            <label className="w-full sm:flex-[0.49]">
              <p className="mb-2">Profile Image </p>
              {isImgUploading_p ? (
                <Loader size="20" />
              ) : (
                <input
                  type="file"
                  className="input"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleProfileImage}
                />
              )}
            </label>

            <label className="w-full sm:flex-[0.49]">
              <p className="mb-2">Cover Image </p>
              {isImgUploading_c ? (
                <Loader size="20" />
              ) : (
                <input
                  type="file"
                  className="input"
                  name="coverPicture"
                  accept="image/*"
                  onChange={handleCoverImage}
                />
              )}
            </label>
          </div>

          <label className="w-full">
            <p className="mb-2">About </p>
            <textarea
              className="input p-2"
              name="about"
              value={about}
              rows={4}
              placeholder="About"
              onChange={handleChange}
            />
          </label>
        </div>

        {uploadError_p && (
          <p className="text-red-500 text-center">{uploadError_p}</p>
        )}

        {uploadError_c && (
          <p className="text-red-500 text-center">{uploadError_c}</p>
        )}

        {isLoading ? (
          <div className="w-full flex_center py-2">
            <Loader size="30" />
          </div>
        ) : (
          <button
            type="submit"
            className="btn-outline mt-3 px-4 py-1"
            disabled={isDisabled || isImgUploading_c || isImgUploading_p}
          >
            Update
          </button>
        )}
      </form>
    </Modal>
  );
}

export default ProfileModal;
