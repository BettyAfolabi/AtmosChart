import React from 'react'
import WeatherChart from '../components/linechart'

export default function page() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <WeatherChart />
    </div>
  )
}
