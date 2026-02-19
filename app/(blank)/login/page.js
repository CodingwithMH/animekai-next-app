"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LandingHeader from '@/components/LandingHeader';
import { loginUser } from '@/store/userSlice';

const Login = () => {
  const { isAuthorized, loading, user } = useSelector((state) => state.user);
const dispatch=useDispatch();
const router=useRouter();
  const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
      });
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData))
        setFormData({ emailOrUsername: '', password: ''});
      };
      useEffect(()=>{
        if(isAuthorized) {
          router.push("/admin/animes")
        }
      },[isAuthorized, loading])
          
  return (
    <>
     <LandingHeader />
    <div className="min-h-screen filterspage text-white py-12 px-4">
      <div className="absolute inset-0 bg-linear-to-b from-orange-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">

        <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="emailOrUsername" className="block text-sm font-semibold mb-2">
                Email or Username <span className="text-[#E45F3A]">*</span>
              </label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                required
                pattern="^(?:[a-zA-Z0-9._]{3,20}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$"
                placeholder="e.g., Techxen Solutions or you@email.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition"
                />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Your Password <span className="text-[#E45F3A]">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E45F3A] focus:ring-1 focus:ring-[#E45F3A] transition"
                />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E45F3A] hover:bg-[#E45F3A]/80 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <div className='flex justify-center flex-wrap gap-2 mt-3'>
            <span>Don't have an account?</span><Link href={"/register"} className='text-gray-400 hover:text-gray-200 underline italic'>Register</Link>
          </div>
        </div>
      </div>
    </div> 
    </>
  )
}

export default Login
