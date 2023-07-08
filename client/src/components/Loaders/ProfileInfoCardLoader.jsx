import React from 'react'

const ProfileInfoCardLoader = () => {
  return (
    <section className="flex flex-col gap-3 bg-cardColor shadow p-4 rounded w-full">
      <div className="flex_between gap-x-2">
        <div className="w-[100px] h-[20px] bg-gray-300 animate-pulse"></div>
      </div>


      <div className="flex flex-col gap-y-2 mt-3">
        <p className="flex gap-x-2 items-center">
          <span className="w-[60%] h-[18px] bg-gray-300 animate-pulse"></span>
        </p>

        <p className="flex gap-x-2 items-center">
          <span className="w-[80%] h-[18px] bg-gray-300 animate-pulse"></span>
        </p>

        <p className="flex gap-x-2 items-center">
          <span className="w-[40%] h-[18px] bg-gray-300 animate-pulse"></span>
        </p>
      </div>
    </section>
  )
}

export default ProfileInfoCardLoader