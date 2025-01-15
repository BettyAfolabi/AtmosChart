'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';

interface Forecast {
  dt_txt: string; 
  main: {
    temp: number;
    humidity: number; 
  };
}

interface ForecastData {
  list: Forecast[];
}

const WeatherChart = () => {
  const [chartData, setChartData] = useState<{ date: string; temp: number; humidity: number }[] | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=lagos&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: ForecastData = await response.json();

        const formattedData = data.list.map((item) => ({
          date: item.dt_txt, 
          temp: item.main.temp, 
          humidity: item.main.humidity, 
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Failed to fetch forecast data:', error);
      }
    };

    fetchForecast();
  }, []);

  if (!chartData) {
    return <div className='text-ocean font-bold text-sm sm:text-lg text-center flex flex-col items-center justify-center pt-10'>Loading chart data...</div>;
  }

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '2rem auto' }}>
      <h1 className='text-ocean font-bold py-5 text-base sm:text-xl mb-5'>Temperature and Humidity Over Time</h1>
      <LineChart width={800} height={400} data={chartData} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
        <CartesianGrid stroke="#0369a1" />
        <XAxis
          dataKey="date"
          tickFormatter={(tick) => tick.split(' ')[1].slice(0, 5)} 
          tick={{ fontSize: 10 }}
        ></XAxis>
        <YAxis tick={{ fontSize: 12 }}>
          <Label value="Values (°C / %)"  angle={-90} position="insideLeft" style={{ fontSize: 14 }} />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="temp" stroke="#FF4500" name="Temperature (°C)" />
        <Line type="monotone" dataKey="humidity" stroke="#4A90E2" name="Humidity (%)" />
      </LineChart>
    </div>
  );
};

export default WeatherChart;
