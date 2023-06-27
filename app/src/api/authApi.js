import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1'

export const Activate = async (uid, token) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/users/activation/`, 
            { uid, token }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
            throw error.response.data;
        } else if (error.request) {
            console.error(error.request);
            throw error.request;
        } else {
            console.error('Error', error.message);
            throw error;
        }
    }
}
