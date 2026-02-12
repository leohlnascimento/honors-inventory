import { useState } from 'react';
import { updateEquipment } from '../api/equipmentApi';
import { Equipment } from '../types';

export const useEditEqForm = (
  initialEquipment: Equipment,
  onUpdate: (updated: Equipment) => void,
  onClose: () => void
) => {
  const [formData, setFormData] = useState({
    model: initialEquipment.eqModel,
    type: initialEquipment.eqType,
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
      await updateEquipment(initialEquipment.eqId, {
        ceiModel: formData.model,
        ceiEqType: formData.type,
        ceiLocId: initialEquipment.eqLocId || 0, 
      });

      onUpdate({ 
        ...initialEquipment, 
        eqModel: formData.model, 
        eqType: formData.type 
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