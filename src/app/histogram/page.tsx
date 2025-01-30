'use client'
import dynamic from 'next/dynamic';

const WeatherHistogram = dynamic(() => import('../components/histogram'), { ssr: false });

export default function page() {
  return (
    <div className='flex flex-col justify-center'>
      <WeatherHistogram />
    </div>
  )
}
