// this file is a bridge between my frontend (React) and my backent (Node + Express)
// it talks to my backend and keeps the frontend code clean and organized

import axios from 'axios';
import { Equipment, CreateEquipmentInput } from '../types';

const API_URL = 'http://localhost:3001/equipment'; // my backend

export const getAllEquipment = () => axios.get<Equipment[]>(API_URL);

export const addEquipment = (data: CreateEquipmentInput) =>
    axios.post<Equipment>(API_URL, data);

// updates: Partial<CreateEquipmentInput> means "any combination of these fields"
export const updateEquipment = (id: number, data: Partial<CreateEquipmentInput>) =>
    axios.put<Equipment>(`${API_URL}/${id}`, data);

export const transferEquipment = (id: number, location_id: number) =>
    axios.patch(`${API_URL}/${id}/transfer`, { location_id });

export const deleteEquipment = (id: number) =>
    axios.delete(`${API_URL}/${id}`);
