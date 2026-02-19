"use client";
import { Edit, Eye, EyeOff, Trash2 } from "lucide-react";

const AdsCard = ({ ad, startEdit, deleteAd }) => {
  return (
    <>
      <div
        className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
      >
        <div className="relative h-40 bg-gray-200 overflow-hidden">
          <img
            src={ad.image || "/placeholder.svg"}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute top-2 right-2">
            <span
              className={`px-3 py-1 rounded text-xs font-bold text-white ${
                ad.active ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {ad.active ? "Active" : "Inactive"}
            </span>
          </div> */}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-2">{ad.title}</h3>
          <div className="space-y-2 mb-4">
          </div>

          <div className="flex gap-2">
            {/* <button
              onClick={() => toggleAdStatus(ad.id)}
              className={`flex-1 py-2 rounded text-sm font-medium ${
                ad.active
                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {ad.active ? (
                <Eye size={16} className="mx-auto" />
              ) : (
                <EyeOff size={16} className="mx-auto" />
              )}
            </button> */}
            <button
              onClick={() => startEdit(ad)}
              className="flex-1 py-2 rounded text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <Edit size={16} className="mx-auto" />
            </button>
            <button
              onClick={() => deleteAd(ad._id)}
              className="flex-1 py-2 rounded text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200"
            >
              <Trash2 size={16} className="mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdsCard;
