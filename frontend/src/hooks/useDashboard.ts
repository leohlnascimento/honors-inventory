import { useState, useEffect } from 'react';
import { Equipment } from '../types';
import { getAllEquipment } from '../api/equipmentApi';

export const useDashboard = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState<Equipment | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getAllEquipment()
      .then(res => setEquipment(res.data.data))
      .catch(() => setError('Failed to fetch equipment'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const filteredData = equipment.filter(eq =>
  // Use eqModel and eqType to match your new types
  (eq.eqModel?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
  (eq.eqType?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return {
    equipment, filteredData, loading, error, 
    searchTerm, setSearchTerm, editing, setEditing,
    showAddForm, setShowAddForm, showTransferForm, setShowTransferForm,
    refresh: fetchData
  };
};