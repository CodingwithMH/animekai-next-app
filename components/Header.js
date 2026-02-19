"use client";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Menu,
  Search,
  Shuffle,
  User2,
  Users2,
  X,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import { useScrollVisibility } from "../hooks/useScrollVisibility";
import { useDispatch } from "react-redux";
import { fetchAnimes } from "../store/animeSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const visible = useScrollVisibility();
  const genres = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Herem",
    "Hintai",
    "Historical",
    "Horror",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
  ];
  const types = ["TV", "Movie", "OVA", "ONA", "Special"];

  const debounceRef = useRef(null);

const fetchSearchResults = async (e) => {
  const value = e.target.value;

  clearTimeout(debounceRef.current);

  debounceRef.current = setTimeout(async () => {
    if (value.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    setShowResults(true);

    try {
      const response = await axios.post(
        `${BASE_URI}/api/search`,
        { title: value }
      );
      setResults(response.data);
    } catch (err) {
      console.log(err);
    }
  }, 400);
};


  useEffect(() => {
    dispatch(fetchAnimes());
  }, []);
  return (
    <>
      <header
        className={`bg-[#0C1116] box-border flex justify-between m-4 mx-6 rounded-2xl p-3 fixed z-2 top-0 right-0 left-0 transition-all delay-100 duration-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-96 max-md:gap-2"}`}
      >
        <div className="flex gap-3 items-center relative">
          <Menu
            onClick={() => setShowDropdown((prev) => !prev)}
            className="text-white cursor-pointer"
          />
          <Link href={"/"} className="max-[550px]:hidden">
            <img
              src="/images/logo.png"
              alt="logo"
              width={"150px"}
              height={"auto"}
            />
          </Link>
          {showDropdown && (
            <div className="max-[835px]:hidden w-48 overflow-hidden bg-[#181d22] absolute z-3 left-0 top-[calc(100%+15px)] text-white rounded-md">
              <button
                onClick={() => setShowGenres((prev) => !prev)}
                className="flex justify-between w-full items-center cursor-pointer font-bold hover:bg-[#2A2F38] p-3 text-sm"
              >
                <span>GENRES</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all duration-300 ${showGenres === true ? "rotate-180" : ""}`}
                />
              </button>
              <div className="w-full flex flex-wrap">
                {showGenres &&
                  genres.map((item) => {
                    return (
                      <Link
                        key={item}
                        href={`/filter?genre=${item}`}
                        className="block w-1/2 hover:bg-[#2A2F38] p-2 text-gray-300 text-xs"
                      >
                        {item}
                      </Link>
                    );
                  })}
              </div>
              <button
                onClick={() => setShowTypes((prev) => !prev)}
                className="flex justify-between w-full items-center cursor-pointer font-bold hover:bg-[#2A2F38] p-3 text-sm"
              >
                <span>Types</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all duration-300 ${showTypes === true ? "rotate-180" : ""}`}
                />
              </button>

              {showTypes &&
                types.map((item) => {
                  return (
                    <Link
                      key={item}
                      href={`/filter?type=${item}`}
                      className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-xs"
                    >
                      {item}
                    </Link>
                  );
                })}
              <Link
                href={`/filter?status=new_releases`}
                className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-sm"
              >
                NEW RELEASES
              </Link>
              <Link
                href={`/filter?status=updates`}
                className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-sm"
              >
                UPDATES
              </Link>
              <Link
                href={`/filter?status=ongoing`}
                className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-sm"
              >
                ONGOING
              </Link>
              <Link
                href={`/filter?`}
                className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-sm"
              >
                RECENT
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 max-md:flex-1">
          <div className="relative max-md:w-full">
            <input
              type="text"
              className="w-full p-2 bg-[#181d22] text-white rounded-xl pl-9 pr-14 focus:outline-none"
              placeholder="Search anime"
              name="title"
              onChange={fetchSearchResults}
              onFocus={(e) => {
                if (e.target.value === "") {
                  setShowResults(false);
                  return;
                }
                setShowResults(true);
              }}
            />
            <Search className="absolute text-white z-11 h-4 w-4 top-3 left-2" />
            <div className="absolute select-none text-white top-3 right-2 flex items-center hover:text-[#fd7e14]">
              <Filter className="w-4 h-4 hover:fill-[#fd7e14]" />
              <span className="text-sm max-[300px]:hidden">Filter</span>
            </div>
            {showResults && (
              <div className="w-full rounded-lg overflow-hidden bg-[#181d22] absolute top-[calc(100%+13px)]">
                <div className="space-y-1 m-1 max-h-60 overflow-y-auto searchresults">
                  {results.length > 0 ? (
                    results.map((res, ind) => {
                      return (
                        <Link
                          href={`/details/${res?.slugs?.[0]}`}
                          key={ind}
                          className="flex text-white text-sm font-semibold gap-2"
                        >
                          <img
                            src={res?.image}
                            alt=""
                            className="h-20 w-auto"
                          />
                          <div className="font-bold text-gray-400 space-y-1">
                            <p className="text-white">
                              {res?.title?.slice(0, 23) + "..."}
                            </p>
                            <p>{res?.Status}</p>
                            <p>• {res?.Type}</p>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-gray-400 py-2 px-2">
                      No results found
                    </div>
                  )}
                </div>
                <Link
                  href={"/filter?"}
                  className="inset-0 w-full bg-[#E45F3A] text-white font-bold py-2 flex justify-center gap-2"
                >
                  View More <ArrowRight className="w-6" />
                </Link>
              </div>
            )}
          </div>
          <div className="flex gap-4 max-[835px]:hidden">
            <Link href={"/"}>
              <Users2 className="h-7 w-7 text-white" />
            </Link>
            <Link href={"/"}>
              <Shuffle className="h-7 w-7 text-white" />
            </Link>
            <LanguageToggle />
            <button
              onClick={() => router.push("/login")}
              className="rounded-full bg-gray-800 p-2 cursor-pointer"
            >
              <User2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`transition-all duration-200 min-[835px]:hidden fixed top-0 ${showDropdown === true ? "translate-x-0" : "-translate-x-full"} w-screen h-screen overflow-hidden bg-[#181d22] z-1000 text-white rounded-md flex flex-col overflow-y-scroll`}
      >
        <X
          onClick={() => setShowDropdown(false)}
          className="w-7 h-7 font-bold absolute top-6 left-4 hover:cursor-pointer"
        />
        <button
          onClick={() => setShowGenres((prev) => !prev)}
          className="flex justify-between w-full items-center cursor-pointer font-bold hover:bg-[#2A2F38] p-3 text-sm mt-16"
        >
          <span>GENRES</span>
          <ChevronDown
            className={`w-5 h-5 transition-all duration-300 ${showGenres === true ? "rotate-180" : ""}`}
          />
        </button>
        <div className="w-full flex flex-wrap">
          {showGenres &&
            genres.map((item) => {
              return (
                <Link
                  onClick={() => setShowDropdown(false)}
                  key={item}
                  href={`/filter?genre=${item}`}
                  className="block hover:bg-[#2A2F38] p-2 text-gray-300 text-xs"
                >
                  {item}
                </Link>
              );
            })}
        </div>
        <button
          onClick={() => setShowTypes((prev) => !prev)}
          className="flex justify-between w-full items-center cursor-pointer font-bold hover:bg-[#2A2F38] p-3 text-sm"
        >
          <span>Types</span>
          <ChevronDown
            className={`w-5 h-5 transition-all duration-300 ${showTypes === true ? "rotate-180" : ""}`}
          />
        </button>

        {showTypes &&
          types.map((item) => {
            return (
              <Link
                onClick={() => setShowDropdown(false)}
                key={item}
                href={`/filter?type=${item}`}
                className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-xs"
              >
                {item}
              </Link>
            );
          })}
        <Link
          onClick={() => setShowDropdown(false)}
          href={`/filter?status=new_releases`}
          className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-sm"
        >
          NEW RELEASES
        </Link>
        <Link
          onClick={() => setShowDropdown(false)}
          href={`/filter?status=updates`}
          className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-sm"
        >
          UPDATES
        </Link>
        <Link
          onClick={() => setShowDropdown(false)}
          href={`/filter?status=ongoing`}
          className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-sm"
        >
          ONGOING
        </Link>
        <Link
          onClick={() => setShowDropdown(false)}
          href={`/filter?`}
          className="block w-full hover:bg-[#2A2F38] p-2 text-gray-300 text-sm"
        >
          RECENT
        </Link>
        <div className="w-full flex gap-4 min-[835px]:hidden max-[835px]:justify-center max-[835px]:flex-wrap">
          <Link onClick={() => setShowDropdown(false)} href={"/"}>
            <Users2 className="h-7 w-7 text-white" />
          </Link>
          <Link onClick={() => setShowDropdown(false)} href={"/"}>
            <Shuffle className="h-7 w-7 text-white" />
          </Link>
          <LanguageToggle />
          <button
            onClick={() => {
              setShowDropdown(false);
              router.push("/login");
            }}
            className="rounded-full bg-gray-800 p-2"
          >
            <User2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
