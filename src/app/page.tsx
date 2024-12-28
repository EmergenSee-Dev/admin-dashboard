import DashboardLayout from "@/components/DashboardLayout";
import TotalSection from "@/components/TotalSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <DashboardLayout>
      <>
        <TotalSection />
        <section className="grid grid-cols-2 gap-4 mt-3">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between border-b border-[#DFDFDF] pb-2">
              <p className="text-[#9FA4A7] font-medium">RECENT  UPLOADS</p>
              <Link href={''}>
                <p className="text-[#FFA31A]">See all</p>
              </Link>
            </div>
            {[1, 2, 3].map(single => <div className=" border-b border-[#DFDFDF] py-2">
              <div className="flex">
                <p className="font-medium my-auto text-lg text-[#3D5059]">Fall incident at Lekki</p>
                <button className="bg-[#1AA029] p-2 rounded-full text-white ml-4 text-sm">Fall Update</button>
              </div>
              <div className="flex text-[#9FA4A7] ">
                <p>Precious Ebu</p>
                <p className="font-medium ml-2">9 - Sep - 2022, 13:02</p>

              </div>
            </div>)}
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between border-b border-[#DFDFDF] pb-2">
              <p className="text-[#9FA4A7] font-medium">All users</p>
              <Link href={''}>
                <p className="text-[#FFA31A]">See all</p>
              </Link>
            </div>
            {[1, 2, 3].map(single => <div className=" border-b border-[#DFDFDF] flex justify-between py-2">
              <div>
                <div className="flex">
                  <p className="font-medium my-auto text-lg text-[#3D5059]">Precious Ebu</p>
                  <button className="bg-[#66B5FF33] text-[#3688FF] p-2 rounded-full ml-4 text-sm">New User</button>
                </div>
                <div className="flex text-[#9FA4A7] ">
                  <p>Port Harcourt</p>
                  <p className="font-medium ml-2">9 - Sep - 2022, 13:02</p>
                </div>
              </div>
              <button className="bg-[#66B5FF33] text-[#3688FF] p-2 w-32 my-auto rounded-md ml-4 text-sm">View Records</button>

            </div>)}
          </div>
        </section>
        <section className="mt-3 rounded-xl bg-white p-4 pr-20">
          <div className="flex justify-between mb-6">
            <p className="text-[#3D5059] uppercase font-medium">View all Uploads for emergencies</p>
            <button className="p-3 bg-[#F5DDD199] text-[#F57E43] rounded-md ">
            View All Uploads
            </button>
          </div>
          <div className="flex justify-between">
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/fall.png" alt="" />
              <Link href={''}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/assault.png" alt="" />
              <Link href={''}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/burn.png" alt="" />
              <Link href={''}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/accident.png" alt="" />
              <Link href={''}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
            <div className="bg-[#E0F0FF] p-4 text-center rounded-xl">
              <img src="/images/other.png" alt="" />
              <Link href={''}>
                <p className="text-[#1382BB] mt-2">View All</p>
              </Link>
            </div>
          </div>
        </section>
      </>
    </DashboardLayout>
  );
}
