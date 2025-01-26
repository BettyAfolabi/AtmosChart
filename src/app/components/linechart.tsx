/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import { useCity } from '../context/city';
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
  const { city, setCity } = useCity();
  const [inputCity, setInputCity] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`City not found or API error.`);
      }

      const data: ForecastData = await response.json();

      const formattedData = data.list.map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        humidity: item.main.humidity,
      }));

      setChartData(formattedData);
      setCity(cityName);
    } catch (error) {
      setError((error as Error).message || 'Failed to fetch forecast data.');
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast(city); 
  }, [city]);

  const handleSearch = () => {
    if (!inputCity.trim()) return;
    fetchForecast(inputCity.trim());
    setCity(inputCity.trim()); 
    setInputCity('');
  };

  return (
    <div className="p-4">
      <h1 className='text-ocean font-bold text-base pb-5 sm:text-xl mb-5'>{`${city}'s`} Temperature and Humidity Over Time</h1>
      <div className="w-5/6 mx-auto flex gap-2 my-6">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder='Enter a City name'
          className="basis-1/2 border border-accent rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 text-ocean placeholder:text-ocean"
        />
        <button
          onClick={handleSearch}
          className="basis-1/2 bg-sky text-white px-4 py-2 rounded-lg hover:bg-accent"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-ocean font-bold text-sm sm:text-lg text-center flex flex-col items-center justify-center pt-10">
          Loading chart data...
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {chartData && !loading && (
        <LineChart
        width={800} height={400} data={chartData} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}
        role="img"
        aria-label="Line chart showing frequency of temperature and humidity ranges"
        >
          <CartesianGrid stroke="#0369a1" />
          <XAxis
           dataKey="date"
           tickFormatter={(tick) => tick.split(' ')[1].slice(0, 5)} 
           tick={{ fontSize: 10 }}>
          </XAxis>
          <YAxis tick={{ fontSize: 12 }}>
            <Label value="Values (°C / %)"  angle={-90} position="insideLeft" style={{ fontSize: 14 }} />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" height={36} fontSize={10} />
          <Line type="monotone" dataKey="temp" stroke="#FF4500" name="Temperature (°C)" />
          <Line type="monotone" dataKey="humidity" stroke="#4A90E2" name="Humidity (%)" />
        </LineChart>
      )}
    </div>
  );
};

export default WeatherChart;
