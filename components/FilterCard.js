"use client";
import { Info, Mic2Icon, Play } from "lucide-react"
import Link from "next/link";
import { useRef, useState } from "react"

const FilterCard = ({anime}) => {
  const [showInfoIcon,setShowInfoIcon] = useState(false);
  const [showInfo,setShowInfo] = useState(false);
  const [translatePlay,setTranslatePlay] = useState(false);
  const [infoSide, setInfoSide] = useState("right");
  const cardRef = useRef(null);
  const handleInfoEnter = () => {
  if (!cardRef.current) return

  const rect = cardRef.current.getBoundingClientRect()
  const infoWidth = 288;

  const overflowRight = rect.right + infoWidth > window.innerWidth

  setInfoSide(overflowRight ? "left" : "right")
  setShowInfo(true)
}
  return (
    <>
    <div ref={cardRef} className="relative hover:cursor-pointer" onMouseEnter={()=>setShowInfoIcon(true)} onMouseLeave={()=>setShowInfoIcon(false)}>

        <Link href={`/watch/${anime?.episodes?.[0]?.slugs?.[0] || anime?.slugs?.[0]}`}>
          {
            showInfoIcon && <span className={`rounded-full bg-[#b83c19] text-white absolute z-10 right-2 top-2`} onMouseEnter={handleInfoEnter} onMouseLeave={()=>setShowInfo(false)}><Info className="h-8 w-8"/></span>
          }
        <div className={`bg-cover bg-no-repeat bg-center rounded-xl overflow-hidden relative h-64`} style={{backgroundImage:`url('${anime?.image || anime?.anime_info?.image || "/images/filterimage.jpg"}')`}}>

        </div>
        <p className="font-bold text-[13px] text-white my-1">{anime?.title.slice(0,23)+"..." || "Title"}</p>
        <div className="flex justify-between">

        <div className="flex gap-2">
                 <span className='bg-[#e45f3a1e] text-[10px] p-px flex items-center text-[#E45F3A] border border-[#E45F3A] rounded-md'>CC {anime?.totalSubbed || 0}</span>
        <span className='bg-green-600/20 text-[10px] p-px text-green-600 border border-green-600 rounded-md flex items-center'><Mic2Icon className='h-4 w-4 mr-1'/><span>{anime?.totalDubbed || 0}</span></span>
              </div>
              <span className="font-bold text-xs text-white">{anime?.Type || anime?.anime_info?.Type}</span>
        </div>
        </Link>
        <div className={`
    bg-[#b83c19] p-4 rounded-lg absolute top-0 w-72
    transition-all duration-300 cursor-default
    ${showInfo ? "opacity-100 z-10" : "opacity-0 -z-10"}
    ${infoSide === "right"
      ? "left-[calc(100%+2px)]"
      : "right-[calc(100%+2px)]"}
  `} onClick={(e)=>{e.stopPropagation(); e.preventDefault();}} onMouseEnter={()=>setShowInfo(true)} onMouseLeave={()=>setShowInfo(false)}>
          <h1 className="font-bold text-white">{anime.title || anime?.anime_info?.title}</h1>
          <p className="text-xs text-gray-400">{anime.Japanese || anime?.anime_info?.Japanese}</p>
          <div className="my-2 bg-black/50 rounded-full">
            <span className="bg-[#b83c19] ml-1 px-1 text-xs rounded-full text-white">{anime?.score?.split(" ")[0] || anime?.anime_info?.score?.split(" ")[0]}</span>
          </div>
          <p className="text-xs text-gray-400">
            {anime?.synopsis ? anime.synopsis.slice(0, 110) + "..." : anime?.anime_info?.synopsis.slice(0, 110)}
          </p>
          <div className="text-xs my-3 text-white">
            <p>
              <span className="text-gray-400">Aired:</span>
              <span>{anime?.Aired || anime?.anime_info?.Aired}</span>
            </p>
            <p>
              <span className="text-gray-400">Status:</span>
              <span>{anime?.Status || anime?.anime_info?.Status}</span>
            </p>
            <p>
              <span className="text-gray-400">Genres:</span>
              <span>
                {
                  anime?.genres?.join(", ") || anime?.anime_info?.genres?.join(", ")
            }
            </span>
            </p>
          </div>
          <Link href={`/watch/${anime?.episodes?.[0]?.slugs?.[0] || anime?.slugs?.[0]}`} onMouseEnter={()=>setTranslatePlay(true)} onMouseLeave={()=>setTranslatePlay(false)} className="bg-gray-900 rounded-full p-2 font-bold flex justify-between w-full items-center">
            <span className="text-white">
              WATCH NOW
            </span>
            <Play className={`h-5 w-5 ${translatePlay ? "-translate-x-4 text-green-600" : "translate-0 text-white"} transition-all duration-200 delay-100`} fill={`${translatePlay ? "green" : "white"}`}/>
          </Link>
        </div>
    </div>
    </>
  )
}

export default FilterCard
