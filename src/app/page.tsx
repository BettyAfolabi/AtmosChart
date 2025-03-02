import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-10 lg:pb-4">
      <h1 className="text-4xl font-bold text-ocean mb-8 text-center">
        Welcome to <span className="text-sky">AtmosChart</span>
      </h1>

      <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
        Your go-to weather dashboard for tracking temperature and humidity trends
        over the next 5 days!
      </p>

      <div className="my-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center justify-center bg-white transform transition-transform hover:translate-y-1 hover:scale-90 max-w-[400px] shadow-lg p-6 rounded-lg">
          <i className="bx bx-line-chart text-4xl text-blue-500 mb-4"></i>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 text-center">Interactive Line Chart</h3>
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            Visualize temperature changes over the next 5 days with an interactive line chart.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white shadow-lg p-6 rounded-lg transform transition-transform hover:translate-y-1 hover:scale-90 max-w-[400px]">
          <i className="bx bx-bar-chart-alt-2 text-4xl text-blue-500 mb-4"></i>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 text-center">Humidity Histogram</h3>
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            See the humidity levels at different times of the day through a detailed histogram.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-white shadow-lg p-6 rounded-lg transform transition-transform hover:translate-y-1 hover:scale-90 max-w-[400px]">
          <i className="bx bx-calendar text-4xl text-blue-500 mb-4"></i>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 text-center">5-Day Forecast</h3>
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            Get a detailed forecast for your city with the latest temperature and humidity information.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm sm:text-lg text-gray-600 text-center max-w-2xl">
       {` Whether you're planning your next trip or just curious about the weather, AtmosChart
        gives you the insights you need to stay prepared.`}
      </p>

      <Link href="/linechart" className="mt-8 px-6 py-2 text-white bg-accent rounded-lg hover:bg-sky focus:outline-none focus:ring-2 focus:ring-blue-600">
        Explore Weather Data
      </Link>
    </div>
  );
}
