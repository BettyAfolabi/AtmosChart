/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useCity } from '../context/city'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

const WeatherHistogram = () => {
  const { city } = useCity(); 
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchForecast = async (cityName: string)=> {
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: ForecastData = await response.json();

        const bins = {
          temperature: Array(10).fill(0),
          humidity: Array(10).fill(0),
        };

        const tempRange = { min: -10, max: 40 };
        const humidityRange = { min: 0, max: 100 };

        data.list.forEach((item) => {
          const tempBin = Math.floor(((item.main.temp - tempRange.min) / (tempRange.max - tempRange.min)) * 10);
          const humidityBin = Math.floor(((item.main.humidity - humidityRange.min) / (humidityRange.max - humidityRange.min)) * 10);

          if (tempBin >= 0 && tempBin < bins.temperature.length) bins.temperature[tempBin]++;
          if (humidityBin >= 0 && humidityBin < bins.humidity.length) bins.humidity[humidityBin]++;
        });

        const labels = Array.from({ length: 10 }, (_, i) => `${i * 10}% - ${(i + 1) * 10}%`);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Temperature Frequency',
              data: bins.temperature,
              backgroundColor: '#FF4500',
              barPercentage: 1.0,
              categoryPercentage: 1.0,
              borderWidth: 1,
              borderColor: '#ccc'
            },
            {
              label: 'Humidity Frequency',
              data: bins.humidity,
              backgroundColor: '#1E90FF',
              barPercentage: 1.0,
              categoryPercentage: 1.0,
              borderWidth: 1,
              borderColor: '#ccc'
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch forecast data:', error);
      }
    };

    if (city) {
      fetchForecast(city); 
    }
  }, [city]);

  if (!chartData) {
    return (
      <div className="text-ocean font-bold text-sm sm:text-lg text-center flex flex-col items-center justify-center pt-10">
        Loading histogram data...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '2rem auto' }}>
      <h1 className="text-ocean font-bold py-5 text-base sm:text-xl mb-5">
        Temperature and Humidity Histogram for {city}
      </h1>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Range',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Frequency',
              },
            },
          },
          elements: {
            bar: {
              borderWidth: 0.5,
            },
          },
        }}
        role="img"
        aria-label="Histogram chart showing frequency of temperature and humidity ranges"
      />
    </div>
  );
};

export default WeatherHistogram;
