"use client";
import { Share2 } from 'lucide-react';
import {
  FaTelegram,
  FaTwitter,
  FaFacebook,
  FaDiscord,
} from "react-icons/fa";
const Share = () => {
    const shares = [
    { name: FaTelegram, color: "bg-blue-500" },
    { name: FaTwitter, color: "bg-black" },
    { name: FaFacebook, color: "bg-blue-700" },
    { name: FaDiscord, color: "bg-red-600" },
  ];
  return (
    <>
     <div className="my-6 text-gray-500 flex gap-4 justify-center flex-wrap">
        <span className="flex flex-col items-center">
          <span className="text-lg font-bold">520K</span>
          <span className="text-xs">Share</span>
        </span>
        {shares.map((item, ind) => {
          const Icon = item.name;
          return (
            <button
              key={ind}
              className={`py-2 px-5 ${item.color} rounded-xl flex text-white gap-3 items-center transition-all duration-300 hover:-translate-y-1`}
            >
              <Icon />
              <span>Share</span>
            </button>
          );
        })}
        <button
          className={`py-2 px-5 bg-green-400 rounded-xl flex text-white items-center transition-all duration-300 hover:-translate-y-1`}
        >
          <Share2 />
        </button>
      </div> 
    </>
  )
}

export default Share
