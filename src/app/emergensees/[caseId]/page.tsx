'use client'

import DashboardLayout from '@/components/DashboardLayout';
import { formatDate } from '@/utils/formatData';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SingleCase = () => {
  const router = useRouter()
  const [upload, setUpload] = useState<any>(null)
  const page = usePathname()
  const id = page.slice(13, page.length)
  
  const getUpload = async () => {
    const response = await axios.get(`https://backend-api-auvp.onrender.com/api/emergensee/single/${id}`)
    // console.log(response.data.data)
    setUpload(response.data.data)
  }
  useEffect(() => {
    getUpload()
  }, [])
  return (
    <DashboardLayout>
      <>
        {upload && <section className='bg-white p-4 rounded-xl'>
          <div className='flex justify-between'>
            <img src="/images/arrow-back.svg" alt="" className='w-6 h-6 cursor-pointer' onClick={() => router.back()} />
            <p className='text-xs text-[#879297] my-auto'>Uploaded {formatDate(new Date(upload.createdAt))}</p>
          </div>
          <img src={upload.image} className='my-4 w-full rounded-md h-96 object-cover' alt="" />
          <div className='lg:flex justify-between border-y border-[#CBCBCBC4] py-3'>
            <div className='flex sm:mb-3'>
              <img src="/images/map.png" alt="" />
              <div className='p-2 my-auto'>
                <p className='text-[#0E4BF1] font-bold'>{upload.author.name}</p>
                <p className='text-sm capitalize'>{upload.name}</p>
              </div>
            </div>
            <div className='lg:flex justify-between lg:w-[60%]'>
              <div className='lg:my-auto my-2'>
                <p className='text-sm'>Type of Incident</p>
                <p className='font-bold capitalize'>{upload.type} </p>
              </div>
              <div className='lg:my-auto my-2'>
                <p className='text-sm'>Fall Height</p>
                <p className='font-bold'>{upload.height} </p>
              </div>
              <div className='lg:my-auto my-2'>
                <p className='text-sm'>Number of People Injured</p>
                <p className='font-bold'>{upload.number_of_injured} </p>
              </div>
              <div className='lg:my-auto my-2'>
                <p className='text-sm'>Time of Incident</p>
                <p className='font-bold'>{upload.time_of_incident} </p>
              </div>
            </div>
          </div>
          <div className='lg:flex justify-between mt-4'>
            <div className='lg:w-[71%]'>
              <p className='text-[#9C9C9F] uppercase mb-3'>Incident description</p>
              <div className='p-4 rounded-xl bg-[#D4E3E84F]'>
                <p>A fall accident occurred in Lekki earlier today, resulting in injuries to four individuals. The incident took place at a construction site on Admiralty Road when scaffolding unexpectedly gave way during ongoing work. The workers lost their balance, falling from a significant height. Emergency responders quickly arrived on the scene, providing first aid before rushing the injured to a nearby hospital. </p>
              </div>
            </div>
            <div className='lg:w-[28%]'>
              <p className='text-[#9C9C9F] uppercase mb-3'>Map (Location of incident)</p>
              <div className='p-4 rounded-xl bg-[#D4E3E84F]'>
                <div className='flex justify-between'>
                  <img src="/images/map.png" alt="" />
                  <button className='bg-[#1AA029] rounded-full text-white px-3 py-2 text-sm my-auto'>Click to view</button>
                </div>
                <p className='mt-1'>Road 15, Victoria Island, Lekki
                  Lagos Nigeria.</p>
              </div>
            </div>
          </div>
        </section>}
      </>
    </DashboardLayout>
  );
};

export default SingleCase;