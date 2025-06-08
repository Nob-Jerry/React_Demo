import axiosClient from './axiosClient';

const userApi = {
  getAll: () => axiosClient.get('/user/all'),
  getByUserName: (username) => axiosClient.get(`/user/name?username=${username}`),
  create: (data) => axiosClient.post('/user/save', data),
  update: (data) => axiosClient.post(`/user/update/userm`, data),
  delete: (username) => axiosClient.delete(`/user/delete?username=${username}`),
};

export default userApi;