import Link from 'next/link';
import React from 'react';

const CaseCard = () => {
  return (
    <div className="border-b border-[#DFDFDF] py-2 lg:flex justify-between">
      <div>
        <div className="flex sm:justify-between">
          <p className="font-medium my-auto text-lg text-[#3D5059]">Fall incident at Lekki</p>
          <button className="bg-[#1AA029] p-2 rounded-full text-white ml-4 text-sm">Fall Update</button>
        </div>
        <div className="flex text-[#9FA4A7] ">
          <p>Precious Ebu</p>
          <p className="font-medium ml-2">9 - Sep - 2022, 13:02</p>
        </div>
      </div>
      <Link href={'/emergensees/123'}>
        <button className='bg-[#66B5FF33] text-[#3688FF] sm:mt-3 p-2 px-6 my-auto'>View upload</button>
      </Link>
    </div>
  );
};

export default CaseCard;