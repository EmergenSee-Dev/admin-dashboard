import DashboardLayout from '@/components/DashboardLayout';
import UserCard from '@/components/UserCard';
import React from 'react';

const Users = () => {
  return (
    <DashboardLayout>
      <div className='p-4 bg-white rounded-xl'>
        <input type="text" placeholder='Search' className='p-3 bg-[#EFEFEF] rounded-md lg:w-1/2 w-full' />
        <div className='mt-8 p-4 rounded-md border border-[#D2D2D2]'>
          <div className='flex justify-between border-b border-[#DFDFDF] py-2'>
            <p className='uppercase font-bold'>All users</p>
            <p className='font-medium'>4,000  USERS</p>
          </div>
          <div>
            {[1, 2, 3, 4, 5, 6].map(single => <UserCard />)}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;