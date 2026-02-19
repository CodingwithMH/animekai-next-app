"use client";
import { createContext, useState } from "react";

const FiltersContext = createContext(null);

export const initialFilters={
  genre: [],
  type: "All",
  status: "All",
  search: "",
  page: 1,
  limit: 20,
};
export const FiltersProvider = ({ children }) => {
const [draftFilters, setDraftFilters] = useState(initialFilters);
const [appliedFilters, setAppliedFilters] = useState(initialFilters);


  return (
    <FiltersContext.Provider value={{ draftFilters, setDraftFilters, appliedFilters, setAppliedFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContext;
