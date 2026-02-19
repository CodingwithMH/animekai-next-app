"use client";
export default function AnimeDetailsSection({ title, children }) {
  return (
    <div className='mb-8 rounded-lg border border-gray-700 bg-gray-800 p-6'>
      <h2 className='mb-6 text-2xl font-bold text-gray-200'>{title}</h2>
      {children}
    </div>
  )
}