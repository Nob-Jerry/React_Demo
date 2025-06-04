import axiosClient from './axiosClient';

const cartApi = {
  getCart: (id) => axiosClient.get(`/cart/${userId}`),
};

export default cartApi;