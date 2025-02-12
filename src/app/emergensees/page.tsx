'use client'

import CaseCard from '@/components/CaseCard';
import DashboardLayout from '@/components/DashboardLayout';
import TotalSection from '@/components/TotalSection';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { title } from 'process';

const Emergensees = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the initial filter from the URL (default to "All")
  const initialFilter = searchParams.get('filter') || 'All';
  const [active, setActive] = useState(initialFilter);

  const filters = [
    {
      title: "All",
      value: "All"
    },
    {
      title: "Fall Update",
      value: "fall"
    },
    {
      title: "Burn Update",
      value: "burn"
    },
    {
      title: "MVC Update",
      value: "motor vehicle"
    },
    {
      title: "Assault Update",
      value: "assault"
    },
    {
      title: "Other Cases",
      value: "others"
    }
  ];

  const [upload, setUpload] = useState([]);

  // Fetch uploads with the active filter.
  // When active is "All", we fetch all uploads; otherwise, we include the filter as a query parameter.
  const getUpload = async () => {
    let url = `https://backend-api-auvp.onrender.com/api/emergensee/all`;
    if (active && active !== "All") {
      url += `?type=${encodeURIComponent(active)}`;
    }
    try {
      const response = await axios.get(url);
      setUpload(response.data.data);
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  };

  // Fetch data whenever the active filter changes
  useEffect(() => {
    getUpload();
  }, [active]);

  // Handle filter clicks:
  // 1. Update the active filter state.
  // 2. Update the URL query parameter so the filter is reflected in the URL.
  const handleFilterClick = (filterType: any) => {
    setActive(filterType);
    router.push(`/emergensees?filter=${encodeURIComponent(filterType)}`);
  };

  return (
    <DashboardLayout>
      <>
        <TotalSection />
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
              <div className='flex justify-between border-b border-[#DFDFDF] py-6'>
                <p className='uppercase font-bold'>all UPLOADS</p>
                <p className='font-medium'>{upload.length} UPLOADS</p>
              </div>
              {upload.length > 0 ? (
                upload.map((single, index) => (
                  <CaseCard key={index} data={single} />
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
    </DashboardLayout>
  );
};

export default Emergensees;
