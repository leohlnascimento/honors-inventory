import React, { useState, useEffect } from 'react';
import { Equipment } from './types';
import EquipmentList from './components/EquipmentList';
import EquipmentForm from './components/EquipmentForm';
import TransferForm from './components/TransferForm';
import { getAllEquipment } from './api/equipmentApi';
import './App.css';

const App: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Equipment | null>(null); // lift editing state here

  // form visibility states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);

  // fetch equipment on initial load
  useEffect(() => {
    getAllEquipment()
      .then(res => setEquipment(res.data))
      .catch(() => setError('Failed to fetch equipment'))
      .finally(() => setLoading(false));
  }, []);

  // callback for when new equipment is added
  const handleEquipmentAdded = () => {
    setLoading(true);
    getAllEquipment()
      .then(res => setEquipment(res.data))
      .catch(() => setError('Failed to fetch equipment'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="App">
      <h1>Honors Inventory</h1>

      <EquipmentList
        equipment={equipment}
        loading={loading}
        error={error}
        setEquipment={setEquipment}
        setShowAddForm={setShowAddForm}
        setShowTransferForm={setShowTransferForm}
        editing={editing}
        setEditing={setEditing}
      />

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => {
            setShowAddForm((prev) => !prev);
            setShowTransferForm(false);
            setEditing(null); // close edit form
          }}
        >
          {showAddForm ? 'Hide Add Equipment Form' : 'Add New Equipment'}
        </button>

        <button
          onClick={() => {
            setShowTransferForm((prev) => !prev);
            setShowAddForm(false);
            setEditing(null); // close edit form
          }}
          style={{ marginLeft: '10px' }}
        >
          {showTransferForm ? 'Hide Transfer Form' : 'Transfer Equipment'}
        </button>
      </div>

      <div className={`form-container ${showAddForm ? 'show' : ''}`}>
        <EquipmentForm onEquipmentAdded={handleEquipmentAdded} />
      </div>

      <div className={`form-container ${showTransferForm ? 'show' : ''}`}>
        <TransferForm equipment={equipment} setEquipment={setEquipment} />
      </div>

      {/* <EquipmentForm onEquipmentAdded={handleEquipmentAdded} /> */}
      {/* <TransferForm equipment={equipment} setEquipment={setEquipment} /> */}
    </div>
  );
};

export default App;
