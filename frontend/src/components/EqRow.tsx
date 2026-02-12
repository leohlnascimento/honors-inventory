import React from 'react';
import { Equipment } from '../types';

interface RowProps {
  eq: Equipment;
  onEdit: (eq: Equipment) => void;
  onDelete: (id: number) => void;
}

export const EqRow: React.FC<RowProps> = ({ eq, onEdit, onDelete }) => (
  <tr>
    <td className='id-cell'>#{eq.id}</td>
    <td className='font-bold'>{eq.model}</td>
    <td><span className={`badge ${eq.equipment_type.toLowerCase()}`}>{eq.equipment_type}</span></td>
    <td>{eq.loc?.room_name || 'No Room'}</td>
    <td>{eq.loc?.building_type || 'N/A'}</td>
    <td className='text-right'>
      <button className='btn-edit' onClick={() => onEdit(eq)}>Edit</button>
      <button className="btn-delete" onClick={() => onDelete(eq.id)}>Delete</button>
    </td>
  </tr>
);