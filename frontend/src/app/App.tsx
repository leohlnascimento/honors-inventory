import React from 'react';
import './App.css';
import { Search } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { StatsGrid } from '../components/StatsGrid';
import { DashboardSidebar } from '../components/DashboardSidebar';
import EqList from '../components/EqList';

const App: React.FC = () => {
  const d = useDashboard();

  return (
    <div className="dashboard-container">
      <header className='dashboard-header'>
        <h1>Honors Inventory Management</h1>
        <p className="subtitle">Track university equipment assets</p>
      </header>

      <main className='max-w-7xl mx-auto p-6'>
        <StatsGrid equipment={d.equipment} />

        <div className="main-layout">
          <section className="inventory-section">
            <div className="search-bar">
              <Search size={20} />
              <input placeholder="Search..." value={d.searchTerm} onChange={e => d.setSearchTerm(e.target.value)} />
            </div>
            
            <EqList 
              equipment={d.filteredData} loading={d.loading} error={d.error}
              setEquipment={() => d.refresh()} 
              setShowAddForm={d.setShowAddForm} setShowTransferForm={d.setShowTransferForm}
              editing={d.editing} setEditing={d.setEditing}
            />
          </section>

          <DashboardSidebar d={d} />
        </div>
      </main>
    </div>
  );
};

export default App;