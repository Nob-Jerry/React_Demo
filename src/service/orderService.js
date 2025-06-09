import orderApi from "../api/orderApi";

const orderById = async (orderId) => {
  const response = await orderApi.getOrder(orderId);
  const order = response.data.data;
  return order; 
};
const orderByUsder = async (userId) => {
  const response = await orderApi.getOrderUser(userId);
  const order = response.data.data;
  return order; 
};
const saveOrder = async (request) => {
    const response = await orderApi.saveOrder(request);
    return response.data.data;
}

const updateOrderStatus = async (updateRequest) => {
    const response = await orderApi.updateOrderStatus(updateRequest);
    return response.data;
}

const getAllOrder = async () => {
    const response = await orderApi.getAllOrder();
    return response.data.data;
}

export { orderById, orderByUsder, saveOrder, updateOrderStatus, getAllOrder };