import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import ProfileModal from "./ProfileModal";
import { useSelector } from "react-redux";

const InfoCard = ({ user }) => {
  const currentUser = useSelector((state) => state.user.user);
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <section className="flex flex-col gap-3 bg-cardColor shadow p-4 rounded w-full">
      <div className="flex_between gap-x-2">
        <h2 className="text-clampSm font-semibold">Profile Info</h2>
        {currentUser === user && (
          <div>
            <GrEdit
              className="cursor-pointer text-xl"
              onClick={() => setModalOpened(true)}
              title="edit"
            />
            {modalOpened && <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mt-3">
        <p className="flex gap-x-2 items-center">
          <b>Status :</b>
          <span className="text-gray-500 text-sm">
            {user?.relationship || "---"}
          </span>
        </p>

        <p className="flex gap-x-2 items-center">
          <b>State :</b>
          <span className="text-gray-500 text-sm">
            {user?.state || "---"}
          </span>
        </p>

        <p className="flex gap-x-2 items-center">
          <b>Works at :</b>
          <span className="text-gray-500 text-sm">
            {user?.worksAt || "---"}
          </span>
        </p>

        <p className="flex gap-x-2 items-center">
          <b>Country :</b>
          <span className="text-gray-500 text-sm">
            {user?.country || "---"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default InfoCard;
