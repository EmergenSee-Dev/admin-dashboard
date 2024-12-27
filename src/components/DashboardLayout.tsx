import React from 'react';
import SideNav from './SideNav';

const DashboardLayout = ({ children }: { children: any }) => {
  return (
    <>
      <div className='flex p-3'>
        <SideNav />
        <div className='w-full px-3'>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;