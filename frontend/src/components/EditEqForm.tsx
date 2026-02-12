import React from 'react';
import { Equipment } from '../types';
import { useEditEqForm } from '../hooks/useEditEqForm';

interface Props {
  equipment: Equipment;
  onClose: () => void;
  onUpdate: (updated: Equipment) => void;
}

const EditEqForm: React.FC<Props> = ({ equipment, onClose, onUpdate }) => {
  const { formData, updateField, submitEdit, loading, error } = useEditEqForm(equipment, onUpdate, onClose);

  return (
    <form onSubmit={submitEdit} className="card-form edit-mode">
      <h4>Edit Asset</h4>
      {error && <p className="error-text">{error}</p>}
      
      <div className="form-group">
        <label>Model</label>
        <input 
          value={formData.model} 
          onChange={e => updateField('model', e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Type</label>
        <input 
          value={formData.type} 
          onChange={e => updateField('type', e.target.value)} 
          required 
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-save" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditEqForm;