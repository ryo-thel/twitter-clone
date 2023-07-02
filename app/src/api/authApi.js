import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1'

const authApi = {
    Signup : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/users/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    Activate : async (uid, token) => {
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
}

export default authApi