import { useState, useEffect } from 'react';
import { getAllLocations } from '../api/locationApi';
import { Location as AppLoc } from '../types';

export const useLocations = () => {
  const [locations, setLocations] = useState<AppLoc[]>([]);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    getAllLocations()
      .then(res => setLocations(res.data.data))
      .catch(() => setLocationError('Failed to fetch locations'));
  }, []);

  return { locations, locationError };
};