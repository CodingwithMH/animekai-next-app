"use client";
export const dynamic = "force-dynamic";
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react";
import FiltersBar from "@/components/FiltersBar";
import FilterCard from "@/components/FilterCard";
import { fetchAnimesByFilters } from "@/store/animeSlice";
import FiltersContext, { initialFilters } from "@/context/FiltersContext";
import PagingButtons from "@/components/PagingButtons";
import { useSearchParams } from "next/navigation";
const FiltersContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const genre = searchParams.get("genre");
  const search = searchParams.get("search");
  const { draftFilters, setDraftFilters, setAppliedFilters } = useContext(FiltersContext);
  const {filteredAnimes,loading} = useSelector(state=>state.animes);
  const dispatch = useDispatch();
useEffect(() => {
  let newFilters = { ...initialFilters };

  if (!type && !status && !genre && !search) {
    dispatch(fetchAnimesByFilters({ filters: newFilters }));
    setDraftFilters(newFilters);
    return;
  }

  if (search) {
    newFilters = search === "All" ? { ...initialFilters } : { ...initialFilters, search };
  } else {
    if (type) newFilters.type = [type];
    if (genre) newFilters.genre = [genre];
    if (status) {
      let statusValue = status;
      if (status === "new_releases") statusValue = "Not yet aired";
      else if (status === "ongoing") statusValue = "Currently Airing";
      else if (status === "finished") statusValue = "Finished Airing";
      newFilters.status = [statusValue];
    }
  }

  setDraftFilters(newFilters);
  dispatch(fetchAnimesByFilters({ filters: newFilters }));
}, [type, status, genre, search, dispatch, setDraftFilters]);


  return (
    <>
    <div className='pt-40 filterspage'>
      <FiltersBar />
      { 
      loading ? 
      <div className="my-20 flex justify-center" style={{position:"relative", zIndex:"10"}}><img src="/images/loading.svg" alt="" /></div> :
        <div className="m-10 mt-16 grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 text-white gap-5" style={{position:"relative",zIndex:9}}>

      {
        filteredAnimes.map((anime)=>{
          return <FilterCard anime={anime} key={anime.mal_id} />
        })
        }
        </div>
      }
        <PagingButtons />
    </div>
    </>
  )
}

export default FiltersContent;
