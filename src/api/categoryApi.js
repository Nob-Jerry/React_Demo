import axiosClient from "./axiosClient";

const categoryApi = {
    getAll: () => axiosClient.get('/category/all'),
    getById: (id) => axiosClient.get(`/category/${id}`),
    create: (data) => axiosClient.post('/category/save', data),
    update: (data) => axiosClient.put(`/category/update`, data),
    delete: (id) => axiosClient.delete(`/category/delete/${id}`),
};

export default categoryApi;