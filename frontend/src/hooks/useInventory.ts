import { deleteEquipment } from '../api/equipmentApi';
import { Equipment } from '../types';

export const useInventory = (
  setEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>,
  setEditing: (eq: Equipment | null) => void,
  closeOtherForms: () => void
) => {
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteEquipment(id);
      setEquipment(prev => prev.filter(eq => eq.eqId !== id));
    } catch {
      alert('Failed to delete equipment.');
    }
  };

  const handleEditClick = (eq: Equipment) => {
    setEditing(eq);
    closeOtherForms();
  };

  const handleCloseEdit = () => {
    setEditing(null);
  };

  const handleUpdate = (updated: Equipment) => {
    setEquipment(prev => prev.map(eq => eq.eqId === updated.eqId ? updated : eq));
  };

  return { handleDelete, handleEditClick, handleCloseEdit, handleUpdate };
};