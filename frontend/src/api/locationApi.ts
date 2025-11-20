import axios from 'axios';

const API_URL = 'http://localhost:3001/locations';

export const getAllLocations = () => {
    return axios.get(API_URL);
};
