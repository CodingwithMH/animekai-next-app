"use client";
import { ChevronDown, Leaf } from "lucide-react";
import { useContext, useState } from "react";
import data from "../data/filters.json";
import FiltersContext from "../context/FiltersContext";
import { useDispatch } from "react-redux";
import { fetchAnimesByFilters } from "../store/animeSlice";
const FiltersBar = () => {
  const dispatch = useDispatch();
const { draftFilters, setDraftFilters, setAppliedFilters } = useContext(FiltersContext);
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (item) => {
    setOpenFilter(openFilter === item ? null : item);
  };
const handleChange = (e) => {
  const { type } = e.target;
  if (type==="text"){
    const { name, value } = e.target;
    setDraftFilters(prev=>({...prev,[name]:value}));
  }else {

    const { name, value, checked } = e.target;
    
    setDraftFilters((prev) => {
    if (name === "status" || name === "type" || name === "genre") {
      if (checked) {
        return {
          ...prev,
          [name]:
            prev[name] === "All"
              ? [value]
              : [...prev[name], value],
          page: 1,
        };
      } else {
        const updated = prev[name].filter((i) => i !== value);

        return {
          ...prev,
          [name]: updated.length === 0 && name!=="genre" ? "All" : updated,
          page: 1,
        };
      }
    }

    return {
      ...prev,
      [name]: value,
      page: 1,
    };
  });
}
};

return (
    <>
      <div
        className="mx-9 text-white"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div>
          <h1 className="font-bold text-2xl">Browse</h1>
          <div className="flex justify-between flex-wrap gap-3 text-sm">
            <input
              type="text"
              className="bg-[#0c1116] rounded-md p-2 flex-1"
              name="search"
              placeholder="Search..."
              onChange={handleChange}
            />
            {["Type", "Genre", "Status", "Total Episodes"].map((item) => {
              return (
                <div
                  onClick={() => toggleFilter(item)}
                  key={item}
                  className="bg-[#0c1116] text-gray-300 rounded-md p-2 text-sm relative flex justify-between items-center flex-1 select-none"
                >
                  <span>{item}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-all delay-100 ${openFilter === item ? "rotate-180" : ""}`}
                  />
                  {openFilter === item && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute top-full mt-1 left-0 bg-[#1A1F27] border border-gray-600 rounded-lg p-2 z-101 pointer-events-auto grid ${item==="Genre" ? "grid-cols-4 w-max": "grid-cols-1 w-full"} gap-1`}
                    >
                      {data.find(
                          (it) =>
                            it.name ===
                            openFilter.replaceAll(" ", "_").toLowerCase(),
                        )
                        .values.map((val) => {
                          return (
                            <label
                              htmlFor={val}
                              key={val}
                              className="px-3 py-2 text-xs rounded cursor-pointer transition flex gap-2 items-center text-gray-300 hover:bg-[#2A2F38]"
                            >
                              <input
                                type="checkbox"
                                name={openFilter
                                  .replaceAll(" ", "_")
                                  .toLowerCase()}
                                value={val}
                                id={val}
                                checked={
                                  Array.isArray(
                                    draftFilters[
                                      openFilter
                                        .replaceAll(" ", "_")
                                        .toLowerCase()
                                    ],
                                  ) &&
                                  draftFilters[
                                    openFilter
                                      .replaceAll(" ", "_")
                                      .toLowerCase()
                                  ].includes(val)
                                }
                                onChange={handleChange}
                              />
                              {val}
                            </label>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
            <button
              onClick={() => {
    setAppliedFilters({ ...draftFilters, page: 1 });
    dispatch(fetchAnimesByFilters({filters:draftFilters}));
  }}
              className="bg-[#E45F3A] hover:bg-[#fd7e14] text-white font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1 flex-1"
            >
              <Leaf className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersBar;
