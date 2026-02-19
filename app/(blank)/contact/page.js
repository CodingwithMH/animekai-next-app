"use client";
import { useState } from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@animekai.pl',
      description: 'We typically respond within 24 hours',
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '24 - 48 hours',
      description: 'Business days only',
    },
    {
      icon: MapPin,
      title: 'Based In',
      details: 'Poland',
      description: 'Serving anime fans worldwide',
    },
  ];

  return (
    <>
    <LandingHeader />
    <div className="min-h-screen filterspage text-white py-12 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-orange-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-[#E45F3A]">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6 hover:border-[#E45F3A]/30 transition"
              >
                <div className="flex items-center mb-4">
                  <Icon className="w-8 h-8 text-[#E45F3A] mr-3" />
                  <h3 className="text-xl font-semibold">{info.title}</h3>
                </div>
                <p className="text-[#E45F3A] font-semibold mb-2">{info.details}</p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main Contact Section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-600 rounded-lg text-green-300 flex items-start">
                <span className="mr-3">✓</span>
                <div>
                  <p className="font-semibold">Message sent successfully!</p>
                  <p className="text-sm">Thank you for contacting us. We'll be in touch soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Your Name <span className="text-[#E45F3A]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address <span className="text-[#E45F3A]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject <span className="text-[#E45F3A]">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message <span className="text-[#E45F3A]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#E45F3A] hover:bg-[#E45F3A]/80 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ / Info Section */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#E45F3A] mb-2">
                    Is AnimeKAI free to use?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Yes! AnimeKAI is completely free to watch anime with both subbed and dubbed options. No premium subscription required.
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="font-semibold text-[#E45F3A] mb-2">
                    Do you have an app?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Currently, AnimeKAI is web-based and works seamlessly on both mobile and desktop devices. We're exploring app options for the future.
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="font-semibold text-[#E45F3A] mb-2">
                    How often is content updated?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Our library is updated daily, even hourly for the latest episodes and releases. We're constantly adding new titles.
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="font-semibold text-[#E45F3A] mb-2">
                    Report a bug or issue?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Please use the form on the left to report any bugs or technical issues. Include as much detail as possible to help us fix it faster.
                  </p>
                </div>
              </div>
            </div>

            {/* Support Links */}
            <div className="bg-orange-900/20 border border-[#E45F3A]/30 rounded-lg p-6">
              <h3 className="font-semibold text-[#E45F3A] mb-4">Other Ways to Help</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center">
                  <span className="text-[#E45F3A] mr-3">→</span>
                  <span>Report a bug or technical issue</span>
                </li>
                <li className="flex items-center">
                  <span className="text-[#E45F3A] mr-3">→</span>
                  <span>Request an anime to be added</span>
                </li>
                <li className="flex items-center">
                  <span className="text-[#E45F3A] mr-3">→</span>
                  <span>Suggest a feature or improvement</span>
                </li>
                <li className="flex items-center">
                  <span className="text-[#E45F3A] mr-3">→</span>
                  <span>Partnership or collaboration inquiries</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
                  </>
  );
}
