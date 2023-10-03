import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1'

axios.defaults.withCredentials = true;

const tweetApi = {
    getTweetList : async () =>{
        try {
            const response = await axios.get(
                `${BASE_URL}/auth/tweets/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

}

export default tweetApi