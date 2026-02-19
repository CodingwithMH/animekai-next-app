"use client";
import Link from 'next/link';
import { FaDiscord, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    const alphabets=["All","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  return (
    <>
      <footer className='bg-black'>
        <div className='flex p-8 items-center pb-0'>
            <span className='font-semibold text-3xl mr-3 text-white'>A-Z List</span>
            <span className='text-[#43484d]'>Searching anime order by alphabet name A to Z.</span>
        </div>
        <div className='flex gap-2 flex-wrap p-8'>
            {
                alphabets.map((alphabet)=>{
                    return <Link key={alphabet} href={`/filter?search=${alphabet}`} className='px-3 py-1 bg-[#11161b] hover:bg-gray-700 text-white rounded font-bold text-lg'>
                        {alphabet}
                    </Link>
                })
            }
        </div>
        <div className='flex gap-4 flex-wrap text-gray-300 text-sm font-bold p-8 pt-0'>
            <Link href={"/request"} className='hover:text-white'>REQUEST</Link>
            <Link href={"/contact"} className='hover:text-white'>CONTACT US</Link>
        </div>
        <hr className='border-gray-300'/>
        <div className='p-8 flex text-wrap justify-between flex-wrap text-sm'>
            <div className='flex flex-col'>
            <span className='text-gray-400'>Copyright &copy; AnimeKAI. All Rights Reserved</span>
            <span className='mt-1 text-gray-500 max-w-xl'>This site does not store any files on its server. All contents are provided by non-affiliated third parties.</span>
            <div className='text-gray-400 flex gap-4 my-2'>
                <Link href={"/"} className='hover:text-white'>
                <FaTwitter className='h-5 w-5'/>
                </Link>
                <Link href={"/"} className='hover:text-white'>
                <FaDiscord className='h-5 w-5'/>
                </Link>
            </div>
            <div className='text-gray-400 flex gap-2 my-2'>
                <span>Links:</span>
                <Link href={"/"} className='hover:text-white'>
                animekai,
                </Link>
                <Link href={"/"} className='hover:text-white'>
                sflix,
                </Link>
                <Link href={"/"} className='hover:text-white'>
                watch anime
                </Link>
            </div>
            </div>
            <div className='flex items-center'>
                <Link href={"/"}>
                <img src="/images/logo.png" alt="logo" width={"150px"} height={"auto"} />
                </Link>
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
