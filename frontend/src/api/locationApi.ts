import axios from 'axios';
import { Location as AppLoc} from '../types';

const API_URL = 'http://localhost:3001/locations';

export const getAllLocations = () => {
    return axios.get<{ data: AppLoc[] }>(API_URL);
};
