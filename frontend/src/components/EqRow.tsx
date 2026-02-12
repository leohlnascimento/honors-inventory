import React from 'react';
import { Equipment } from '../types';

interface RowProps {
  eq: Equipment;
  onEdit: (eq: Equipment) => void;
  onDelete: (id: number) => void;
}

export const EqRow: React.FC<RowProps> = ({ eq, onEdit, onDelete }) => (
  <tr>
    <td className='id-cell'>#{eq.eqId}</td>
    <td className='font-bold'>{eq.eqModel}</td>
    <td><span className={`badge ${eq.eqType.toLowerCase()}`}>{eq.eqType}</span></td>
    <td>{eq.eqRoomName || 'No Room'}</td>
    <td>{eq.eqBuildingType || 'N/A'}</td>
    <td className='text-right'>
      <button className='btn-edit' onClick={() => onEdit(eq)}>Edit</button>
      <button className="btn-delete" onClick={() => onDelete(eq.eqId)}>Delete</button>
    </td>
  </tr>
);