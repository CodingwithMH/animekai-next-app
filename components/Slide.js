"use client";
import { Eye, EyeOff, GripVertical, Trash2 } from "lucide-react"

const Slide = ({slide, index, toggleSlideStatus, deleteSlide, moveSlide, slides,id}) => {
  return (
    <>
     <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              {/* <div className="shrink-0 pt-2">
                <GripVertical className="text-gray-400" size={20} />
              </div> */}

              <div className="w-24 h-32 shrink-0 bg-gray-200 rounded overflow-hidden">
                <img src={slide?.image} alt={slide?.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{slide?.title}</h3>
                      {/* <span
                        className={`px-2 py-1 rounded text-xs font-bold text-white ${
                          slide.active ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      >
                        {slide.active ? 'Active' : 'Inactive'}
                      </span> */}
                    </div>
                    <p className="text-gray-600 text-sm">{slide?.synopsis.slice(0,200)+"..."}</p>
                  </div>
                </div>
                <p className="text-sm mt-2">
                  <span className="font-bold">Status:</span> <span>{slide?.Status} | </span>  <span className="font-bold">Type:</span> <span> {slide?.Type} </span>
                </p>
              </div>

              <div className="shrink-0 flex flex-col gap-2">
                {/* <button
                  onClick={() => toggleSlideStatus(slide.mal_id)}
                  className={`p-2 rounded ${slide.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'} hover:opacity-80`}
                >
                  {slide.active ? <Eye size={18} /> : <EyeOff size={18} />}
                </button> */}
                {/* <button
                  onClick={() => moveSlide(slide.mal_id, 'up')}
                  disabled={index === 0}
                  className="px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSlide(slide.mal_id, 'down')}
                  disabled={index === slides.length - 1}
                  className="px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  ↓
                </button> */}
                <button
                  onClick={() => deleteSlide(id)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div> 
    </>
  )
}

export default Slide
