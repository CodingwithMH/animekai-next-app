"use client";
import { useEffect, useState } from 'react';
import { Trash2, Edit, Plus, GripVertical, Eye, EyeOff } from 'lucide-react';
import AddSlideForm from './AddSlideForm';
import Slide from './Slide';
import initialslides from "../data/slides.json";
import { useDispatch, useSelector } from 'react-redux';
import { addFeaturedAnime, fetchFeaturedAnimes, removeFeaturedAnime } from '../store/animeSlice';

const Slider = () => {
  const {featured,loading} = useSelector(state=>state.animes);
  const {userId} = useSelector(state=>state.user);
  const [slides, setSlides] = useState(initialslides);
  const [currentIndex,setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(userId!==""){
    dispatch(fetchFeaturedAnimes(userId.id))}
  },[])
  useEffect(() => {
    if (featured.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featured.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [featured]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: '', image: '' });
  const [draggedId, setDraggedId] = useState(null);

  const handleAddSlide = () => {
    if (formData.id && formData.image) {
      dispatch(addFeaturedAnime({id:formData.id,image:formData.image,userId:userId.id}));
      setFormData({ id: '', image: '' });
      setShowForm(false);
    }
  };

  const toggleSlideStatus = (id) => {
    setSlides(slides.map((slide) => (slide.id === id ? { ...slide, active: !slide.active } : slide)));
  };

  const deleteSlide = (id) => {
    dispatch(removeFeaturedAnime({id,userId:userId.id}));
  };

  const moveSlide = (id, direction) => {
    const index = slides.findIndex((s) => s.id === id);
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < slides.length - 1)) {
      const newSlides = [...slides];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newSlides[index], newSlides[swapIndex]] = [newSlides[swapIndex], newSlides[index]];
      setSlides(newSlides);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Slider Management</h1>
          <p className="text-gray-600 mt-1">Manage and customize homepage slider</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          Add Slide
        </button>
      </div>

      {showForm && <AddSlideForm setShowForm={setShowForm} formData={formData} setFormData={setFormData} handleAddSlide={handleAddSlide} /> }
{loading ? <div className="my-20 flex justify-center" style={{position:"relative", zIndex:"10"}}><img src="/images/loading.svg" alt="" /></div> :
<>
      {featured.length > 0 && (
        <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-bold text-gray-900 p-6 border-b border-gray-200">Preview</h2>
          <div className="relative h-64 bg-gray-200">
                <div key={featured[currentIndex]?.anime?.mal_id} className="relative w-full h-full">
                  <img src={featured[currentIndex]?.anime?.landScapeImage} alt={featured[currentIndex]?.anime?.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 bg-opacity-30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-4xl font-bold mb-2">{featured[currentIndex]?.anime?.title}</h3>
                      <p className="text-lg">{featured[currentIndex]?.anime?.synopsis.slice(0,200)+"..."}</p>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">All Slides</h2>
        {featured.map((slide, index) => <Slide slide={slide.anime} slides={featured} id={slide?._id} key={slide._id} index={index} toggleSlideStatus={toggleSlideStatus} deleteSlide={deleteSlide} moveSlide={moveSlide} /> )}
      </div>
      </>}
    </div>
  );
};

export default Slider;
