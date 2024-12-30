import React from 'react';

const Notification = ({ open, handleClose }: { open: boolean, handleClose: any }) => {
  return open &&
    <>
      <div onClick={() => handleClose()} className='bg-[#2B2B2B57] cursor-pointer fixed top-16 backdrop-blur-sm w-screen h-screen'></div>
      <div className='absolute w-[30%] top-20 right-4 bg-white p-4 rounded-xl'>
        <div className='flex  justify-between mb-1'>
          <p className='text-[#9FA4A7] text-sm'>Notifications</p>
          <p className='text-[#3688FF] text-sm'>See all</p>
        </div>
        {[1, 2, 3].map(single => <div className='py-3 border-b border-[#ABB3B7]'>
          <div className='bg-[#D7D7D833] rounded-md p-2 flex'>
            <img className='my-auto' src="/images/scheduler.png" alt="" />
            <div className='ml-3'>
              <p className='text-[#0E4BF1] font-medium text-sm'>New Emergency</p>
              <p className='text-xs'>Burn incident at Lekki</p>
              <p className='text-xs'>Tuesday, June 14, 2024 18:16:1</p>
            </div>
          </div>
        </div>)}
      </div>
    </>
};

export default Notification;