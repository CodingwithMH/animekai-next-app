"use client";
import { useState } from 'react';
import { ChevronLeft, Star, Calendar, Users, Clock } from 'lucide-react';
import initialAnimes from "@/data/animes.json"
import { useRouter } from 'next/navigation';

const Details = () => {
  const [activeTab, setActiveTab] = useState('info');
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  const animeDetails = {
    title: 'My Status as an Assassin Obviously Exceeds the Hero\'s',
    image: 'https://via.placeholder.com/400x500?text=Anime+Cover',
    rating: 8.5,
    releaseDate: 'January 10, 2024',
    episodes: 13,
    status: 'Ongoing',
    studios: 'A-1 Pictures',
    genres: ['Action', 'Adventure', 'Fantasy'],
    description: 'This is a detailed description of the anime. It covers the plot, characters, and other important information about the series.',
    seasons: [
      { season: 'Season 1', episodes: 13, year: 2024 },
      { season: 'Season 2', episodes: 12, year: 2025 },
    ],
    characters: [
      { name: 'Main Character', role: 'Protagonist' },
      { name: 'Supporting Character', role: 'Antagonist' },
      { name: 'Side Character', role: 'Support' },
    ],
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        <ChevronLeft size={20} />
        Back to Animes
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="shrink-0">
            <img
              src={initialAnimes[0].image || "/placeholder.svg"}
              alt={initialAnimes[0].title}
              className="w-48 h-64 object-cover rounded-lg shadow"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{initialAnimes[0].title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {initialAnimes[0].genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={20} />
                <div>
                  <p className="text-gray-600 text-sm">Rating</p>
                  <p className="text-xl font-bold text-gray-900">{initialAnimes[0].Rating}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="text-purple-400" size={20} />
                <div>
                  <p className="text-gray-600 text-sm">Release</p>
                  <p className="text-sm font-bold text-gray-900">{initialAnimes[0].Aired}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-green-400" size={20} />
                <div>
                  <p className="text-gray-600 text-sm">Episodes</p>
                  <p className="text-xl font-bold text-gray-900">{initialAnimes[0].episodes.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="text-red-400" size={20} />
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="text-sm font-bold text-green-600">{initialAnimes[0].Status}</p>
                </div>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
              Edit Details
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 flex">
          {['info', 'seasons', 'characters'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Anime Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Description</label>
                  <p className="text-gray-700 leading-relaxed">{initialAnimes[0].synopsis}</p>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Source</label>
                  <p className="text-gray-700">{initialAnimes[0].Source}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seasons' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Seasons</h3>
              <div className="space-y-3">
                {animeDetails.seasons.map((season, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-900">{season.season}</p>
                      <p className="text-sm text-gray-600">{season.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{season.episodes} Episodes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Characters</h3>
              <div className="space-y-3">
                {animeDetails.characters.map((char, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-900">{char.name}</p>
                      <p className="text-sm text-gray-600">{char.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
