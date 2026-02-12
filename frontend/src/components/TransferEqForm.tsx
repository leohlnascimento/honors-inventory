import React from 'react';
import { Equipment } from '../types';
import { useTransferEqForm } from '../hooks/useTransferEqForm';

const TransferEqForm: React.FC<{ equipment: Equipment[], onTransferComplete: () => void }> = ({ equipment, onTransferComplete }) => {
  const { formData, setFormData, submitTransfer, locations, loading, message, error } = useTransferEqForm(onTransferComplete);

  return (
    <div className="form-inner">
      <h2>Transfer Asset</h2>
      <form onSubmit={submitTransfer} className="space-y-4">
        <select 
          value={formData.equipmentId} 
          onChange={e => setFormData({ ...formData, equipmentId: e.target.value })}
        >
          <option value="">Select Asset...</option>
          {equipment.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.model} ({eq.loc?.room_name})</option>
          ))}
        </select>

        <select 
          value={formData.locationId} 
          onChange={e => setFormData({ ...formData, locationId: e.target.value })}
        >
          <option value="">Target Location...</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>{loc.room_name}</option>
          ))}
        </select>

        <button type="submit" disabled={loading}>{loading ? 'Moving...' : 'Complete Transfer'}</button>
        {(message || error) && <p className="status-msg">{message || error}</p>}
      </form>
    </div>
  );
};

export default TransferEqForm;