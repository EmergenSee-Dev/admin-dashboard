'use client'

import DashboardLayout from '@/components/DashboardLayout';
import UserCard from '@/components/UserCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const response = await axios.get('https://backend-api-mxr6.onrender.com/api/users')
    // console.log(response.data.data)
    setUsers(response.data.data.reverse())
  }

  const tryDeleteEndpoints = async (userId: string) => {
    const bases = [
      'https://backend-api-mxr6.onrender.com',
      'https://backend-api-auvp.onrender.com',
    ];
    const paths = [
      `/api/users/delete/${userId}`,
      `/api/users/remove/${userId}`,
      `/api/users?id=${userId}`,
      `/api/users/${userId}`,
      `/api/user/${userId}`,
    ];
    for (const base of bases) {
      for (const path of paths) {
        const url = base + path;
        try {
          await axios.delete(url);
          return { success: true, url };
        } catch (error: any) {
          // Continue to next endpoint
        }
      }
    }
    return { success: false };
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    const result = await tryDeleteEndpoints(userId);
    if (result.success) {
      setUsers((prev: any) => prev.filter((user: any) => user._id !== userId));
      alert('User deleted using endpoint: ' + result.url);
    } else {
      alert('Failed to delete user: No known endpoint worked.');
    }
  };

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
            <p className='font-medium'>{users.length}  USERS</p>
          </div>
          <div>
            {users.length >= 1 ? users.map((single: any) => <UserCard key={single._id} data={single} onDelete={handleDelete} />) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
