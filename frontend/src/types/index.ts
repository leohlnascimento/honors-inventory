export interface Equipment {
  id: number;
  model: string;
  equipment_type: string;
  location_id: number; // required for transfer operations
  room_name: string;
  building_type: string;
}

export interface Location {
  id: number;
  room_name: string;
  building_type: string;
}