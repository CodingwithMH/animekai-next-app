"use client";
import { Star, Heart, Bookmark, Mic2Icon } from 'lucide-react'

export default function AnimeDetailsHero({
  posterImage,
  bannerImage,
  title,
  alternativeTitle,
  dub,
  type,
  episodes,
  sub,
  isFavorited,
  onFavoriteToggle,
}) {
  return (
    <div className='relative'>
      <div
        className='h-72 lg:h-80 xl:h-98 bg-cover bg-center'
        style={{
          backgroundImage: `url('${bannerImage}')`,
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background'></div>
      </div>

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4'>
        <div className='relative -mt-32 flex flex-wrap gap-8 max-[506px]:justify-center'>
          <div className='relative z-10 shrink-0'>
            <img
              src={posterImage}
              alt={title}
              className='h-80 w-56 rounded-lg border-4 border-gray-800 object-cover shadow-2xl'
            />
          </div>

          <div className='flex flex-1 flex-col justify-end pb-4'>
            <h1 className='text-4xl font-bold text-gray-200'>{title}</h1>
            <p className='mt-2 text-lg text-gray-400'>{alternativeTitle}</p>

            {/* Meta Info */}
            <div className='mt-6 flex flex-wrap gap-4 text-sm'>
              <div className="flex gap-2">
                 <span className='bg-[#e45f3a1e] text-[10px] p-px flex items-center text-[#E45F3A] border border-[#E45F3A] rounded-md'>CC {sub || 0}</span>
        <span className='bg-green-600/20 text-[10px] p-px text-green-600 border border-green-600 rounded-md flex items-center'><Mic2Icon className='h-4 w-4 mr-1'/><span>{dub || 0}</span></span>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <span>•</span>
                <span>{type}</span>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <span>•</span>
                <span>{episodes?.length} Episodes</span>
              </div>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={onFavoriteToggle}
                className={`border-gray-200 flex justify-center p-2 rounded-md items-center ${
                  isFavorited
                    ? 'bg-blue-600/20 text-blue-600 hover:bg-blue-600/30'
                    : 'text-gray-200 hover:bg-gray-800'
                }`}
              >
                <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Favorited' : 'Favorite'}
              </button>
              <button className='flex justify-center p-2 rounded-md items-center border-gray-200 text-gray-200 hover:bg-gray-800'>
                <Bookmark className='mr-2 h-4 w-4' />
                Bookmark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
