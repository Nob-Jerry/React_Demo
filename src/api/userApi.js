import axiosClient from './axiosClient';

const userApi = {
  getAll: () => axiosClient.get('/all'),
  getByUserName: (username) => axiosClient.get(`/user/name?username=${username}`),
  create: (data) => axiosClient.post('/user/save', data),
  update: (data) => axiosClient.put(`/user/update`, data),
  delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default userApi;