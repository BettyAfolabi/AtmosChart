'use client'
import React, { createContext, useContext, useState } from 'react';

interface CityContextProps {
  city: string;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextProps | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState<string>('Lagos'); 

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = (): CityContextProps => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};

