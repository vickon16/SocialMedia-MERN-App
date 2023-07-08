import React from "react";

const ProfileRightCardLoader = () => {
  return (
    <aside className="flex flex-col gap-4 overflow-auto cusLg:w-3/4">
      <section className="sm:rounded-tl-[1rem] sm:rounded-tr-[1rem] overflow-x-clip flex flex-col w-full">
        <div className="relative flex_center flex-col mb-14">
          <div className="w-full h-[200px] bg-gray-200 animate-pulse" ></div>
          <div className="absolute w-full left-0 bottom-[-2rem] flex items-center gap-4 px-2">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="bg-white p-4 w-full max-w-[15rem] rounded">
              <div className="w-[70%] h-[16px] bg-gray-300 animate-pulse mb-2"></div>
              <div className="w-[50%] h-[16px] bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col m-4 gap-3">
          <hr className="w-[50%] border border-gray-100" />

          <div className="flex items-center justify-around w-fit gap-4">
            <div className="flex_center flex-col gap-1 px-3 py-1">
              <span className="w-[10px] h-[40px] bg-gray-300"></span>
              <span className="h-[15px] w-[50px] bg-gray-300"></span>
            </div>

            <div className="h-full border-l border-gray-200"></div>

            <div className="flex_center flex-col gap-1 px-3 py-1">
              <span className="w-[10px] h-[40px] bg-gray-300"></span>
              <span className="h-[15px] w-[50px] bg-gray-300"></span>
            </div>

            <div className="h-full border-l border-gray-200"></div>

            <div className="flex_center flex-col gap-1 px-3 py-1">
              <span className="w-[10px] h-[40px] bg-gray-300"></span>
              <span className="h-[15px] w-[50px] bg-gray-300"></span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="p-4 bg-cardColor shadow-sm">
        <div className="bg-gray-300 animate-pulse h-[25px] w-[10%] mb-4 mt-2">
        </div>

        <div className="w-full h-[150px] bg-gray-300 animate-pulse">
        </div>
      </section>
    </aside>
  );
};

export default ProfileRightCardLoader;
