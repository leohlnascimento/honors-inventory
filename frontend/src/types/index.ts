export type BuildingType = 'Classroom' | 'Office' | 'Warehouse';

export interface Location {
  locId: number;
  locRoomName: string;
  locBuildingType: BuildingType;
}

export interface Equipment {
  eqId: number;
  eqModel: string;
  eqType: string;
  eqLocId: number;
  eqUpdatedAt?: string;
  eqRoomName?: string;
  eqBuildingType?: BuildingType;
}

export interface CreateEquipmentInput {
  ceiModel: string;
  ceiEqType: string;
  ceiLocId: number;
}