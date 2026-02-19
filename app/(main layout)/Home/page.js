"use client";
import { SquareArrowUpRight,Mic2Icon, Trophy, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import FilterCard from "@/components/FilterCard";
import Share from "@/components/Share";
import Tops from "@/components/Tops";
import Updates from "@/components/Updates";
import HomeHero from "@/components/HomeHero";

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

const Home = () => {
  const {animes,loading} = useSelector(state=>state.animes);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0);
  const [upcomings,setUpcomings] = useState([]);
  const [newRelease,setNewRelease] = useState([]);
  const [completed,setCompleted] = useState([]);
  const [latest,setLatest] = useState([]);
  const [updates,setUpdates] = useState([]);
  const [mode,setMode] = useState("all");
  useEffect(()=>{
    const fetchUpdates=async ()=>{
      try {
      const response = await axios.get(`${BASE_URI}/api/${mode==="all" ? "latest/episode" : "anime/dubbed"}?page=${page}&limit=20`);
      let upd_animes=response.data?.episodes || response.data?.data
      console.log('updates', response.data)
      setUpdates(upd_animes);
      setTotalPages(response.data?.totalPages || response.data?.pagination?.totalPages)
    } catch (error) {
        console.log('Error in Latest: ', error)
    }
    }
    fetchUpdates();
  },[page, mode])
  useEffect(()=>{
    const fetchLatest=async ()=>{
      try {
      const response = await axios.get(`${BASE_URI}/api/latest/anime`);
      let lat_animes=response.data.animes
      console.log('latest', lat_animes)
      setLatest(lat_animes);
    } catch (error) {
        console.log('Error in Latest: ', error)
    }
    }
    fetchLatest();
  },[])
  useEffect(()=>{
    const fetchUpcomings=async ()=>{
      try {
      const response = await axios.get(`${BASE_URI}/api/animelist?status=Not+yet+aired&limit=6`);
      console.log('Upcomings', response.data)
      let up_animes=response.data.animes
      setUpcomings(up_animes);
    } catch (error) {
        console.log('Error: ', error)
    }
    }
    fetchUpcomings();
  },[])

  useEffect(()=>{
    const fetchNewRelease=async ()=>{
      try {
      const response = await axios.get(`${BASE_URI}/api/animelist?status=Currently+Airing&limit=6`);
      console.log('NewRelease', response.data.animes)
      let up_animes=response.data.animes;
      setNewRelease(up_animes);
    } catch (error) {
        console.log('Error: ', error)
    }
    }
    fetchNewRelease();
  },[])
  useEffect(()=>{
    const fetchCompleted=async ()=>{
      try {
      const response = await axios.get(`${BASE_URI}/api/animelist?status=Finished+Airing&limit=6`);
      console.log('Completed', response.data.animes)
      let com_animes=response.data.animes
      setCompleted(com_animes);
    } catch (error) {
        console.log('Error: ', error)
    }
    }
    fetchCompleted();
  },[])
  return (
    loading ? (
      <div className="h-screen flex justify-center items-center">
      <img src="/images/loading.svg" alt="" />
      </div>
    ):
    (

      <>
      <HomeHero latest={latest}/>
      <div className="mt-10 md:mt-24 md:ml-10 md:w-[70%] mb-7 mx-5">
        <div className="md:hidden mb-5 bg-[#11161b] p-3 rounded-xl">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex shrink-0 justify-center items-center">
              <img src="/images/sharing.gif" alt="sharing" className="w-12 h-12"/>
            </div>
            <div className="flex flex-col max-w-40">
              <span className="font-semibold text-xl text-green-500">Love this site?</span>
              <span className="text-white text-sm">Share it and let others now!</span>
            </div>
            </div>
            <Share/>
          </div>
        </div>
        <div className="flex justify-between text-white">
        <h2 className="font-bold text-2xl ">LATEST UPDATES</h2>
        <div className="flex items-center space-x-3">
          <button onClick={()=>{setMode("all"); setPage(1)}} type="button" className={`cursor-pointer hover:text-green-600 ${mode==="all" && "text-green-600"}`}>ALL</button>
          <button onClick={()=>{setMode("dubbed"); setPage(1)}} type="button" className={`cursor-pointer hover:text-green-600 ${mode==="dubbed" && "text-green-600"}`}>DUBBED</button>
          <div className="flex gap-2">
            <button onClick={()=>setPage(prev=>prev>1 ? prev-1 : 1)} className="w-6 h-6 flex justify-center items-center rounded-full overflow-hidden bg-white hover:bg-green-600 cursor-pointer"><ChevronLeft className="h-4 w-4 text-black"/></button>
            <button onClick={()=>setPage(prev=>prev<totalPages ? prev+1 : totalPages)} className="w-6 h-6 flex justify-center items-center rounded-full overflow-hidden bg-white hover:bg-green-600 cursor-pointer"><ChevronRight className="h-4 w-4 text-black"/></button>
          </div>
        </div>
        </div>
        <div className="mt-8 w-full grid gap-3 grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {
          updates.map((episode,ind)=>{
              return <FilterCard anime={episode} key={episode.anime_id} />
            })
        }
        </div>
        <div className="w-full flex flex-wrap justify-center gap-3 md:justify-between">

        <Updates animes={newRelease} title={"New Release"} />
        <Updates animes={upcomings} title={"Upcoming"} />
        <Updates animes={completed} title={"Completed"} />
        </div>
        <div className="md:hidden w-full mt-5">

<Tops latest={latest}/>
        </div>
      </div>
    </>
    )
  )
}

export default Home
