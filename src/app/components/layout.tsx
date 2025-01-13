'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <aside className="bg-sky flex flex-col justify-between h-screen py-5">
        <div className='px-7'>
        <h1 className="text-primaryOcean text-2xl mb-10">AtmosChart</h1>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem' }}>
              <Link href="/" className="flex gap-2">
                <i className="bx bx-home {`font-semibold ${pathname === '/' ? 'text-blue-600' : '#B3E5FC'}`}"></i>
                <p
                  className={`text-primaryOcean hidden md:block font-semibold text-sm ${pathname === '/' ? 'text-blue-600' : '#B3E5FC'}`}
                >
                  Home
                </p>
              </Link>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <Link href="/linechart" className="flex gap-2">
                <i className="bx bx-line-chart" style={{ color: '#B3E5FC' }}></i>
                <p
                  className={`hidden md:block font-semibold text-sm ${pathname === '/linechart' ? 'text-blue-600' : '#B3E5FC'}`}
                >
                  Line Chart
                </p>
              </Link>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <Link href="/histogram" className="flex gap-2">
                <i className="bx bx-bar-chart-alt-2" style={{ color: '#B3E5FC' }}></i>
                <p
                  className={`hidden md:block font-semibold text-sm ${pathname === '/histogram' ? 'text-blue-600' : '#B3E5FC'}`}
                >
                  Histogram
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        </div>
        <h4 className="text-primaryOcean px-7 text-nowrap">Thanks for Visiting</h4>
      </aside>

      {/* Main content */}
      <main className="bg-[url('/sky.jpg')] px-6 py-10" style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
