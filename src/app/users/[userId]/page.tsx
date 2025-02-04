'use client'

import DashboardLayout from '@/components/DashboardLayout';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const singleUser = () => {
  const router = useRouter()
  const page = usePathname()
  const id = page.slice(7, page.length)
  const [user, setUser] = useState<any>(null)

  const getUser = async () => {
    const response = await axios.get(`https://backend-api-auvp.onrender.com/api/user/${id}`)
    // console.log(response.data.data)
    setUser(response.data.data)
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <DashboardLayout>
      <>
        <section className='bg-white rounded-xl lg:px-20 px-4 py-6'>
          <div className='flex mb-6 justify-between'>
            <div className='flex '>
              <img src="/images/back_svgrepo.com.png" onClick={() => router.back()} className='w-8 h-8 my-auto cursor-pointer' alt="" />
              <p className='text-xl ml-4 my-auto'>Profile</p>
            </div>
            <div className='flex'>
              {/* <button className='bg-[#C4CFE380] p-1 text-[#0E4BF1] my-auto rounded-md px-2 mr-6'>Edit Profile</button> */}
              {/* <img src="/images/user.png" alt="" /> */}
            </div>
          </div>
          <div className='lg:flex justify-between'>
            <div className='bg-[#D7D7D833] p-4 lg:w-[45%]  rounded-xl'>
              <p className='uppercase text-[#0E4BF1] font-bold'>Personal Information</p>
              <div className='flex justify-between  my-3'>
                <p className='font-bold'>Name</p>
                <p>{user?.name}</p>
              </div>
              <div className='flex justify-between  my-3'>
                <p className='font-bold'>Phone Number</p>
                <p>{user?.phoneNumber}</p>
              </div>
              {/* <div className='flex justify-between  my-3'>
                <p className='font-bold'>Other Names</p>
                <p>Sandra</p>
              </div>
              <div className='flex justify-between  my-3'>
                <p className='font-bold'>Gender</p>
                <p>Female</p>
              </div>
              <div className='flex justify-between  my-3'>
                <p className='font-bold'>Date of Birth</p>
                <p>Sandra</p>
              </div> */}
            </div>
            {/* <div className='bg-[#D7D7D833] sm:mt-3 lg:w-[45%] p-4 rounded-xl'>
              <p className='uppercase text-[#0E4BF1] font-bold'>Contact Information</p>
              <div className='flex justify-between my-3'>
                <p className='font-bold'>Email Address</p>
                <p>Sandra</p>
              </div>
              <div className='flex justify-between my-3'>
                <p className='font-bold'>Phone Number</p>
                <p>Sandra</p>
              </div>
              <div className=' my-3'>
                <p className='font-bold'>Address</p>
                <p>23, House Number, Name of Street, Maryland, Owo, Abuja, Federal Capital Territory, Nigeria</p>
              </div>

            </div> */}
          </div>
        </section>
      </>
    </DashboardLayout>
  );
};

export default singleUser;