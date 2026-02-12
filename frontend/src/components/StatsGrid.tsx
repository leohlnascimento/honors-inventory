import React from 'react';
import { Package, LayoutGrid, MapPin } from 'lucide-react';
import { Equipment } from '../types';

export const StatsGrid: React.FC<{ equipment: Equipment[] }> = ({ equipment }) => (
  <div className="stats-grid">
    <StatCard icon={<Package />} label="Total Items" value={equipment.length} />
    <StatCard icon={<LayoutGrid />} label="Categories" value={new Set(equipment.map(e => e.eqType)).size} color="blue" />
    <StatCard icon={<MapPin />} label="Active Rooms" value={new Set(equipment.map(e => e.eqLocId)).size} color="green" />
  </div>
);

const StatCard = ({ icon, label, value, color = "" }: any) => (
  <div className="stat-card">
    <div className={`stat-icon ${color}`}>{icon}</div>
    <div><p className="stat-label">{label}</p><p className="stat-value">{value}</p></div>
  </div>
);