import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import cartApi from "../api/cartApi";
import Swal from "sweetalert2";

const CartPage = () => {
  const { cart, setCart } = useCart();
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const userId = userData.userId;
  const cartId = localStorage.getItem("cartId") || "";

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleQuantityChange = async (id, delta) => {
    const item = cart.find((item) => item.cartItemId === id);
    if (!item) return;
    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      await handleDelete(id);
      return;
    }

    try {
      await cartApi.updateCartItem({
        cartItemId: item.cartItemId,
        cartId: cartId,
        productId: item.productId,
        quantity: newQuantity,
      });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartItemId === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.log(error)
    }
  };

  const handleDelete = async (id) => {
    const item = cart.find((item) => item.cartItemId === id);
    if (!item) return;
    const confirm = await Swal.fire({
      title: "Bạn có chắc muốn xóa sản phẩm này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!confirm.isConfirmed) return;
    try {
      await cartApi.deleteListCartItem(userId, [item.productId]);
      console.log("Deleted item:", item);
      setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== id));
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      return;
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Vui lòng chọn sản phẩm để xóa",
        timer: 1200,
        showConfirmButton: false,
      });
      return;
    }
    const confirm = await Swal.fire({
      title: "Bạn có chắc muốn xóa các sản phẩm đã chọn?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!confirm.isConfirmed) return;
    const productIdList = selectedIds
      .map((id) => {
        const item = cart.find((item) => item.cartItemId === id);
        return item ? item.productId : null;
      })
      .filter(Boolean);

    try {
      await cartApi.deleteListCartItem(userId, productIdList);
      Swal.fire({
        icon: "success",
        title: "Xóa sản phẩm thành công",
        showConfirmButton: false,
        timer: 1000,
      });
      setCart((prevCart) =>
        prevCart.filter((item) => !selectedIds.includes(item.cartItemId))
      );
      setSelectedIds([]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Xóa sản phẩm thất bại",
        text: error?.message || "",
      });
      return;
    }
  };

  const total = cart?.reduce(
    (acc, item) => acc + (item.productPrice || 0) * item.quantity,
    0
  );
const handleCheckboxChange = (cartItemId, checked) => {
  setSelectedIds((prev) =>
    checked
      ? [...prev, cartItemId]
      : prev.filter((id) => id !== cartItemId)
  );
};

let cartContent;
if (loading) {
  cartContent = (
    <p className="text-center text-gray-500">Đang tải giỏ hàng...</p>
  );
} else if (!cart || cart.length === 0) {
  cartContent = (
    <p className="text-center text-gray-500">Giỏ hàng trống.</p>
  );
} else {
  cartContent = (
    <>
      <div className="flex justify-between items-center ">
        <button
          onClick={() => {
            if (selectedIds.length === cart.length) {
              setSelectedIds([]);
            } else {
              setSelectedIds(cart.map((item) => item.cartItemId));
            }
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          {selectedIds.length === cart.length
            ? "Bỏ chọn tất cả"
            : "Chọn tất cả"}
        </button>
      </div>

      {cart.map((item) => (
        <div
          key={item.cartItemId}
          className="flex items-center gap-4 border-b pb-4"
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(item.cartItemId)}
            onChange={(e) =>
              handleCheckboxChange(item.cartItemId, e.target.checked)
            }
            className="w-5 h-5 text-sky-600"
          />
            <img
              src={`/img/${item.productImage}`}
              alt={item.productName}
              className="w-24 h-24 object-cover rounded-md border"
            />
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-800">
                {item.productName}
              </h2>
              <p className="text-gray-600">
                Đơn giá:{" "}
                <span className="text-blue-700 font-semibold">
                  {(item.productPrice || 0).toLocaleString("vi-VN")}₫
                </span>
              </p>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, -1)
                  }
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, 1)
                  }
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Tổng:</p>
              <p className="text-sky-700 font-bold">
                {((item.productPrice || 0) * item.quantity).toLocaleString(
                  "vi-VN"
                )}
                ₫
              </p>
              <button
                onClick={() => handleDelete(item.cartItemId)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={handleDeleteSelected}
            className="text-sm text-red-500 hover:underline"
          >
            Xóa sản phẩm đã chọn
          </button>
          <div className="text-right space-y-1">
            <p className="text-gray-600">Tổng tiền:</p>
            <p className="text-xl font-bold text-sky-700">
              {total.toLocaleString("vi-VN")}₫
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6">
          <a className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800"
              href="/product"
          >
            Tiếp tục mua hàng
          </a>
          <button className="px-6 py-2 rounded bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow">
            Thanh toán
          </button>
        </div>
      </>
    );
  }

  return (
    <div className=" min-h-screen p-6 bg-blue-100">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-sky-800">Giỏ hàng của bạn</h1>
        {cartContent}
      </div>
    </div>
  );
};


export default CartPage;
