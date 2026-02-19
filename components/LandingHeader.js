"use client";
import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const LandingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     <header className="max-sm:relative flex justify-center items-center py-7 text-white">
        {isOpen ? (
          <X
            onClick={() => setIsOpen(false)}
            className="sm:hidden h-5 w-5 absolute top-4 right-4"
          />
        ) : (
          <MenuIcon
            onClick={() => setIsOpen(true)}
            className="sm:hidden h-5 w-5 absolute top-4 right-4"
          />
        )}
        <nav className={`${isOpen ? "" : "max-sm:hidden"} mx-auto`}>
          <ul className="max-sm:flex-col max-sm:text-center flex gap-8">
            <li>
              <Link href={"/Home"} className="hover:text-[#ee559ce5]">
                Home
              </Link>
            </li>
            <li>
              <Link href={`/filter?type=TV`} className="hover:text-[#ee559ce5]">
                Movies
              </Link>
            </li>
            <li>
              <Link
                href={`/filter?type=Movie`}
                className="hover:text-[#ee559ce5]"
              >
                TV Series
              </Link>
            </li>
            <li>
              <Link
                href={`/filter?status=new_releases`}
                className="hover:text-[#ee559ce5]"
              >
                New Releases
              </Link>
            </li>
            <li>
              <Link
                href={`/filter?status=ongoing`}
                className="hover:text-[#ee559ce5]"
              >
                Ongoing
              </Link>
            </li>
          </ul>
        </nav>
      </header> 
    </>
  )
}

export default LandingHeader
