import { useState } from 'react';
import { addEquipment } from '../api/equipmentApi';
import { useLocations } from './useLocations';

export const useAddEqForm = (onSuccess: () => void) => {
  const { locations, locationError } = useLocations();
  const [formData, setFormData] = useState({ model: '', type: '', loc_id: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const model = formData.model.trim();
    const type = formData.type.trim();

    if (model.length < 3) {
      setError('Model name is too short (min 3 chars)');
      return;
    }

    if (type.length < 3) {
      setError('Type name is too short (min 3 chars)');
      return;
    }
    
    if (!formData.loc_id) {
      setError('Please select a valid location');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addEquipment({ 
        ceiModel: model, 
        ceiEqType: type, 
        ceiLocId: Number(formData.loc_id) 
      });
      setFormData({ model: '', type: '', loc_id: '' });
      onSuccess();
    } catch {
      setError('Failed to add equipment');
    } finally {
      setLoading(false);
    }
  };

  return { formData, updateField, submitForm, locations, loading, error: error || locationError };
};