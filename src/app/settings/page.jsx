import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const settings = () => {
  return (
    <DashboardLayout>
      <section>
        <div className='bg-white p-6 rounded-xl'>
          <p className='font-bold my-3'>Account</p>
          <p className='my-3'>Change Password</p>
          <p className='my-3'>Logout</p>
          <p className='my-3'>Delete Account</p>
        </div>
        <div className='bg-white p-6 rounded-xl mt-6'>
          <p className='font-bold my-3'>Help and Support</p>
          <p className='my-3'>Customer support</p>
          <p className='my-3'>Leave a complaint</p>
          <p className='my-3'>Visit our Website</p>
        </div>
      </section>
    </DashboardLayout>
  )
};

export default settings;