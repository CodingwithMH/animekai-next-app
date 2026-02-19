"use client";
import React, { useEffect, useState } from 'react'
import { MessagesSquare, Mic2Icon, Reply, Share, ThumbsUp, Trophy, User } from 'lucide-react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import EpisodeNumbers from '@/components/EpisodeNumbers'
import AnimeDescription from '@/components/AnimeDescription'
import Breadcrums from '@/components/Breadcrums'
import Tops from '@/components/Tops'

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

const WatchMovie = () => {
  const {slug} = useParams();
  const [episode,setEpisode] = useState(null);
  const [episodes,setEpisodes] = useState([]);
  const [anime,setAnime] = useState(null);
  const [comments,setComments] = useState([]);
  const [loading,setLoading] = useState(false);
  const [start,setStart] = useState(1);
  const [end,setEnd] = useState(12);
  const [latest,setLatest] = useState([]);
  
  const fetchEpisode = async () => {
    try {
    setLoading(true);
    const response = await axios.get(`${BASE_URI}/api/episode/${slug}`);
    let ep=response.data
    console.log('updates', ep)
    setEpisode(ep.episode);
    setAnime(ep.anime);
      } catch (error) {
      console.log('Error in Latest: ', error)
  }
  }
  const fetchAnimeDetails = async () => {
    if (!anime) return;
  try {
        setLoading(true);
    const response2 = await axios.get(`${BASE_URI}/api/comment/${anime.mal_id}`);
    let ep2=response2.data
    console.log('comments are:', ep2)
    setComments(ep2);
    setLoading(false)
      } catch (error) {
      console.log('Error in Latest: ', error)
  }
  }
  const fetchAllEpisodes = async () => {
    if (!anime) return;
  try {
        setLoading(true);
    const response2 = await axios.get(`${BASE_URI}/api/episodes/${anime._id}?start=${start}&end=${end}`);
    let ep2=response2.data
    console.log('Episodes are:', ep2)
    setEpisodes(ep2.episodes);
    setLoading(false)
      } catch (error) {
      console.log('Error in Latest: ', error)
  }
  }
  useEffect(()=>{
    fetchEpisode()
  },[slug])
  useEffect(()=>{
    fetchAllEpisodes()
    fetchAnimeDetails()
  },[anime, start, end])
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
  
  return (
    <>
      <div className={`${loading ? "":"pt-40"} filterspage min-h-screen`}>
    {loading ? <div className="text-white font-black text-3xl my-16 text-center h-screen flex justify-center items-center"><img src="/images/loading.svg" alt="" /></div> :
    (<>
      <div className='flex gap-8 mx-8 max-lg:flex-wrap' style={{zIndex:10,position:"relative"}}>
        <div className='lg:w-[75%] w-full'>
          <div className='rounded-t-2xl bg-[#0C1116] inset-0 p-3'> 
            <Breadcrums anime={anime}/>
          </div>
          <div className="relative w-full aspect-video bg-black">
  <iframe
    src={episode?.link?.sub[0] || "/sample.mp4"}
    className="absolute top-0 left-0 w-full h-full rounded-xl"
    allowFullScreen
  />
</div>

          <div className='rounded-b-2xl bg-[#0C1116] inset-0 p-4'> 
            <div className='flex justify-between'>
              <span className='font-bold text-white'>You are watching Episode {episode?.episodeNumber}</span>
              <div className="flex gap-2">
                 <span className='bg-[#e45f3a1e] text-[10px] p-px flex items-center text-[#E45F3A] border border-[#E45F3A] rounded-md'>CC {anime?.totalSubbed || 0}</span>
        <span className='bg-green-600/20 text-[10px] p-px text-green-600 border border-green-600 rounded-md flex items-center'><Mic2Icon className='h-3 w-3'/><span>{anime?.totalDubbed || 0}</span></span>
              </div>
            </div>
            <p className='text-gray-400 text-sm mt-3'>If current server doesn't work please try other servers beside</p>
          </div>
        </div>
        <EpisodeNumbers episodes={episodes} episode={episode} fetchEpisode={fetchEpisode}/>
      </div>
      <AnimeDescription anime={anime}/>
      </>)}
    <div className="mb-7 mx-5 flex max-md:flex-col gap-8" style={{zIndex:10,position:"relative"}}>
      <div className='shrink-0 max-md:w-full md:flex-1'>
        <span className='flex gap-3'>
        <h2 className='text-2xl text-white font-bold'>Comments</h2>
        <span className='bg-[#E45F3A] px-1 text-white h-fit rounded-sm text-sm'>On</span>
        </span>
        <div className='flex justify-between items-center text-white my-5'>
          <div className='text-lg font-bold flex gap-1'>
            <MessagesSquare className='h-6 w-6'/>
            <span>{comments?.length} Comments</span>
          </div>
          <div className='text-sm'>
            <span>Sort By</span>
          </div>
        </div>
        <div className='space-y-2'>

        <div className='flex gap-2 py-3'>
          <div className='bg-[#E45F3A] h-8 w-8 rounded-full flex justify-center items-center'>
            <User className='h-6 w-6 text-white' fill='white'/>
          </div>
          <textarea name="comment" placeholder='Write your comments...' className='bg-black/60 placeholder:text-gray-500 flex-1 rounded-sm text-sm p-2 focus:outline-none text-white' rows={2}></textarea>
        </div>
        {
          comments.map((comment)=>{

            return <div key={comment._id} className='flex gap-2 border-b-[0.01px] border-gray-400 py-3'>
          <div className='bg-[#E45F3A] h-8 w-8 rounded-full flex justify-center items-center'>
            <User className='h-6 w-6 text-white' fill='white'/>
          </div>
          <div className='space-y-1'>
            <div className='flex items-center gap-5'>
          <span className='text-white font-bold'>{comment?.user?.username}</span>
          <p className='text-sm text-gray-400'>33 days</p>
            </div>
          <p className='text-sm text-gray-300'>{comment?.comment}</p>
          <div className='text-sm text-gray-400 flex gap-2 mt-3'>
            <div className='flex items-center gap-1'>
              <Reply className='w-5 h-5'/> <span>Reply</span>
            </div>
            <div className='flex items-center gap-1'>
              <ThumbsUp className='w-5 h-5' /> <span>{comment?.likes.length}</span>
            </div>
          </div>
          </div>
        </div>
          })
        }
        </div>
      </div>
        <div className="rounded-2xl overflow-hidden bg-[#0C1116] p-2 shrink-0 w-full max-md:flex-1 md:w-[35%] lg:w-[30%] xl:w-[25%]">
                <Tops latest={latest} />
        </div>
      </div>
    </div>
    </>
  )
}

export default WatchMovie
