'use client'

import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import Notification from './Notification';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { token } from '@/store/index';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [authTtoken, _] = useAtom(token)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!authTtoken) {
        router.replace('/');
      }
    }, 1000); // Delay by 500ms (adjust as needed)

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [authTtoken, router]);

  return (
    <>
      {/* Header */}
      <header className="p-3 flex items-center fixed top-0 w-full bg-white shadow-md z-50">
        <img src="/images/emergensee4.png" className="h-10 object-cover" alt="Logo" />
        <div className="ml-auto flex items-center gap-4">
          <img
            className="w-10 h-10 cursor-pointer md:hidden" // Hide on larger screens
            onClick={() => setShowSidebar(!showSidebar)}
            src="/images/menu.svg" // Use a menu icon for mobile
            alt="Menu"
          />
          <img
            className="w-10 h-10 cursor-pointer"
            onClick={() => setOpen(!open)}
            src="/images/notification.png"
            alt="Notifications"
          />
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-col md:flex-row p-3 mt-16">
        {/* Sidebar - Hidden on mobile, toggled via menu button */}
        <div
          className={`fixed p-4 left-0 lg:w-[23%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out
            ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
        >
          <SideNav />
        </div>

        {/* Content Area */}
        <div className="w-full lg:px-3">
          {children}
        </div>
      </div>

      {/* Notifications */}
      <Notification open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default DashboardLayout;
