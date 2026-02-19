"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '@/store/userSlice';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

function AdminLayout({children}) {
    const [darkMode, setDarkMode] = useState(false);
  const { loading, user, isAuthorized } = useSelector(
    (state) => state.user
  );
  const router = useRouter();
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    }
  }, [isAuthorized, loading, user]);

  return (
    
    <>
        <div className={`flex min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
        <AdminHeader darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
            {children}
        </main>
          </div>
          </div>
    </>
  )
}

export default AdminLayout
