import axiosClient from './axiosClient';

const productApi = {
  getAll: () => axiosClient.get('/product/all'),
  getByUserName: (id) => axiosClient.get(`/product/${id}`),
  create: (data) => axiosClient.post('/product/save', data),
  update: (data) => axiosClient.put(`/product/update`, data),
  delete: (id) => axiosClient.delete(`/product/delete?id=${id}`),
};

export default productApi;