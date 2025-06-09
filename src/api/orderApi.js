import axiosClient from './axiosClient';

const orderApi = {
    getOrder: (orderId) => axiosClient.get(`/order/order?orderId=${orderId}`),
    getOrderUser: (userId) => axiosClient.get(`/order/user?id=${userId}`),
    saveOrder:(orderRequest) => axiosClient.post('/order/save', orderRequest),
    updateOrderStatus: (updateRequest) => axiosClient.post('/order/update', updateRequest),
    getAllOrder: () => axiosClient.get('/order/all'),
};

export default orderApi;