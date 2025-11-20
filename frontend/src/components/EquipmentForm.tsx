import React, { useState, useEffect } from 'react';
import { addEquipment } from '../api/equipmentApi';
import { getAllLocations } from '../api/locationApi';

interface Location {
  id: number;
  room_name: string;
  building_type: string;
}

interface EquipmentFormProps {
  onEquipmentAdded: () => void; // callback to refresh equipment list
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ onEquipmentAdded }) => {
  const [model, setModel] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [locationId, setLocationId] = useState<number | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // fetch all locations for the dropdown
  useEffect(() => {
    getAllLocations()
      .then(res => setLocations(res.data))
      .catch(() => setError('Failed to fetch locations'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locationId === null) {
      setError('Please select a location');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addEquipment({ model, equipment_type: equipmentType, location_id: locationId });
      setModel('');
      setEquipmentType('');
      setLocationId(null);
      onEquipmentAdded(); // refresh the equipment list
    } catch (err) {
      setError('Failed to add equipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add New Equipment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Model:</label>
        <input value={model} onChange={(e) => setModel(e.target.value)} required />
      </div>
      <div>
        <label>Type:</label>
        <input value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} required />
      </div>
      <div>
        <label>Location:</label>
        <select value={locationId ?? ''} onChange={(e) => setLocationId(Number(e.target.value))} required>
          <option value="">Select location</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>
              {loc.room_name} ({loc.building_type})
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Equipment'}
      </button>
    </form>
  );
};

export default EquipmentForm;
