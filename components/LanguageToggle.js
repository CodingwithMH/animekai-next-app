"use client";
import React, { useState } from 'react'

const LanguageToggle = () => {
    const [language, setLanguage] = useState('en');
  return (
    <>
      <div className="relative flex w-28 h-7 bg-[#1A1F26] rounded-full cursor-pointer">
        
        <div 
          className={`absolute h-full w-1/2 bg-[#EB5E3D] rounded-full transition-all duration-300 ease-in-out ${
            language === 'jp' ? 'translate-x-full' : 'translate-x-0'
          }`}
        />

        <button
          onClick={() => setLanguage('en')}
          className={`relative z-10 flex-1 text-sm font-bold transition-colors duration-300 ${
            language === 'en' ? 'text-white' : 'text-gray-500'
          }`}
        >
          en
        </button>

        <button
          onClick={() => setLanguage('jp')}
          className={`relative z-10 flex-1 text-sm font-bold transition-colors duration-300 ${
            language === 'jp' ? 'text-white' : 'text-gray-500'
          }`}
        >
          jp
        </button>
      </div>
    </>
  )
}

export default LanguageToggle
