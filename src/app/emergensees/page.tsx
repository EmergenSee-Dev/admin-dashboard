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

  const [upload, setUpload] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch uploads with the active filter.
  // If active is "All", we fetch all uploads; otherwise, we add a query parameter.
  const getUpload = async () => {
    setError(null);
    try {
      let url = `https://backend-api-mxr6.onrender.com/api/emergensee/all`;
      if (active && active !== "All") {
        url += `?type=${encodeURIComponent(active)}`;
      }
      const response = await axios.get(url);
      if (response.data && Array.isArray(response.data.data)) {
        setUpload(response.data.data.reverse());
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error("Error fetching uploads:", error);
      setError("Failed to load uploads. Please try again later.");
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
      const response = await fetch("https://backend-api-mxr6.onrender.com/api/emergensee/download", {
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

  const handleDeleteAll = async () => {
    if (!window.confirm("WARNING: This will permanently delete all uploads. Are you sure you want to continue?")) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      
      // Delete all uploads in parallel for better performance
      const deletePromises = upload.map(item => 
        axios.delete(`https://backend-api-mxr6.onrender.com/api/emergensee/${item._id}`)
      );
      
      await Promise.all(deletePromises);
      
      // Clear the uploads after successful deletion
      setUpload([]);
      alert("All uploads have been deleted successfully!");
    } catch (error) {
      console.error("Error deleting uploads:", error);
      setError("An error occurred while deleting uploads. Some items may not have been deleted.");
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Handle single item delete
  const handleDeleteItem = (deletedId: string) => {
    setUpload(prevUploads => prevUploads.filter(item => item._id !== deletedId));
  };


  return (
    <>
      {/* <TotalSection /> */}
      <div className='p-4 bg-white rounded-xl'>
        <GoogleMapEmbed height={'400px'} address={upload[0]?.address} />
      </div>
      <section className='bg-white rounded-xl p-4 mt-4'>
        <div className='flex flex-col gap-3 lg:flex-row w-full lg:items-center lg:justify-between'>
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
            <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-[#DFDFDF] py-4'>
              <div className='flex flex-wrap gap-3 items-center'>
                <p className='uppercase font-bold my-auto'>all UPLOADS</p>
                <div className='flex gap-3 flex-wrap'>
                  <button 
                    onClick={() => handleDownloadCSV()} 
                    className='p-3 rounded-full bg-[#FFCC00] hover:bg-[#e6b800] transition-colors whitespace-nowrap'
                  >
                    Download CSV
                  </button>
                  <button 
                    onClick={handleDeleteAll} 
                    disabled={isDeleting || upload.length === 0}
                    className={`p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors whitespace-nowrap ${
                      (isDeleting || upload.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete All'}
                  </button>
                </div>
              </div>
              <p className='font-medium'>{upload.length} UPLOADS</p>
            </div>
            {error && (
              <div className='text-red-500 text-center py-4'>
                {error}
              </div>
            )}
            {upload.length > 0 ? (
              upload.map((single) => (
                <CaseCard 
                  key={single._id} 
                  data={single}
                  onDelete={handleDeleteItem}
                />
              ))
            ) : (
              <p className='text-center py-6'>
                No uploads found{active !== 'All' ? ` for ${active}` : ''}.
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
