"use client";

import { Suspense } from "react";
import FiltersContent from "./FiltersContent";

export default function FiltersPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-white">Loading...</div>}>
      <FiltersContent />
    </Suspense>
  );
}
