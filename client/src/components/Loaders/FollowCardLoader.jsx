import React from "react";

const FollowCardLoader = () => {
  return (
    <div className="flex_between w-full mt-2">
      <div className="flex gap-3">
        <div
          className="w-[2rem] h-[2rem] rounded-full object-cover bg-gray-300"
        />

        <div className="flex justify-center flex-col gap-y-2">
          <span className="bg-gray-300 w-[100px] h-[18px] animate-pulse"></span>
          <span className="bg-gray-300 w-[140px] h-[18px] animate-pulse"></span>
        </div>
      </div>

      <button className="px-3 py-1 bg-gray-300 w-[50px] h-[25px] rounded animate-pulse"></button>
    </div>
  );
};

export default FollowCardLoader;
