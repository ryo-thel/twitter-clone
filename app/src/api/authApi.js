import axios from 'axios';

const BASE_URL = 'https://testapi.ryoserver.com/api/v1'

axios.defaults.withCredentials = true;

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
            throw error;
        }
    },

    Login : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/jwt/create/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    TokenRefresh : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/jwt/refresh/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    TokenVerify : async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/jwt/verify/`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    Logout : async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/logout/`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    CsrfToken : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/get/csrf/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    ResendActivation : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/users/resend_activation/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    SetUsername : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/users/set_username/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    ResetUsername : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/users/reset_username/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    UsernameConfirm : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/users/reset_username_confirm/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    SetPassword : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/users/set_password/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    ResetPassword : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/users/reset_password/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    PasswordConfirm : async (data) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/users/reset_password_confirm/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    getUser : async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/auth/users/me/`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    deleteUser : async (data) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/auth/users/me/`,
                data,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },


}

export default authApi