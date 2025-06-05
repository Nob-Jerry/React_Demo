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

    resetPassword: async (data) => {
        const res = await axiosClient.post(`auth/update-password`, data);
        console.log(res.data)
        return res.data;
    },

    signup: async (User) => {
        const payload = {
            username: User.username,
            email: User.email,
            password: User.password,
            fullname: User.fullname,
            phone: User.phone,
            address: User.address
        };
        const res = await axiosClient.post('/user/save', payload);
        return res.data;
    },
};

export default authApi;