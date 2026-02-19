"use client";
import { Mic2Icon } from 'lucide-react'
import React from 'react'

const AnimeDescription = ({anime}) => {
  return (
    <>
     <div className='m-8 flex max-md:flex-col rounded-2xl overflow-hidden' style={{zIndex:10,position:"relative"}}>
        <div className={`inset-0 p-6 backdrop-blur-2xl max-md:w-full max-md:bg-cover`} style={{backgroundImage: `url('${anime?.image || "/images/filterimage2.jpg"}')`}}>

        <img className='mx-auto' src={anime?.image || "/images/filterimage2.jpg"} alt="" width={"150px"} height={"auto"} />
        </div>
        <div className='flex-1 bg-[#0C1116] inset-0 md:pl-6'>
          <h1 className='text-white font-bold text-lg mx-2'>{anime?.title || "Title"}</h1>
            <div className="flex gap-2 my-3 mx-2">
                 {anime?.Rating && <span className='text-[10px] p-px flex items-center border bg-[#E45F3A] rounded-md'>{anime.Rating.slice(" ")[0]}</span>}
                 <span className='bg-[#e45f3a1e] text-[10px] p-px flex items-center text-[#E45F3A] border border-[#E45F3A] rounded-md'>CC {anime?.totalSubbed || 0}</span>
        <span className='bg-green-600/20 text-[10px] p-px text-green-600 border border-green-600 rounded-md flex items-center'><Mic2Icon className='h-4 w-4 mr-1'/><span>{anime?.totalDubbed || 0}</span></span>
              </div>
              <p className='text-white text-xs text-justify mx-2 xl:w-[80%]'>
                {anime?.synopsis}
              </p>
        </div>
      </div> 
    </>
  )
}

export default AnimeDescription
