import Link from 'next/link';
import React from 'react';

const UserCard = () => {
  return (
    <div className=" border-b border-[#DFDFDF] flex justify-between py-2">
      <div>
        <div className="flex">
          <p className="font-medium my-auto text-lg text-[#3D5059]">Precious Ebu</p>
        </div>
        <div className="flex text-sm text-[#9FA4A7] ">
          <p>Port Harcourt</p>
          <p className="font-medium ml-2">9 - Sep - 2022, 13:02</p>
        </div>
      </div>

      <div className='my-auto'>
        <Link href={'/users/uploads/123'}>
          <button className="bg-[#DBE6FF] text-[#2764E7] p-2 w-32 my-auto rounded-full ml-4 text-sm">View Records</button>
        </Link>
        <Link href={'/users/123'}>
          <button className="bg-[#DDC2E6] text-[#671C73] p-2 w-32 my-auto rounded-full ml-4 text-sm">View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;