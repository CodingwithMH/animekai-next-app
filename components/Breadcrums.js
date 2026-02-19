"use client";
import React from 'react'

const Breadcrums = ({anime}) => {
  return (
    <>
    <div className='text-white space-x-3 text-sm'>
     <span>Home</span>
     <span>/</span>
     <span>TV</span>
     <span>/</span>
     <span className='text-gray-400'>{anime?.title}</span> 
    </div>
    </>
  )
}

export default Breadcrums
