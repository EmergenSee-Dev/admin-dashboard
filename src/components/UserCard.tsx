import { formatDate } from '@/utils/formatData';
import Link from 'next/link';
import React from 'react';

const UserCard = ({ data }: { data: any }) => {
  return (
    <div className=" border-b border-[#DFDFDF] lg:flex justify-between py-2">
      <div>
        <div className="flex">
          <p className="font-medium my-auto text-lg text-[#3D5059]">{data.name}</p>
        </div>
        <div className="flex text-sm text-[#9FA4A7] ">
          {/* <p>Port Harcourt</p> */}
          <p className="font-medium">{data && formatDate(new Date(data.createdAt))}</p>
        </div>
      </div>

      <div className='my-auto sm:flex sm:mt-2'>
        <Link href={`/users/uploads/${data._id}`}>
          <button className="bg-[#DBE6FF] text-[#2764E7] p-2 w-32 my-auto rounded-full lg:ml-4 text-sm">View Records</button>
        </Link>
        <Link href={`/users/${data._id}`}>
          <button className="bg-[#DDC2E6] text-[#671C73] p-2 w-32 my-auto rounded-full ml-4 text-sm">View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;