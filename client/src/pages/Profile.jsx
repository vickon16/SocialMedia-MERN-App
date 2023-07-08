import React from "react";
import ProfileLeft from "../components/ProfileLeft";
import ProfileRight from "../components/ProfileRight";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/requests";
import ProfileInfoCardLoader from "../components/Loaders/ProfileInfoCardLoader";
import FollowCardLoader from "../components/Loaders/FollowCardLoader";
import ProfileRightCardLoader from "../components/Loaders/ProfileRightCardLoader";

const Profile = () => {
  const { id } = useParams();

  const { isLoading, data: user } = useQuery({
    enabled: id !== null,
    queryKey: ["users", "find", `${id}`],
    queryFn: () => getUser(id),
  });

  if (isLoading) {
    return (
      <div className="relative flex flex-col-reverse cusLg:flex-row gap-6 sm:my-8">
        <aside className="flex flex-col gap-4 overflow-auto cusLg:w-1/4 cusLg:min-w-[280px] ">
          <ProfileInfoCardLoader />
          {[...Array(4).keys()].map((_, i) => <FollowCardLoader key={i} />)}
        </aside>
        <ProfileRightCardLoader />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col-reverse cusLg:flex-row gap-6 sm:my-8">
      <ProfileLeft user={user?.data} />
      <ProfileRight user={user?.data} />
    </div>
  );
};

export default Profile;
