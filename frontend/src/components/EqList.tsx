import React from 'react';
import { Equipment } from '../types';
import EditEqForm from './EditEqForm';
import { EqRow } from './EqRow';
import { useInventory } from '../hooks/useInventory';

const EqList: React.FC<any> = (props) => {
  const { handleDelete, handleEditClick, handleCloseEdit, handleUpdate } = useInventory(
    props.setEquipment, props.setEditing, () => { props.setShowAddForm(false); props.setShowTransferForm(false); }
  );

  if (props.loading) return <div className="loading-state">Loading inventory...</div>;
  if (props.error) return <div className="error-state">{props.error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Current Inventory</h2>
        <span className="count">{props.equipment.length} items</span>
      </div>
      
      {props.editing && (
        <div className="edit-form-container show">
          <EditEqForm equipment={props.editing} onClose={handleCloseEdit} onUpdate={handleUpdate} />
        </div>
      )}

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Model</th><th>Type</th><th>Room</th><th>Building</th><th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.equipment.map((eq: Equipment) => (
              <EqRow key={eq.id} eq={eq} onEdit={handleEditClick} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EqList;