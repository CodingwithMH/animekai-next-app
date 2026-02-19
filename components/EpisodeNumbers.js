"use client";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const EpisodeNumbers = ({episodes,episode,fetchEpisode}) => {
  return (
    <>
      <div className='lg:w-[30%] w-full rounded-2xl bg-[#0C1116] p-4'>
          <div className='flex justify-between'>
            <span className='text-sm text-white font-bold'>Episodes:</span>
            <div className='flex gap-1'>
              <div className='relative text-gray-400 z-20'>
                <span className='absolute left-1'>#</span>
              <input type="text" className='rounded-md bg-gray-800 pl-5 w-40' placeholder='Find'/>
              </div>
              <button className='rounded-sm p-1 bg-gray-800'><Menu className='h-3 w-3 text-gray-900 bg-gray-400 rounded-xs'/></button>
            </div>
          </div>
          <div className='flex justify-between p-1 bg-gray-800 rounded-md my-5'>
            <ChevronLeft className='h-5 w-5 text-gray-400'/>
            <div className='text-white flex gap-2'>
              <div>
              <span>1</span>
              <span>/</span>
              <span>12</span>
              </div>
            <ChevronDown className='h-5 w-5 text-gray-400'/>
            </div>
            <ChevronRight className='h-5 w-5 text-gray-400'/>
          </div>
          <div className='flex gap-2 justify-evenly flex-wrap px-4 mx-auto w-[95%]'>
            {
             episodes.length > 0 ? (episodes.map((ep,index)=>{
                return <Link href={`/watch/${ep.slugs[0]}`} onClick={()=>fetchEpisode()} key={ep._id} className={`hover:bg-[#E45F3A] flex justify-center items-center h-13 w-14 rounded-lg text-lg text-white font-bold ${episode.episodeNumber===ep.episodeNumber ? "bg-[#E45F3A]":"bg-gray-800"}`}>
              {ep.episodeNumber}
            </Link>
              })) : <div className="text-white text-center w-full">Loading episodes...</div>
            }
          </div>
        </div>
    </>
  )
}

export default EpisodeNumbers
