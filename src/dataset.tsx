'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

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
          `https://api.openweathermap.org/data/2.5/forecast?q=delft&appid=1dbda263f3c7d131922043bd42214a70&units=metric`
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
    return <div>Loading chart data...</div>;
  }

  return (
    <div>
      <h1>Temperature and Humidity Over Time</h1>
      <LineChart width={1000} height={500} data={chartData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" tickFormatter={(tick) => tick.split(' ')[1]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Temperature (°C)" />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
      </LineChart>
    </div>
  );
};

export default WeatherChart;
