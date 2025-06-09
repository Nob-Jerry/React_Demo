import cartApi from "../api/cartApi";

const getCartItem = async (userId) => {
  const response = await cartApi.getCart(userId);
  const cart = response.data.data;
  localStorage.setItem("cartId", cart.cartId);
  return cart.cartItems || []; 
};

const updateCartItem = async (cartItem) => {
    const response = await cartApi.updateCartItem(cartItem);
    return response.data.data;
}

const deleteListCartItem = async (userId, productIdList) => {
    const response = await cartApi.deleteListCartItem(userId, productIdList);
    return response.data;
}

export {getCartItem, updateCartItem, deleteListCartItem}