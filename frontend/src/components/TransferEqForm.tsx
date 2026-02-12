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
            <option key={eq.eqId} value={eq.eqId}>{eq.eqModel} ({eq.eqRoomName})</option>
          ))}
        </select>

        <select 
          value={formData.loc_id} 
          onChange={e => setFormData({ ...formData, loc_id: e.target.value })}
        >
          <option value="">Target Location...</option>
          {locations.map(l => (
            <option key={l.locId} value={l.locId}>{l.locRoomName}</option>
          ))}
        </select>

        <button type="submit" disabled={loading}>{loading ? 'Moving...' : 'Complete Transfer'}</button>
        {(message || error) && <p className="status-msg">{message || error}</p>}
      </form>
    </div>
  );
};

export default TransferEqForm;