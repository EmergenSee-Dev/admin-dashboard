import React from 'react';
import SideNav from './SideNav';

const DashboardLayout = ({ children }: { children: any }) => {
  return (
    <>
      <header className='p-3 flex fixed top-0 w-full justify-end bg-white'>
        <img className='w-8 h-8' src="/images/notification.png" alt="" />
      </header>
      <div className='flex p-3 lg:mt-16'>
        <SideNav />
        <div className='w-full lg:ml-[19%] px-3'>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;