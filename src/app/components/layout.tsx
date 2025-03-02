'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row-reverse h-screen">
      <main className="flex-1 bg-[url('/sky.webp')] bg-cover px-6 py-10 overflow-y-auto">
        {children}
      </main>

      <aside className="bg-sky flex md:flex-col py-4 md:py-5 md:w-[250px] md:px-5 md:h-full md:relative fixed bottom-0 w-full">
      <h1 className="hidden md:block text-primaryOcean text-2xl md:text-3xl my-14 sm:my-2">AtmosChart</h1>
  
        <nav className="flex w-full md:flex-col">
          <ul className="flex justify-around w-full md:block md:mt-8 md:space-y-2">
            <li>
              <Link href="/" aria-label='navigate to home page' passHref prefetch>
                <p
                  className={`flex items-center gap-2 ${
                    pathname === '/' ? 'text-blue-600' : 'text-[#B3E5FC]'
                  }`}
                >
                  <i className="bx bx-home text-2xl"></i>
                  <span
                    className={`hidden md:inline-block text-sm sm:text-[15px] xl:text-lg font-semibold`}
                  >
                    Home
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href="/linechart" aria-label='Navigate to line chart page' passHref prefetch>
                <p
                  className={`flex items-center gap-2 ${
                    pathname === '/linechart' ? 'text-blue-600' : 'text-[#B3E5FC]'
                  }`}
                >
                  <i className="bx bx-line-chart text-2xl"></i>
                  <span
                    className={`hidden md:inline-block text-sm sm:text-[15px] xl:text-lg font-semibold`}
                  >
                    Line Chart
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href="/histogram" aria-label='Navigate to histogram page' passHref prefetch>
                <p
                  className={`flex items-center gap-2 ${
                    pathname === '/histogram' ? 'text-blue-600' : 'text-[#B3E5FC]'
                  }`}
                >
                  <i className="bx bx-bar-chart-alt-2 text-2xl"></i>
                  <span
                    className={`hidden md:inline-block text-sm sm:text-[15px] xl:text-lg font-semibold`}
                  >
                    Histogram
                  </span>
                </p>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:block mt-auto">
          <h4 className="text-primaryOcean text-nowrap text-lg">Thanks for Visiting</h4>
        </div>
      </aside>
    </div>
  );
};

export default Layout;

