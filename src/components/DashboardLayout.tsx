'use client'

import React, { useState } from 'react';
import SideNav from './SideNav';
import Notification from './Notification';

const DashboardLayout = ({ children }: { children: any }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className='p-3 flex fixed top-0 w-full justify-end bg-white'>
        <img className='w-10 h-10 cursor-pointer' onClick={() => setOpen(!open)} src="/images/notification.png" alt="" />
      </header>
      <div className='flex p-3 lg:mt-16'>
        <SideNav />
        <div className='w-full lg:ml-[19%] px-3'>
          {children}
        </div>
      </div>
      <Notification open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default DashboardLayout;