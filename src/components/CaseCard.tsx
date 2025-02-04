import { formatDate } from '@/utils/formatData';
import Link from 'next/link';
import React from 'react';

const CaseCard = ({ data }: { data: any }) => {
  return (
    <div className="border-b border-[#DFDFDF] py-2 lg:flex justify-between">
      <div>
        <div className="flex sm:justify-between">
          <p className="font-medium my-auto text-lg capitalize text-[#3D5059]">{data?.name}</p>
          <button className="bg-[#1AA029] p-2 rounded-full capitalize text-white ml-4 text-sm">{data?.type} Update</button>
        </div>
        <div className="flex text-[#9FA4A7] ">
          <p>{data?.author.name}</p>
          <p className="font-medium ml-2">{formatDate(new Date(data?.createdAt))}</p>
        </div>
      </div>
      <Link href={`/emergensees/${data?._id}`}>
        <button className='bg-[#66B5FF33] text-[#3688FF] sm:mt-3 p-2 px-6 my-auto'>View upload</button>
      </Link>
    </div>
  );
};

export default CaseCard;