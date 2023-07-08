import React from 'react'
import PostProfileLoader from "./PostProfileLoader";

const PostCardLoader = () => {
  return (
    <div className="flex flex-col p-4  rounded-lg gap-4 shadow-sm">
      <PostProfileLoader />

      <div
        className="w-full h-[20rem] animate-pulse bg-gray-200 rounded-lg"
      />

      <div className="flex justify-between items-center w-full ">
        {/* buttons */}
        <div className="flex items-center gap-6 ">
            <div className="h-[25px] w-[25px] rounded-full bg-gray-200" ></div>
          <div className="h-[25px] w-[25px] rounded-full bg-gray-200" ></div>
          <div className="h-[25px] w-[25px] rounded-full bg-gray-200" ></div>
        </div>
      </div>

      <hr className="w-full border border-gray-100" />

      <div className='bg-gray-200 w-full h-[30px] animate-pulse'></div>
    </div>
  )
}

export default PostCardLoader