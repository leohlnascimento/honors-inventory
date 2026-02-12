import { useState } from 'react';
import { updateEquipment } from '../api/equipmentApi';
import { Equipment } from '../types';

export const useEditEqForm = (
  initialEquipment: Equipment,
  onUpdate: (updated: Equipment) => void,
  onClose: () => void
) => {
  const [formData, setFormData] = useState({
    model: initialEquipment.model,
    type: initialEquipment.equipment_type,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateEquipment(initialEquipment.id, {
        model: formData.model,
        equipment_type: formData.type,
        location_id: initialEquipment.loc?.id || 0, 
      });

      onUpdate({ 
        ...initialEquipment, 
        model: formData.model, 
        equipment_type: formData.type 
      });
      onClose();
    } catch {
      setError('Failed to update equipment');
    } finally {
      setLoading(false);
    }
  };

  return { formData, updateField, submitEdit, loading, error };
};