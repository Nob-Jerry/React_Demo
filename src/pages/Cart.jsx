import React, { useState } from "react";
import { useCart } from "../context/CartContext";
const mockCart = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    image: "/images/iphone14.jpg",
    price: 25990000,
    quantity: 2,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    image: "/images/s24.jpg",
    price: 24990000,
    quantity: 1,
  },
];

const CartPage = () => {
  // const { cart } = useCart(); sử dụng cart từ context 
  const [cart, setCart] = useState(mockCart);
  const [selectedIds, setSelectedIds] = useState(cart.map((item) => item.id));

  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleDeleteSelected = () => {
    setCart((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const total = cart
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
  <div className="bg-gray-50 min-h-screen p-6">
    <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-sky-800">Giỏ hàng của bạn</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Giỏ hàng trống.</p>
      ) : (
        <>
          {/* Nút chọn tất cả */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (selectedIds.length === cart.length) {
                  setSelectedIds([]);
                } else {
                  setSelectedIds(cart.map((item) => item.id));
                }
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              {selectedIds.length === cart.length
                ? "Bỏ chọn tất cả"
                : "Chọn tất cả"}
            </button>
          </div>

          {/* Danh sách sản phẩm */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={(e) =>
                  setSelectedIds((prev) =>
                    e.target.checked
                      ? [...prev, item.id]
                      : prev.filter((id) => id !== item.id)
                  )
                }
                className="w-5 h-5 text-sky-600"
              />
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md border"
              />
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600">
                  Đơn giá:{" "}
                  <span className="text-blue-700 font-semibold">
                    {item.price.toLocaleString("vi-VN")}₫
                  </span>
                </p>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Tổng:</p>
                <p className="text-sky-700 font-bold">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </p>
                <button
                  onClick={() => handleDelete(item.id)}
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
            <button className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800">
              Tiếp tục mua hàng
            </button>
            <button className="px-6 py-2 rounded bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow">
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

};

export default CartPage;
