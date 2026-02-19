"use client";
import { PawPrint, List, FileText, Megaphone, Maximize2, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const menuItems = [
    { id: 'animes', label: 'Animes List', icon: List },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'ads', label: 'Ads Section', icon: Megaphone },
    { id: 'slider', label: 'Slider', icon: Maximize2 },
    { id: 'email', label: 'Email Dispatcher', icon: Mail },
  ];
  return (
    <aside className="w-48 bg-gray-100 border-r border-gray-300 flex flex-col p-4">
      <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-300">
        <PawPrint className="w-6 h-6 text-gray-800" />
        <span className="text-lg font-bold text-gray-800">Dashboard</span>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === `/admin/${item.id}`;
          return (
            <Link href={`/admin/${item.id}`}
              key={item.id}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
