"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideNav = () => {
  const navs = [
    {
      title: "users",
      link: '/users'
    },
    {
      title: "emergensees",
      link: '/emergensees'
    },
    {
      title: "blog",
      link: '/blog'
    },
    // {
    //   title: "roles",
    //   link: '/roles'
    // },
    // {
    //   title: "settings",
    //   link: '/settings'
    // },
    {
      title: "logout",
      link: '/'
    },
  ]
  const useIsCurrentRoute = (route: string) => {
    const router = usePathname();
    if (router === route) {
      return true;
    }
  };

  return (
    <div className='h-screen'>
      <Link href={'/dashboard'}>
        <div className={`my-6 ${useIsCurrentRoute('/dashboard') && 'bg-[#FFCC00] p-3 rounded-xl'}`}>
          <p className='uppercase text-[#3D5059] font-bold'>Dashboard</p>
        </div>
      </Link>
      {navs.map(nav => <Link key={nav.title} href={nav.link}>
        <div className={`flex my-5 px-3 ${useIsCurrentRoute(nav.link) ? 'bg-[#FFCC00] p-3 rounded-xl' : ''}`}>
          <img className='mr-3 w-4 h-4 my-auto' src={`/images/icons/${nav.title}.svg`} alt="" />
          <p className='capitalize font-medium'>{nav.title}</p>
        </div>
      </Link>)}
    </div>
  );
};

export default SideNav;