export type BuildingType = 'Classroom' | 'Office' | 'Warehouse';

export interface Location {
  id: number;
  room_name: string;
  building_type: BuildingType;
}

export interface Equipment {
  id: number;
  model: string;
  equipment_type: string;
  location_id: number; // required for transfer operations
  updated_at?: string;
  location?: Location;
}

export type CreateEquipmentInput = Omit<Equipment, 'id' | 'updated_at'>;