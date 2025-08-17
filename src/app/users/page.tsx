'use client'

import DashboardLayout from '@/components/DashboardLayout';
import UserCard from '@/components/UserCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([])
  const [isDeleting, setIsDeleting] = useState(false)

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
    try {
      const url = `https://backend-api-mxr6.onrender.com/api/user/${userId}`;
      await axios.delete(url);
      setUsers((prev: any) => prev.filter((user: any) => user._id !== userId));
      alert('User deleted successfully.');
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleDeleteAll = async () => {
    if (users.length === 0) return;
    if (!window.confirm('WARNING: This will permanently delete ALL users. Are you sure you want to continue?')) {
      return;
    }
    try {
      setIsDeleting(true);
      for (const u of users as any[]) {
        try {
          await axios.delete(`https://backend-api-mxr6.onrender.com/api/user/${(u as any)._id}`);
        } catch (err) {
          // Continue deleting others even if one fails
          console.error('Failed to delete user', (u as any)._id, err);
        }
      }
      await getUsers();
      alert('All users deleted successfully.');
    } catch (error) {
      console.error('Batch delete failed:', error);
      alert('An error occurred while deleting users. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <DashboardLayout>
      <div className='p-4 bg-white rounded-xl'>
        <input type="text" placeholder='Search' className='p-3 bg-[#EFEFEF] rounded-md lg:w-1/2 w-full' />
        <div className='mt-8 p-4 rounded-md border border-[#D2D2D2]'>
          <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-[#DFDFDF] py-4'>
            <div className='flex items-center gap-3 flex-wrap'>
              <p className='uppercase font-bold my-auto'>All users</p>
              <div className='flex gap-3 flex-wrap'>
                <button 
                  onClick={handleDeleteAll}
                  disabled={isDeleting || users.length === 0}
                  className={`p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors whitespace-nowrap ${
                    (isDeleting || users.length === 0) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isDeleting ? 'Deleting...' : 'Delete All'}
                </button>
              </div>
            </div>
            <p className='font-medium'>{users.length} USERS</p>
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
