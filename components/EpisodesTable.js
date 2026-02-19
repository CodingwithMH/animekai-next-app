"use client";
import { Edit2, Eye, Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const EpisodesTable = ({initialEpisodes, setAddEpisode}) => {
    const [episodes, setEpisodes] = useState(initialEpisodes);
    const [selectedEpisodes, setSelectedEpisodes] = useState([]);
    const [searchId, setSearchId] = useState("");
    console.log('initial ep', episodes)
    const filteredEpisodes = episodes.filter((episodes) =>
    episodes.episodeNumber>=Number(searchId),
  );

  useEffect(() => {
  setEpisodes(initialEpisodes);
}, [initialEpisodes]);

    const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEpisodes(filteredEpisodes.map((a) => a._id));
    } else {
      setSelectedEpisodes([]);
    }
  };

  const handleSelectEpisode = (id) => {
    setSelectedEpisodes((prev) =>
      prev.includes(id) ? prev.filter((a) => a._id !== id) : [...prev, id],
    );
  };

  const handleDelete = (id) => {
    setEpisodes((prev) => prev.filter((a) => a._id !== id));
    setSelectedEpisodes((prev) => prev.filter((a) => a !== id));
  };

  const handleDeleteSelected = () => {
    setEpisodes((prev) => prev.filter((a) => !selectedEpisodes.includes(a._id)));
    setSelectedEpisodes([]);
  };
  return (
    <>
      <div className="flex gap-4 my-6 w-full">
        <div className='text-2xl font-bold text-red-600 flex-1'>
            Episodes
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            placeholder="Search by Episode Number..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedEpisodes.length === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
        >
          Delete Selected
        </button>
        <button
          onClick={() => setAddEpisode(true)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Add Episode
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
                <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={
                    selectedEpisodes.length === filteredEpisodes.length &&
                    filteredEpisodes.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Sr#
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Sub Links
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Dub Links
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
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedEpisodes.includes(ep._id)}
                    onChange={() => handleSelectEpisode(ep._id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-center text-gray-800 font-medium">
                  {ep?.episodeNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                  {ep?.title}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                    <ul className='list-disc'>
                  {
                  ep?.link?.sub?.map((s)=>{
                    return <li key={s}>{s}</li>
                  })
                  
                  }
                    </ul>
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                    <ul className='list-disc'>
                  {
                  ep?.link?.dub?.map((d)=>{
                    return <li key={d}>{d}</li>
                  })
                  
                  }
                    </ul>
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
                      onClick={() => handleDelete(ep?._id)}
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
    </>
  )
}

export default EpisodesTable
