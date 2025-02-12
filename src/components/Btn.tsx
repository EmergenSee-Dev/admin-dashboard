import React from 'react';

const Btn = ({ type }: { type: string }) => {
  return (
    <div>
      <button className={`p-2 rounded-full capitalize text-white ml-4 text-sm ${type === 'fall' ? 'bg-[#1AA029]' : type === 'assault' ? 'bg-[#F57E43]' : type === 'burn' ? 'bg-[#A01A1A]' : type === 'motor vehicle' ? 'bg-[#2764E7]' : type === 'others' ? 'bg-[#671C73]' : ''}`}>{type} Update</button>
    </div>
  );
};

export default Btn;