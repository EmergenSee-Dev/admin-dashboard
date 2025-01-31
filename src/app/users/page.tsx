'use client'

import DashboardLayout from '@/components/DashboardLayout';
import UserCard from '@/components/UserCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const response = await axios.get('https://backend-api-auvp.onrender.com/api/users')
    console.log(response.data.data)
    setUsers(response.data.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

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
            {users.length >= 1 ? users.map((single: any) => <UserCard key={single._id} data={single} />) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;