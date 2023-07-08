import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const Loader = ({...props}) => {
  return (
    <BiLoaderAlt {...props} className='animate-spin fill-gray-400' />
  )
}

export default Loader