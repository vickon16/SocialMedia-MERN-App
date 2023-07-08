import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../img/logo.png";
import { useDisclosure } from "@mantine/hooks";
import { Drawer} from "@mantine/core";
import LogoSearch from "./LogoSearch";
import ProfileCard from "./ProfileCard";
import FollowersCard from "./FollowersCard";
import Logout from "./Logout";
import TrendCard from "./TrendCard";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(state => state.user)
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <nav className="hidden max-cusLg:flex bg-BgWhite mb-4 pt-4 sm:py-2 px-4 justify-between items-center gap-3 sticky top-0">
        <img src={Logo} alt="Logo" className="h-[25px] aspect-auto" />
        <GiHamburgerMenu className="svg-style" onClick={open} />
      </nav>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        size="sm"
      >
        <div className="pb-6 flex flex-col items-center gap-4">
          <LogoSearch />
          <ProfileCard />
          <FollowersCard user={user} />
          <Logout />
          
          <TrendCard />
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
