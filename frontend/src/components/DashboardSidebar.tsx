import React from 'react';
import AddEqForm from './AddEqForm';
import TransferEqForm from './TransferEqForm';
import { PlusCircle, MoveHorizontal } from 'lucide-react';

export const DashboardSidebar: React.FC<any> = ({ d }) => (
  <aside className="sidebar">
    <div className="action-buttons">
      <button className={`btn-action ${d.showAddForm ? 'active' : ''}`} 
              onClick={() => { d.setShowAddForm(!d.showAddForm); d.setShowTransferForm(false); }}>
        <PlusCircle size={18} /> {d.showAddForm ? 'Close' : 'Add Equipment'}
      </button>
      <button className={`btn-action ${d.showTransferForm ? 'active' : ''}`}
              onClick={() => { d.setShowTransferForm(!d.showTransferForm); d.setShowAddForm(false); }}>
        <MoveHorizontal size={18} /> {d.showTransferForm ? 'Close' : 'Transfer Item'}
      </button>
    </div>

    {d.showAddForm && <div className="card-form"><AddEqForm onEquipmentAdded={d.refresh} /></div>}
    {d.showTransferForm && <div className="card-form"><TransferEqForm equipment={d.equipment} onTransferComplete={d.refresh} /></div>}
  </aside>
);