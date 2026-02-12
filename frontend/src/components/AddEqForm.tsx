import React from 'react';
import { useAddEqForm } from '../hooks/useAddEqForm';

interface EquipmentFormProps { onEquipmentAdded: () => void; }

const AddEqForm: React.FC<EquipmentFormProps> = ({ onEquipmentAdded }) => {
  const { formData, updateField, submitForm, locations, loading, error } = useAddEqForm(onEquipmentAdded);

  return (
    <form onSubmit={submitForm} className="card-form">
      <h2>Add New Equipment</h2>
      {error && <p className="error-text">{error}</p>}
      
      <input 
        placeholder="Model" 
        value={formData.model} 
        onChange={e => updateField('model', e.target.value)} 
        required 
      />
      
      <input 
        placeholder="Type" 
        value={formData.type} 
        onChange={e => updateField('type', e.target.value)} 
        required 
      />
      
      <select 
        value={formData.loc_id} 
        onChange={e => updateField('loc_id', e.target.value)} 
        required
      >
        <option value="">Select location</option>
        {locations.map(l => (
          <option key={l.locId} value={l.locId}>{l.locRoomName}</option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Equipment'}
      </button>
    </form>
  );
};

export default AddEqForm;