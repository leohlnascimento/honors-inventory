import { useState } from 'react';
import { transferEquipment } from '../api/equipmentApi';
import { useLocations } from './useLocations';

export const useTransferEqForm = (onSuccess: () => void) => {
  const { locations, locationError } = useLocations();
  const [formData, setFormData] = useState({ equipmentId: '', locationId: '' });
  const [status, setStatus] = useState({ loading: false, message: '' });

  const submitTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.equipmentId || !formData.locationId) {
      setStatus({ loading: false, message: 'Please select both fields' });
      return;
    }

    setStatus({ loading: true, message: '' });
    try {
      await transferEquipment(Number(formData.equipmentId), Number(formData.locationId));
      setStatus({ loading: false, message: 'Transfer successful!' });
      setFormData({ equipmentId: '', locationId: '' });
      onSuccess();
    } catch {
      setStatus({ loading: false, message: 'Transfer failed' });
    }
  };

  return { 
    formData, 
    setFormData, 
    submitTransfer, 
    locations, 
    ...status, 
    error: locationError 
  };
};