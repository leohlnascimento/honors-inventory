import React, { useEffect, useState } from 'react';
import { Equipment, Location } from '../types';
import { transferEquipment } from '../api/equipmentApi';
import { getAllLocations } from '../api/locationApi';

interface Props {
  equipment: Equipment[];
  setEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
}

const TransferForm: React.FC<Props> = ({ equipment, setEquipment }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAllLocations().then(res => setLocations(res.data));
  }, []);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEquipmentId || !selectedLocationId) {
      setMessage('Please select both equipment and a location');
      return;
    }

    const newLocation = locations.find(loc => loc.id === selectedLocationId);
    if (!newLocation) return;

    transferEquipment(selectedEquipmentId, selectedLocationId)
      .then(() => {
        setMessage('Equipment transferred successfully!');

        // update the equipment list with new location details
        setEquipment(prev =>
          prev.map(eq =>
            eq.id === selectedEquipmentId
              ? {
                  ...eq,
                  location_id: selectedLocationId,
                  room_name: newLocation.room_name,
                  building_type: newLocation.building_type,
                }
              : eq
          )
        );
      })
      .catch(() => setMessage('Failed to transfer equipment'));
  };

  return (
    <form onSubmit={handleTransfer}>
      <div>
        <h2>Transfer Equipment</h2>
        <div>
          <label>Equipment:</label>
          <select value={selectedEquipmentId ?? ''} onChange={e => setSelectedEquipmentId(Number(e.target.value))}>
            <option value="">Select equipment</option>
            {equipment.map(eq => (
              <option key={eq.id} value={eq.id}>
                {eq.model} ({eq.room_name})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>New Location:</label>
          <select value={selectedLocationId ?? ''} onChange={e => setSelectedLocationId(Number(e.target.value))}>
            <option value="">Select location</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>
                {loc.room_name} ({loc.building_type})
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Transfer</button>
      
        {message && <p>{message}</p>}
      </div>
    </form>
  );
};

export default TransferForm;
