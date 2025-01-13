'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface NOAAData {
  metadata: Record<string, any>;
  results: Array<Record<string, any>>;
}

function NOAATest() {
  const [data, setData] = useState<NOAAData | null>(null);
  const token = 'XvzXxaoMRFzktPqdhLvHoUgNKETlnLpv'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://www.ncei.noaa.gov/cdo-web/api/v2/datacategories',
          {
            headers: {
              token: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData: NOAAData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default NOAATest;
