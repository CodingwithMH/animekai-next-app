"use client";
import { useDispatch, useSelector } from "react-redux"
import { fetchAnimesByFilters } from "../store/animeSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import FiltersContext from "../context/FiltersContext";
const PagingButtons = () => {
  const { filteredResultsPages } = useSelector(state => state.animes);
  const { appliedFilters, setAppliedFilters } = useContext(FiltersContext);
  const currentPage = appliedFilters.page;
  const dispatch = useDispatch();

  const pages = [
    currentPage === 1 ? currentPage : currentPage===filteredResultsPages ? currentPage-2 : currentPage - 1,
    currentPage === 1 ? currentPage+1 : currentPage===filteredResultsPages ? currentPage-1 : currentPage,
    currentPage === 1 ? currentPage + 2 : currentPage===filteredResultsPages ? currentPage : currentPage+1 
  ];

  const pageBtnClass = (page) =>
    `h-10 px-4 rounded-xl cursor-pointer
     ${page === currentPage
       ? "bg-[#e45f3a] text-white"
       : "bg-[#ffffff14] text-gray-400 hover:text-[#e45f3a]"}`;

// useEffect(() => {
//   console.log('From paging')
//   dispatch(fetchAnimesByFilters({filters:appliedFilters}));
// }, [appliedFilters.page,dispatch]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setAppliedFilters(prev => ({ ...prev, page: currentPage - 1 }));
      dispatch(fetchAnimesByFilters({filters:appliedFilters}));
    }
  };

  const handleNextClick = () => {
    if (currentPage < filteredResultsPages) {
      setAppliedFilters(prev => ({ ...prev, page: currentPage + 1 }));
      dispatch(fetchAnimesByFilters({filters:appliedFilters}));
    }
  };

  const handleClick = (page) => {
    setAppliedFilters(prev => ({ ...prev, page }));
    dispatch(fetchAnimesByFilters({filters:appliedFilters}));
  };

  return (
    <div className="flex my-8 justify-center relative z-9">
      <div className="flex gap-3">

        <button onClick={handlePrevClick} disabled={currentPage === 1} className="bg-[#ffffff14] h-10 px-4 rounded-xl text-gray-400 hover:text-[#e45f3a] disabled:opacity-40"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {pages.map(page => (
          <button key={page} disabled={currentPage===page} onClick={() => handleClick(page)} className={pageBtnClass(page)}
          >
            {page}
          </button>
        ))}

        <button onClick={handleNextClick} disabled={currentPage === filteredResultsPages} className="bg-[#ffffff14] h-10 px-4 rounded-xl text-gray-400 hover:text-[#e45f3a] disabled:opacity-40"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

export default PagingButtons;
