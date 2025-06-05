import axiosClient from './axiosClient';

const cartApi = {
  getCart: (userId) => axiosClient.get(`/cart/user?userId=${userId}`),
  updateCartItem:(cartRequest) => axiosClient.post('/cart-item/update', cartRequest),
  deleteListCartItem: (userId, productIdList) => axiosClient.delete(`/cart-item/delete-list?userId=${userId}&productIdList=${productIdList.join(",")}`),
};

export default cartApi;