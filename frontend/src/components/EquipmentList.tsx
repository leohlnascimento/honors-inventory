import React from 'react';
import { Equipment } from '../types';
import { deleteEquipment } from '../api/equipmentApi';
import EditEquipmentForm from './EditEquipmentForm';
import { useState } from 'react';

interface Props {
  equipment: Equipment[];
  loading: boolean;
  error: string;
  setEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTransferForm: React.Dispatch<React.SetStateAction<boolean>>;
  editing: Equipment | null;
  setEditing: React.Dispatch<React.SetStateAction<Equipment | null>>;
}

const EquipmentList: React.FC<Props> = ({
  equipment,
  loading,
  error,
  setEquipment,
  setShowAddForm,
  setShowTransferForm,
  editing,
  setEditing,
}) => {
  const handleUpdate = (updated: Equipment) => {
    setEquipment((prev) => prev.map((eq) => (eq.id === updated.id ? updated : eq)));
  }

  const handleEdit = (eq: Equipment) => {
    setEditing(eq); // open the form
  }

  if (loading) return <p>Loading equipment...</p>;
  if (error) return <p>{error}</p>;

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      deleteEquipment(id)
        .then(() => {
          // remove deleted equipment from state
          setEquipment(prev => prev.filter(eq => eq.id !== id));
        })
        .catch(() => alert('Failed to delete equipment'));
    }
  };

  const handleCloseEdit = () => {
    // remove "show" class first, then clear editing after animation
    setEditing((prev) => prev && { ...prev, _closing: true }); 
    setTimeout(() => setEditing(null), 750); // match CSS transition duration
  };


  return (
    <div>
      <h2>Equipment List</h2>

      <div className={`edit-form-container ${editing && !('_closing' in editing) ? 'show' : ''}`}>
        {editing && (
          <EditEquipmentForm
            equipment={editing}
            onClose={handleCloseEdit}
            onUpdate={handleUpdate}
          />
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Type</th>
            <th>Room</th>
            <th>Building</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map(eq => (
            <tr key={eq.id}>
              <td>{eq.id}</td>
              <td>{eq.model}</td>
              <td>{eq.equipment_type}</td>
              <td>{eq.room_name}</td>
              <td>{eq.building_type}</td>
              <td>
                <button className="delete" onClick={() => handleDelete(eq.id)}>Delete</button>
                <button 
                  className="edit"
                  onClick={() => {
                    setEditing(eq);
                    setShowAddForm(false); // close add form
                    setShowTransferForm(false); // close transfer form
                  }}
                >
                    Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentList;
