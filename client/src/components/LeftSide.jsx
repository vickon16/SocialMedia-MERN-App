import React from 'react'
import LogoSearch from './LogoSearch'
import ProfileCard from './ProfileCard.jsx'
import FollowersCard from "./FollowersCard";
import Logout from './Logout';
import RightSide from './RightSide';
import { useSelector } from 'react-redux';

const LeftSide = () => {
  const {user} = useSelector(state => state.user)

  return (
    <aside className="w-1/6 md:min-w-[300px] h-[95svh] max-cusLg:hidden overflow-auto pb-6 flex flex-col items-center gap-4">
        <LogoSearch />
        <ProfileCard />
        <FollowersCard user={user} />
        <Logout />
        <RightSide type="mobile" />
    </aside>
  )
}

export default LeftSide