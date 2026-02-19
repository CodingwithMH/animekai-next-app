"use client";
import LandingHeader from "@/components/LandingHeader";
import { useState } from "react";

export default function RequestPage() {
  const [formData, setFormData] = useState({
    animeTitle: "",
    MALLink: "",
    reason: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ animeTitle: "", MALLink: "", reason: "", email: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen filterspage text-white py-12 px-4">
        <div className="absolute inset-0 bg-linear-to-b from-orange-900/10 to-transparent pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-8 mb-8">
            {submitted && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-600 rounded-lg text-green-300">
                Your request has been submitted successfully! Thank you for your
                interest.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="animeTitle"
                  className="block text-sm font-semibold mb-2"
                >
                  Anime Title <span className="text-[#E45F3A]">*</span>
                </label>
                <input
                  type="text"
                  id="animeTitle"
                  name="animeTitle"
                  value={formData.animeTitle}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Attack on Titan Season 5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition"
                />
              </div>

              <div>
                <label
                  htmlFor="MALLink"
                  className="block text-sm font-semibold mb-2"
                >
                  MyAnimeList Link
                </label>
                <input
                  type="url"
                  id="MALLink"
                  name="MALLink"
                  value={formData.MALLink}
                  onChange={handleChange}
                  placeholder="https://myanimelist.net/anime/..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition"
                />
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-semibold mb-2"
                >
                  Why should we add this?{" "}
                  <span className="text-[#E45F3A]">*</span>
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  placeholder="Tell us why you'd like to see this anime on AnimeKAI..."
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition resize-none"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                >
                  Your Email <span className="text-[#E45F3A]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E45F3A] hover:bg-[#E45F3A]/80 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Submit Request
              </button>
            </form>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#E45F3A]">
              Before you request:
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-[#E45F3A] mr-3">•</span>
                <span>
                  Make sure the anime isn't already available on our platform
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E45F3A] mr-3">•</span>
                <span>
                  Provide as much detail as possible to help us find the right
                  content
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E45F3A] mr-3">•</span>
                <span>We prioritize popular and recent anime releases</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E45F3A] mr-3">•</span>
                <span>
                  You'll receive an email update when your request is processed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
