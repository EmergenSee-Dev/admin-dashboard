'use client'

import CaseCard from '@/components/CaseCard';
import DashboardLayout from '@/components/DashboardLayout';
import TotalSection from '@/components/TotalSection';
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

const SingleUserUploads = () => {
  const [active, setActive] = useState("all")
  const [uploads, setUploads] = useState<any[]>([])
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // console.log(id)
  // https://backend-api-auvp.onrender.com/
  const getUploads = async () => {
    const response = await axios.get(`https://backend-api-mxr6.onrender.com/api/emergensee/user/${id}`)
    // console.log(response.data.data)
    setUploads(response.data.data)
  }

  useEffect(() => {
    getUploads()
  }, [])

  return (
    <>
      <TotalSection />
      <section className='bg-white rounded-xl p-4 mt-4'>
        <div className='flex w-full'>
          <input type="text" placeholder='Search' className='bg-[#EFEFEF] p-3 rounded-md w-72' />
        </div>
        {uploads.length >= 1 && <>
          <div className='flex justify-between border-b border-[#DFDFDF] py-6'>
            <p className='uppercase font-bold'>{uploads[0].author.name}  UPLOADS</p>
            <p className='font-medium'>{uploads.length}  UPLOADS</p>
          </div>
          {uploads.map((single: any) => <CaseCard key={single._id} data={single} />)}
        </>}
      </section>
    </>
  );
};

const userUploads = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<p className="text-gray-600 text-center py-4">Loading...</p>}>
        <SingleUserUploads />
      </Suspense>
    </DashboardLayout>
  );
};


export default userUploads;
