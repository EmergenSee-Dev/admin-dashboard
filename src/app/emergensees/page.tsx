'use client'

import CaseCard from '@/components/CaseCard';
import DashboardLayout from '@/components/DashboardLayout';
import TotalSection from '@/components/TotalSection';
import React, { useState } from 'react';

const emergensees = () => {
  const [active, setActive] = useState("all")
  const filters = [
    "All",
    "Fall Update",
    "Burn Update",
    "MVC Update",
    "Assault Update",
    "Other Cases"
  ]
  return (
    <DashboardLayout>
      <>
        <TotalSection />
        <section className='bg-white rounded-xl p-4 mt-4'>
          <div className='lg:flex w-full justify-between'>
            <div className='grid lg:grid-cols-6 grid-cols-3 sm:mb-3'>
              {filters.map(single => <button onClick={() => setActive(single)} className='lg:p-3 sm:py-3 sm:mb-2 my-auto rounded-full mr-4 lg:text-xs text-[10px] text-[#9FA4A7] lg:px-4 bg-[#EFEFEF]'>{single}</button>)}
            </div>
            <input type="text" placeholder='Search' className='bg-[#EFEFEF] p-3 rounded-md lg:w-72 w-full' />
          </div>
          <div className='flex justify-between border-b border-[#DFDFDF] py-6'>
            <p className='uppercase font-bold'>all  UPLOADS</p>
            <p className='font-medium'>14,000  UPLOADS</p>
          </div>
          {[1, 2, 3].map(single => <CaseCard />)}
        </section>
      </>
    </DashboardLayout>
  );
};

export default emergensees;