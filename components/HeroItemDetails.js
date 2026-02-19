"use client";
import { Bookmark, Mic2Icon } from 'lucide-react'
import Link from 'next/link';

const HeroItemDetails = ({currentItem,currentIndex}) => {
  return (
    <>
     <div key={currentIndex} className='max-sm:mt-12 relative w-full text-white space-y-6 sm:self-end sm:mb-28 animate-fade transition-all duration-100 ml-14'>
      <h1 className='text-5xl font-bold'>{currentItem.title}</h1>
      <div className='flex gap-2 items-center'>
        <span className='bg-[#e45f3a1e] text-[10px] p-px text-[#E45F3A] border border-[#E45F3A] rounded-md'>CC {currentItem.totalSubbed}</span>
        <span className='bg-green-600/20 text-[10px] p-px text-green-600 border border-green-600 rounded-md flex items-center'><Mic2Icon className='h-3 w-3'/><span>{currentItem.totalDubbed}</span></span>
        <span className='font-bold'>
            {currentItem.Type}
        </span>
        <span>
            {currentItem.genres.join(", ")}
        </span>
      </div>
      <p className='w-1/2 text-sm leading-6.5'>
        {currentItem.synopsis.slice(0,150)+"..."}
      </p>
      <div className='bg-black/80 p-4 rounded-xl flex justify-between max-w-[90%] sm:max-w-[50%] md:max-w-[30%]'>
      <div className='flex flex-col gap-2 font-bold'>
        <span className='text-gray-400 text-sm'>Rating</span>
        <span className='text-white text-lg'>{currentItem.score.split(" ")[0]}</span>
      </div>
      <div className='flex flex-col gap-2 font-bold'>
        <span className='text-gray-400 text-sm'>Release</span>
        <span className='text-white text-lg'>{currentItem.Aired.split(" ")[2]}</span>
      </div>
      <div className='flex flex-col gap-2 font-bold'>
        <span className='text-gray-400 text-sm'>Quality</span>
        <span className='text-white text-lg'>HD</span>
      </div>
      </div>
      <div className='flex gap-12 items-center flex-wrap'>
        <Link href={`/watch/${currentItem?.episodes?.[0]?.slugs?.[0]}`} className='bg-[#E45F3A] text-2xl px-12 py-2 rounded-lg'>
            Watch Now
        </Link>
        <Bookmark className='h-7 w-7'/>
      </div>
      </div> 
    </>
  )
}

export default HeroItemDetails
