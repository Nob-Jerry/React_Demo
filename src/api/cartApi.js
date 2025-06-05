import axiosClient from './axiosClient';

const cartApi = {
  getCart: (userId) => axiosClient.get(`/cart/user?userId=${userId}`),
};

export default cartApi;