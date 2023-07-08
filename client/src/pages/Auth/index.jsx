import React, { useState } from "react";
import Logo from "../../img/logo.png";
import LogIn from "./LogIn";
import Signup from "./Signup";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex_center flex-wrap min-h-[100svh] gap-x-16 gap-y-14 max-lg:flex-col">
      <div className="flex_center gap-8">
        <img src={Logo} className="w-[2.8rem] md:w-[4rem] h-[2.8rem] md:h-[4rem]" alt="Logo" />
        <div className="text-red-500 font-semibold">
          <h1 className="webname text-clampLg">CYRIL Media</h1>
          <h6 className="text-clampXs">
            Explore the ideas throughout the world
          </h6>
        </div>
      </div>

      {isSignUp ? (
        <Signup setIsSignUp={setIsSignUp} />
      ) : (
        <LogIn setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
};

export default Auth;
