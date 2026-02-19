"use client";
import { SquareArrowUpRight } from 'lucide-react'
import UpdateItem from './UpdateItem'

const Updates = ({animes,title}) => {
  return (
    <>
    <div className='flex flex-col gap-4 md:flex-1'>

     <div className="flex justify-between mt-10">
        <h2 className="font-bold text-2xl text-white">{title}</h2>
        <SquareArrowUpRight fill="white" className="text-black rounded-xl w-8 h-8"/>
        </div>
        <ul className="rounded-xl overflow-hidden text-white bg-[#11161b]">
          {animes.map((anime)=>{

              return <li key={anime.English} >
                <UpdateItem anime={anime}/>
          </li>
        })
          }
        </ul> 
    </div>
    </>
  )
}

export default Updates
