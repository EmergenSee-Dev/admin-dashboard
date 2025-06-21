import { formatDate } from '@/utils/formatData';
import Link from 'next/link';
import React from 'react';
import Btn from './Btn';

const CaseCard = ({ data }: { data: any }) => {

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch(`https://backend-api-mxr6.onrender.com/api/emergensee/${data?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete Emergensee record.");
      }
      alert("Emergensee deleted successfully!");
      window.location.reload();

      // Update the state (remove the deleted item from the list)
      // setEmergensees((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting Emergensee:", error);
      alert("Error deleting Emergensee. Please try again.");
    }
  };

  return (
    <div className="border-b border-[#DFDFDF] py-2 lg:flex justify-between">
      <div>
        <div className="flex sm:justify-between">
          <p className="font-medium my-auto text-lg capitalize text-[#3D5059]">{data?.name}</p>
          <Btn type={data?.type} />
          {/* <button className="bg-[#1AA029] p-2 rounded-full capitalize text-white ml-4 text-sm">{data?.type} Update</button> */}
        </div>
        <div className="flex text-[#9FA4A7] ">
          <p>{data?.author?.name}</p>
          <p className="font-medium ml-2">{formatDate(new Date(data?.createdAt))}</p>
        </div>
      </div>
      <div>
        <Link href={`/emergensees/single?id=${data?._id}`}>
          <button className='bg-[#66B5FF33] text-[#3688FF] sm:mt-3 p-2 px-6 my-auto'>View upload</button>
        </Link>
        <button className='p-3 my-auto' onClick={() => handleDelete()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CaseCard;
