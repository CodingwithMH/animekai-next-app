"use client";
import { Filter, Search} from "lucide-react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { fetchAnimesByFilters } from "@/store/animeSlice";
import FiltersContext from "@/context/FiltersContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
const Hero = () => {
  const { appliedFilters, setDraftFilters, setAppliedFilters } = useContext(FiltersContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppliedFilters(prev=>({...prev,[name]:value,page:1}));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/filter");
    dispatch(fetchAnimesByFilters({filters:appliedFilters}));
  }

  return (
    <>
     <section className="relative flex justify-center items-center overflow-hidden h-screen bg-[url('/images/hero.jpg')] sm:rounded-4xl sm:mx-11 bg-size-120 bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 w-[50%] flex justify-center items-center flex-col gap-4">
          <img
            src="/images/logo.png"
            alt="logo"
            width={"200px"}
            height={"auto"}
          />
          <form className="relative w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full p-2 bg-white rounded-full pl-9 pr-14 focus:outline-none"
              placeholder="Search"
              name="search"
              onChange={handleChange}
            />
            <Search className="absolute z-11 h-4 w-4 top-3 left-2" />
            <button type="submit" className="absolute top-2 right-2 flex items-center hover:text-[#fd7e14]">
              <Filter fill="black" className="w-4 h-4 " />
              <span>Filter</span>
            </button>
          </form>
          <div className="text-white">
            <p>My Hero Academia, One Piece, The Banished</p>
            <p>Court, Spy X Family Season, A Wild Last Boss</p>
          </div>
          <Link
            href={"/Home"}
            className="bg-[#E45F3A] hover:bg-[#fd7e14] text-white text-xl py-2 px-8 rounded-lg text-center"
          >
            Watch Now
          </Link>
        </div>
      </section> 
    </>
  )
}

export default Hero
