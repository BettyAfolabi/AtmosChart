'use client'
import dynamic from 'next/dynamic';

const WeatherChart = dynamic(() => import('../components/linechart'), { ssr: false });

export default function page() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <WeatherChart />
    </div>
  )
}
