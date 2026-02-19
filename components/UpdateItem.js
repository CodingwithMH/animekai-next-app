"use client";
import { Mic2Icon } from 'lucide-react'
import Link from 'next/link';
const UpdateItem = ({anime}) => {
  return (
    <>
     <Link href={"/"} className='p-3 py-4 flex gap-3 hover:bg-[#1B2027]'>
            <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center">
              <img src={anime?.image || "/images/filterimage.jpg"} alt="sharing" className="w-16 h-16"/>
            </div>
            <div className="flex flex-col text-sm font-bold justify-between flex-1">
              <p>{anime?.title.slice(0,23)+"..." || "Title"}</p>
              <div className="flex justify-between">

              <div className="flex gap-2">
                 <span className='bg-[#e45f3a1e] text-[10px] p-px text-[#E45F3A] border border-[#E45F3A] rounded-md'>CC {anime.totalSubbed}</span>
        <span className='bg-green-600/20 text-[10px] p-px text-green-600 border border-green-600 rounded-md flex items-center'><Mic2Icon className='h-4 w-4 mr-1'/><span>{anime.totalDubbed}</span></span>
              </div>
              <span className="text-sm text-gray-300">{anime.Type}</span>
              </div>
            </div>
                </Link> 
    </>
  )
}

export default UpdateItem
