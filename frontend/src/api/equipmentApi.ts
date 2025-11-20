// this file is a bridge between my frontend (React) and my backent (Node + Express)
// it talks to my backend and keeps the frontend code clean and organized

import axios from 'axios';

const API_URL = 'http://localhost:3001/equipment'; // my backend

export const getAllEquipment = () => axios.get(API_URL);

export const getEquipmentById = (id: number) => axios.get(`${API_URL}/${id}`);

export const addEquipment = (data: { model: string; equipment_type: string; location_id: number }) =>
    axios.post(API_URL, data);

export const updateEquipment = (id: number, data: { model: string; equipment_type: string; location_id: number }) =>
    axios.put(`${API_URL}/${id}`, data);

export const transferEquipment = (id: number, location_id: number) =>
    axios.put(`${API_URL}/${id}/location`, { location_id });

export const deleteEquipment = (equipmentId: number) =>
    axios.delete(`${API_URL}/${equipmentId}`);
