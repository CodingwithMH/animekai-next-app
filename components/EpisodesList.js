"use client";
import React, { useState } from 'react'
import { Play, Check } from 'lucide-react'
import AnimeDetailsSection from './AnimeDetailsSections'
import { Link } from 'react-router-dom'

export default function EpisodesList({ episodes }) {
  const [watchedEpisodes, setWatchedEpisodes] = useState(
    new Set(episodes.filter((ep) => ep.watched).map((ep) => ep.number))
  )

  const toggleWatched = (episodeNumber) => {
    const newWatched = new Set(watchedEpisodes)
    if (newWatched.has(episodeNumber)) {
      newWatched.delete(episodeNumber)
    } else {
      newWatched.add(episodeNumber)
    }
    setWatchedEpisodes(newWatched)
  }

  return (
    <AnimeDetailsSection title={`Episodes (${episodes?.length})`}>
      <div className='space-y-2'>
        {episodes.map((episode) => {
          const isWatched = watchedEpisodes.has(episode?.episodeNumber)
          return (
            <Link to={`/watch/${episode?.slugs?.[0]}`}
              key={episode.episodeNumber}
              className='flex items-center gap-4 rounded-lg border border-gray-700 bg-gray-800 p-4 transition-colors hover:bg-gray-800/80'
            >
              {/* Episode Number and Play Button */}
              <button
                onClick={() => toggleWatched(episode?.episodeNumber)}
                className='shrink-0 rounded-full p-2 hover:bg-blue-600/20'
              >
                {/* {isWatched ? (
                  <Check className='h-5 w-5 text-primary' />
                ) : (
                  <Play className='h-5 w-5 text-gray-400' />
                )} */}
              </button>

              {/* Episode Info */}
              <div className='flex-1'>
                <div className='flex items-baseline gap-3'>
                  <span className='font-semibold text-gray-200'>Ep {episode?.episodeNumber}</span>
                  <span className='text-sm text-gray-200'>{episode?.title}</span>
                </div>
              </div>

              {/* Status Indicator */}
              {/* {isWatched && <span className='text-xs font-medium text-blue-600'>Watched</span>} */}
            </Link>
          )
        })}
      </div>

      {/* Load More */}
      {/* <div className='mt-6 text-center'>
        <button className='text-sm font-medium text-blue-600 hover:text-blue-600/90'>
          Load more episodes (131+)
        </button>
      </div> */}
    </AnimeDetailsSection>
  )
}