import { useState } from 'react';
import { transferEquipment } from '../api/equipmentApi';
import { useLocations } from './useLocations';

export const useTransferEqForm = (onSuccess: () => void) => {
  const { locations, locationError } = useLocations();
  const [formData, setFormData] = useState({ equipmentId: '', loc_id: '' });
  const [status, setStatus] = useState({ loading: false, message: '' });

  const submitTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.equipmentId || !formData.loc_id) {
      setStatus({ loading: false, message: 'Please select both fields' });
      return;
    }

    setStatus({ loading: true, message: '' });
    try {
      await transferEquipment(Number(formData.equipmentId), Number(formData.loc_id));
      setStatus({ loading: false, message: 'Transfer successful!' });
      setFormData({ equipmentId: '', loc_id: '' });
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