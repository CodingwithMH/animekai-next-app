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
  useEffect(()=>{
    if (!type && !status && !genre && !search) dispatch(fetchAnimesByFilters({filters:{...initialFilters}}));

    if (!search){

      const name_array=[];
      const new_filters={...initialFilters,[type ? "type" : status ? "status" : "genre"]:[...name_array,type ? type : genre ? genre : status==="new_releases" ? "Not yet aired" : status==="ongoing" ? "Currently Airing" : "Finished Airing"]};
      setDraftFilters(new_filters);
      console.log('Drafts in Landing page', new_filters)
      dispatch(fetchAnimesByFilters({filters:new_filters}))
    }else {
      const new_filters=search==="All" ? {...initialFilters} : {...initialFilters,search};
      setDraftFilters(new_filters);
      console.log('Drafts in Landing page', new_filters)
      dispatch(fetchAnimesByFilters({filters:new_filters}))

    }
  },[type, status, genre, search, dispatch, setDraftFilters])

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
