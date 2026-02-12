import { useState, useEffect } from 'react';
import { getAllLocations } from '../api/locationApi';
import { Location } from '../types';

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    getAllLocations()
      .then(res => setLocations(res.data))
      .catch(() => setLocationError('Failed to fetch locations'));
  }, []);

  return { locations, locationError };
};