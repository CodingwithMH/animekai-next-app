"use client";
import { useEffect, useState } from "react";
import { Trash2, Edit, Plus, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AdsCard from "@/components/AdsCard";
import AddEditAds from "@/components/AddEditAds";
import { addAds, deleteAd, fetchAds, updateAd } from "@/store/adsSlice";

const AdsSection = () => {
  const {ads, loading} = useSelector(state=>state.ads);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    number:0,
    title: "",
    image: "",
    link: "",
  });
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAds())
  },[dispatch])
  const handleAddAd = () => {
    if (formData.number !== "" && formData.title.trim() && formData.image.trim() && formData.link.trim()) {
      console.log('Editing id', editingId)
      if (editingId) {
        dispatch(updateAd({id:editingId,formData:formData}))
        setEditingId(null);
      } else {
        dispatch(addAds({formData}))
      }
      setFormData({
        number:0,
        title: "",
        image: "",
        link: "",
      });
      setShowForm(false);
    }
  };

  const startEdit = (ad) => {
    setFormData({
      number:ad.number,
      title: ad.title,
      image: ad.image,
      link: ad.link,
    });
    setEditingId(ad._id);
    setShowForm(true);
  };

  const handleDeleteAd = (id) => {
    dispatch(deleteAd(id));
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ads Management</h1>
          <p className="text-gray-600 mt-1">
            Create and manage advertisements for Animekai.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: "",
              image: "",
              link: "",
            });
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          New Ad
        </button>
      </div>

      {showForm && (
        <AddEditAds
          formData={formData}
          setShowForm={setShowForm}
          setFormData={setFormData}
          editingId={editingId}
          setEditingId={setEditingId}
          handleAddAd={handleAddAd}
        />
      )}

      {loading ? <div className="my-20 flex justify-center" style={{position:"relative", zIndex:"10"}}><img src="/images/loading.svg" alt="" /></div>
       : 
       <>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.length>0 && ads.map((ad) => (
          <AdsCard
            key={ad._id}
            ad={ad}
            deleteAd={handleDeleteAd}
            startEdit={startEdit}
            />
        ))}
      </div>

      {ads.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg">No ads created yet.</p>
        </div>
      )}
      </>
      }
    </div>
  );
};

export default AdsSection;
