import axiosClient from "./axiosClient";
import { parseJwt } from '../utils/jwt';

const authApi = {
    login: async (Credentials) => {
        const res = await axiosClient.post('/auth/login', Credentials);
        const accessToken = res.data.accessToken;
        const payload = parseJwt(accessToken);
        const user = {
            userId: payload.id,
            username: payload.sub,
            role: payload.scope
        }
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        return { accessToken, user };
    },

    logout: async (token) =>{
        try {
            await axiosClient.post('/auth/logout', token)
        }catch (error){
            console.log("Logout fail! "+error)
        }
    },

    changePassword: async (data) => {
        const res = await axiosClient.post(`auth/update-password`, data);
        console.log(res.data)
        return res.data;
    },

    signup: async (User) => {
        const payload = {
            username: User.username,
            email: User.email,
            password: User.password,
            confirmPassword: User.confirmPassword
        };
        const res = await axiosClient.post('/auth/register', payload);
        return res.data;
    },
    verify: async (activationToken) => {
        const response = await axiosClient.get(`/verify/email?activationToken=${activationToken}`);
        return response.data;
    },
    forgotPassword: async(email) => {
        const response = await axiosClient.post(`/auth/forgot-password?email=${email}`)
        return response.data
    },
    resetPassword: async(data) => {
        const response = await axiosClient.post('/auth/reset-password', data)
        return response.data
    }
};

export default authApi;