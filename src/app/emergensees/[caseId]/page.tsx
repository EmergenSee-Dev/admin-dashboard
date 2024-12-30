import DashboardLayout from '@/components/DashboardLayout';
import React from 'react';

const SingleCase = () => {
  return (
    <DashboardLayout>
      <>
        <section className='bg-white p-4 rounded-xl'>
          <div className='flex justify-between'>
            <img src="/images/arrow-back.svg" alt="" className='w-6 h-6' />
            <p className='text-xs text-[#879297] my-auto'>Uploaded 21st November, 2024</p>
          </div>
          <img src="/images/image.png" className='my-4' alt="" />
          <div className='flex justify-between border-y border-[#CBCBCBC4] py-3'>
            <div className='flex'>
              <img src="/images/map.png" alt="" />
              <div className='p-2 my-auto'>
                <p className='text-[#0E4BF1] font-bold'>Precious Ebu</p>
                <p className='text-sm'>Fall incident at Lekki</p>
              </div>
            </div>
            <div className='flex justify-between w-[60%]'>
              <div className='my-auto'>
                <p className='text-sm'>Type of Incident</p>
                <p className='font-bold'>Fall </p>
              </div>
              <div className='my-auto'>
                <p className='text-sm'>Fall Height</p>
                <p className='font-bold'>15metres </p>
              </div>
              <div className='my-auto'>
                <p className='text-sm'>Number of People Injured</p>
                <p className='font-bold'>4 </p>
              </div>
              <div className='my-auto'>
                <p className='text-sm'>Time of Incident</p>
                <p className='font-bold'>12:00pm </p>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div></div>
            <div></div>
          </div>
        </section>
      </>
    </DashboardLayout>
  );
};

export default SingleCase;