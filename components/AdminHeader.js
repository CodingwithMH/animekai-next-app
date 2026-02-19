"use client";
import { Moon, Sun, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/userSlice';

export default function AdminHeader({ darkMode, setDarkMode }) {
    const dispatch=useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  }
  return (
    <header className="bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-sm text-gray-500">Dashboard</h1>
        <h2 className="text-xl font-semibold text-gray-800">Animes Page</h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-gray-600" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          Clear Anime Cache
        </button>

        <button onClick={()=>handleLogout()} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
