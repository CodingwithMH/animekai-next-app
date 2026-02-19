"use client";
import axios from 'axios';
import { Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react'

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

const AddAnime = ({anime}) => {
      const [episodes,setEpisodes] = useState([]);
    const [formData, setFormData] = useState(anime);
    const [showSubLink, setShowSubLink] = useState(false);
    const [showDubLink, setShowDubLink] = useState(false);
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    const fetchAllEpisodes = async () => {
      if (!anime) return;
    try {
      const response2 = await axios.get(`${BASE_URI}/api/episodes/${anime?._id}`);
      let ep2=response2.data
      console.log('Episodes are:', ep2)
      setEpisodes(ep2.episodes);
        } catch (error) {
        console.log('Error in Latest: ', error)
    }
    }
    useEffect(()=>{
        fetchAllEpisodes()
    },[anime?._id])
  return (
    <>
     <div className='flex pt-6 gap-3'>
        <div className='flex-4 space-y-3'>
            <form className='w-full space-y-3'>
                <div>
                <label htmlFor="title" className="block text-sm font-semibold mb-2">
                  Anime title <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData?.title}
                  onChange={handleChange}
                  required
                  placeholder="Anime Name"
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                />
              </div>
                <div>
                <label htmlFor="synopsis" className="block text-sm font-semibold mb-2">
                  Anime Synopsis <span className="text-black">*</span>
                </label>
                <textarea
                  id="synopsis"
                  name="synopsis"
                  value={formData?.synopsis}
                  onChange={handleChange}
                  required
                  placeholder="Anime Synopsis"
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                ></textarea>
              </div>
              <div>
                <h3 className='font-bold text-black'>Genres</h3>
                <div className='flex gap-2 flex-wrap'>
                    {
                        formData?.genres?.map((genre)=>{
                            return <span key={genre} className='text-blue-600 bg-blue-300 font-semibold text-sm p-2 rounded-full'>{genre}</span>
                        })
                    }
                </div>
              </div>
              <div className='border border-black p-4 rounded-xl shadow-lg space-y-3'>
                <h2 className='text-2xl font-bold text-red-600'>Add Episode</h2>
                <div className='flex gap-2'>

                <input type="number" name='episodeNumber' placeholder='Episode Number' className='w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition flex-1' />
                <input type="text" name='episodeTitle' placeholder='Episode Title' className='w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition flex-4' />
                </div>
                <div className='flex justify-between items-center'>
                    <span className='font-bold'>Sub Links</span>
                    <button type='button' onClick={()=>setShowSubLink(true)} className='bg-blue-600 px-4 py-2 text-white rounded-lg flex items-center'><Plus className='h-5 w-5 fill-white font-bold'/>Add Sub Link</button>
                </div>
                {showSubLink && <div className='flex justify-between items-center gap-2'>
                    <input type="text" name='subLink' placeholder='Sub Link URL' className='w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition' />
                    <button type='button' onClick={()=>setShowSubLink(false)}><Trash2 className='h-5 w-5 text-red-600 fill-red-600 font-bold'/></button>
                </div>}
                <div className='flex justify-between items-center'>
                    <span className='font-bold'>Dub Links</span>
                    <button type='button' onClick={()=>setShowDubLink(true)} className='bg-green-600 px-4 py-2 text-white rounded-lg flex items-center'><Plus className='h-5 w-5 fill-white font-bold'/>Add Dub Link</button>
                </div>
                {showDubLink && <div className='flex justify-between items-center gap-2'>
                    <input type="text" name='dubLink' placeholder='Dub Link URL' className='w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition' />
                    <button type='button' onClick={()=>setShowDubLink(false)}><Trash2 className='h-5 w-5 text-red-600 fill-red-600 font-bold'/></button>
                </div>}
              </div>
            </form>
            <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Episode Number
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {episodes?.map((ep) => (
              <tr
                key={ep?.episodeNumber}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-center text-gray-800 font-medium">
                  {ep?.episodeNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                  {ep?.title}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ep?.episodeNumber)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
        <div className='flex-1'>
            <img src={formData?.image} className='rounded-lg' alt="" height={"400px"} width={"auto"} />
        </div>
    </div> 
    </>
  )
}

export default AddAnime
