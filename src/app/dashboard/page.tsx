'use client'

import Btn from "@/components/Btn";
import DashboardLayout from "@/components/DashboardLayout";
import TotalSection from "@/components/TotalSection";
import { formatDate } from "@/utils/formatData";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Import MultiplePinMap with SSR disabled
const MultiplePinMap = dynamic(
  () => import('@/components/MultiplePinMap'),
  { 
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-gray-100 flex items-center justify-center">Loading map...</div>
  }
);
export default function Home() {
  interface UploadItem {
    _id: string;
    name: string;
    author: {
      name: string;
    };
    type: string;
    lat?: number;
    lng?: number;
    address?: string;
    createdAt: string;
  }

  interface UserItem {
    _id: string;
    name: string;
    createdAt: string;
  }

  const [upload, setUpload] = useState<UploadItem[]>([])
  const [users, setUsers] = useState<UserItem[]>([])
  const [locations, setLocations] = useState<UploadItem[] | null>(null)

  // Client-side only code
  useEffect(() => {
    console.log("We are on the client!");
  }, []);

  const getUpload = async () => {
    const response = await axios.get(`https://backend-api-mxr6.onrender.com/api/emergensee/all`)
    console.log('Uploads data:', response.data.data);
    const uploads = response.data.data.reverse().filter((item: UploadItem) => item != null);
    console.log('Filtered uploads:', uploads);
    setLocations(uploads);
    setUpload(uploads);
  }

  const getUsers = async () => {
    const response = await axios.get(`https://backend-api-mxr6.onrender.com/api/users`)
    console.log('Users data:', response.data.data);
    const users = response.data.data.reverse().filter((user: UserItem) => user != null);
    console.log('Filtered users:', users);
    setUsers(users);
  }
  useEffect(() => {
    getUpload()
    getUsers()
  }, [])

  return (
    <DashboardLayout>
      <>
        <TotalSection />
        {locations && <div className="pt-3 rounded-md">
          <MultiplePinMap data={locations} />
        </div>}
        <section className="grid lg:grid-cols-2 gap-4 mt-3">
          <div className="bg-white p-6 rounded-xl">
            <div className="lg:flex justify-between border-b border-[#DFDFDF] pb-2">
              <p className="text-[#9FA4A7] font-medium">RECENT  UPLOADS</p>
              <Link href={'/emergensees'}>
                <p className="text-[#FFA31A]">See all</p>
              </Link>
            </div>
            {upload.length >= 1 && upload.slice(0, 3).map(single => <div key={single?._id} className=" border-b border-[#DFDFDF] py-2">
              <div className="flex">
                <p className="font-medium my-auto capitalize text-lg text-[#3D5059]">{single?.name}</p>
                <Btn type={single?.type} />
              </div>
              <div className="flex text-[#9FA4A7] ">
                <p>{single?.author?.name}</p>
                <p className="font-medium ml-2">{formatDate(new Date(single?.createdAt))}</p>
              </div>
            </div>)}
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between border-b border-[#DFDFDF] pb-2">
              <p className="text-[#9FA4A7] font-medium">All users</p>
              <Link href={'/users'}>
                <p className="text-[#FFA31A]">See all</p>
              </Link>
            </div>
            {users.length >= 1 && users.slice(0, 3).map((single: any) => <div key={single?._id} className=" border-b border-[#DFDFDF] lg:flex justify-between py-2">
              <div>
                <div className="flex">
                  <p className="font-medium my-auto text-lg text-[#3D5059]">{single?.name}</p>
                  <button className="bg-[#66B5FF33] text-[#3688FF] p-2 rounded-full ml-4 text-sm">New User</button>
                </div>
                <div className="flex text-[#9FA4A7] ">
                  {/* <p>Port Harcourt</p> */}
                  <p className="font-medium">{formatDate(new Date(single?.createdAt))}</p>
                </div>
              </div>
              <Link href={`/users/uploads/single?id=${single?._id}`}>
                <button className="bg-[#66B5FF33] text-[#3688FF] p-2 w-32 my-auto rounded-md lg:ml-4 text-sm">View Records</button>
              </Link>
            </div>)}
          </div>
        </section>
        <section className="mt-3 rounded-xl bg-white p-4 lg:pr-20">
          <div className="lg:flex justify-between mb-6">
            <p className="text-[#3D5059] uppercase sm:mb-4 font-medium">View all Uploads for emergencies</p>
            <Link href={'/emergensees'}>
              <button className="p-3 bg-[#F5DDD199] text-[#F57E43] rounded-md ">
                View All Uploads
              </button>
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-5 grid-cols-2">
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/fall.png" className="mx-auto" alt="" />
              <Link href={'/emergensees?filter=fall'}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl ">
              <img src="/images/assault.png" className="mx-auto" alt="" />
              <Link href={'/emergensees?filter=assault'}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/burn.png" className="mx-auto" alt="" />
              <Link href={'/emergensees?filter=burn'}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/accident.png" className="mx-auto" alt="" />
              <Link href={'/emergensees?filter=motor%20vehicle'}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/other.png" className="mx-auto" alt="" />
              <Link href={'/emergensees?filter=others'}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
          </div>
        </section>
      </>
    </DashboardLayout>
  );
}
