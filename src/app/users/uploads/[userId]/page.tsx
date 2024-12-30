'use client'

import CaseCard from '@/components/CaseCard';
import DashboardLayout from '@/components/DashboardLayout';
import TotalSection from '@/components/TotalSection';
import React, { useState } from 'react';

const userUploads = () => {
  const [active, setActive] = useState("all")

  return (
    <DashboardLayout>
      <>
        <TotalSection />
        <section className='bg-white rounded-xl p-4 mt-4'>
          <div className='flex w-full'>
            <input type="text" placeholder='Search' className='bg-[#EFEFEF] p-3 rounded-md w-72' />
          </div>
          <div className='flex justify-between border-b border-[#DFDFDF] py-6'>
            <p className='uppercase font-bold'>Alabo  UPLOADS</p>
            <p className='font-medium'>14  UPLOADS</p>
          </div>
          {[1, 2, 3].map(single => <CaseCard />)}
        </section>
      </>
    </DashboardLayout>
  );
};

export default userUploads;