'use client'

import React, { Suspense, useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import TotalSection from '@/components/TotalSection';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import CaseCard from '@/components/CaseCard';
import GoogleMapEmbed from '@/components/Map';

const EmergenseesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the initial filter from the URL (default to "All")
  const initialFilter = searchParams.get('filter') || 'All';
  const [active, setActive] = useState(initialFilter);

  const filters = [
    { title: "All", value: "All" },
    { title: "Fall Update", value: "fall" },
    { title: "Burn Update", value: "burn" },
    { title: "MVC Update", value: "motor vehicle" },
    { title: "Assault Update", value: "assault" },
    { title: "Other Cases", value: "others" }
  ];

  const [upload, setUpload] = useState<any>([]);

  // Fetch uploads with the active filter.
  // If active is "All", we fetch all uploads; otherwise, we add a query parameter.
  const getUpload = async () => {
    let url = `https://backend-api-auvp.onrender.com/api/emergensee/all`;
    if (active && active !== "All") {
      url += `?type=${encodeURIComponent(active)}`;
    }
    try {
      const response = await axios.get(url);
      setUpload(response.data.data.reverse());
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  };

  // Re-fetch uploads when the active filter changes.
  useEffect(() => {
    getUpload();
  }, [active]);

  // Handle filter button click: update local state and URL query.
  const handleFilterClick = (filterType: any) => {
    setActive(filterType);
    router.push(`/emergensees?filter=${encodeURIComponent(filterType)}`);
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch("https://backend-api-auvp.onrender.com/api/emergensee/download", {
        method: "GET",
        headers: {
          "Content-Type": "text/csv",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download CSV");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "emergensees.csv"; // File name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Revoke the URL to free memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };


  return (
    <>
      {/* <TotalSection /> */}
      <div className='p-4 bg-white rounded-xl'>
        <GoogleMapEmbed height={'200px'} address={upload[0]?.address} />
      </div>
      <section className='bg-white rounded-xl p-4 mt-4'>
        <div className='lg:flex w-full justify-between'>
          <div className='grid lg:grid-cols-6 grid-cols-3 sm:mb-3'>
            {filters.map((single, index) => (
              <button
                key={index}
                onClick={() => handleFilterClick(single.value)}
                className='lg:p-3 sm:py-3 sm:mb-2 my-auto rounded-full mr-4 lg:text-xs text-[10px] text-[#9FA4A7] lg:px-4 bg-[#EFEFEF]'
              >
                {single.title}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder='Search'
            className='bg-[#EFEFEF] p-3 rounded-md lg:w-72 w-full'
          />
        </div>
        {upload && (
          <>
            <div className='lg:flex justify-between border-b border-[#DFDFDF] py-6'>
              <div className='flex '>
                <p className='uppercase font-bold my-auto'>all UPLOADS</p>
                <button onClick={() => handleDownloadCSV()} className='p-3 rounded-full bg-[#FFCC00] ml-6'>Download CSV</button>
              </div>
              <p className='font-medium'>{upload.length} UPLOADS</p>
            </div>
            {upload.length > 0 ? (
              upload.map((single: unknown, index: React.Key | null | undefined) => (
                <CaseCard key={index} data={single}  />
              ))
            ) : (
              <p className='text-center py-6'>
                No uploads found for <span className='font-bold'>{active}</span>.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
};

const Emergensees = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <EmergenseesContent />
      </Suspense>
    </DashboardLayout>
  );
};

export default Emergensees;
