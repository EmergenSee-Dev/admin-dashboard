import DashboardLayout from '@/components/DashboardLayout';
import UserCard from '@/components/UserCard';
import React from 'react';

const roles = () => {
  return (
    <DashboardLayout>
      {/* <TotalSection /> */}
      <div className='p-4 bg-white rounded-xl'>
        <div className='flex'>
          <input type="text" placeholder='Search' className='p-3 bg-[#EFEFEF] rounded-md lg:w-1/2' />
          <button className='text-[#2764E7] p-3 rounded-full bg-[#DBE6FF] px-6 ml-6'>Create New Admin</button>
        </div>
        <div className='mt-8 p-4 rounded-md border border-[#D2D2D2]'>
          <div className='flex border-b border-[#DFDFDF] py-2'>
            <p className='uppercase font-bold'>users with roles</p>
            {/* <p className='font-medium'>4,000  USERS</p> */}
          </div>
          <div>
            {[1, 2, 3].map(single => <UserCard />)}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default roles;