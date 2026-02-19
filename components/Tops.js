"use client";
import { Mic2Icon, Trophy } from "lucide-react"
import Link from "next/link";

const Tops = ({latest}) => {
  return (
    <>
    <div className="p-2 flex items-center justify-between">
    <div className="flex items-center gap-4 text-white">
            <Trophy className="w-8 h-8 bg-[#E45F3A] p-2 rounded-full"/>
          <span className="font-bold text-2xl">Top 10</span>
          </div>
          <select name="toptime" className="bg-[#E45F3A] p-2 text-white font-semibold rounded-lg">
            <option value="now">NOW</option>
            <option value="day">DAY</option>
            <option value="week">WEEK</option>
            <option value="month">MONTH</option>
          </select>
          </div>
            <ul className="text-white space-y-2">
            {
              latest ?
              latest.map((anime,ind)=>{
                return <li key={anime._id}>
              <Link href={'/'} className="rounded-lg flex w-full p-4 py-7 gap-3 items-center relative bg-position-[100%] bg-no-repeat bg-size-[40%] overflow-hidden transition-all toplink" style={{backgroundImage:`url('${anime?.image || "/images/filterimage.jpg"}')`}}>
              <div className="h-8 w-8 border border-gray-400 rounded-full flex justify-center items-center">{ind+1}</div>
              <div className="flex flex-col">
                <span>
                  {anime?.title.length>25 ? anime?.title.slice(0,23)+"..." : anime?.title || "Title"}
                </span>
                <div className="flex gap-2">
                <span className='bg-[#e45f3a1e] text-[10px] p-px text-[#E45F3A] border border-[#E45F3A] rounded-md'>CC {anime?.totalSubbed || 0}</span>
        <span className='bg-green-600/20 text-[10px] p-px text-green-600 border border-green-600 rounded-md flex items-center'><Mic2Icon className='h-4 w-4 mr-1'/><span>{anime?.totalDubbed || 0}</span></span>
                </div>
              </div>
              </Link>
            </li>
              })  : <div className="text-white font-black text-3xl my-16 text-center">Loading...</div>
            }
          </ul>
      
    </>
  )
}

export default Tops
