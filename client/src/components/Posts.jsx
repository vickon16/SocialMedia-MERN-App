import React from 'react'
import Post from './Post'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/requests'
import PostCardLoader from './Loaders/PostCardLoader'


const Posts = () => {
  const {isLoading, data : posts} = useQuery({
    queryKey : ["posts"],
    queryFn : getPosts,
  })

  if (isLoading) {
    return ([...Array(4).keys()].map((_, i) => (
      <PostCardLoader key={i} />
    )))
  }

  return (
    <section className="flex flex-col gap-4 pb-4">
      {posts?.data?.length === 0 ? (
        <div className='my-6 flex_center w-full py-6'>
          <h2 className='text-clampSm text-gray-500'>...No posts to display...</h2>
        </div>
      ) : posts?.data?.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </section>
  )
}

export default Posts