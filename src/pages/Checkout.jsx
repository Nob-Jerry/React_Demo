import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderById, orderByUsder, saveOrder } from "../service/orderService";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "COD",
  });
  const [total, setTotal] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user;

  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng điền đầy đủ thông tin người nhận");
      return;
    }

    const payload = {
      userId: userId,
      totalAmount: total,
      //   paymentMethod: form.paymentMethod,
      //   receiverName: form.name,
      //   receiverPhone: form.phone,
      //   receiverAddress: form.address,
      orderDetails: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.productPrice,
      })),
    };

    try {
      await saveOrder(payload);
      localStorage.removeItem("cart");
      navigate("/payment");
    } catch (err) {
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thông tin người nhận</h2>
      <div className="grid gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Họ và tên"
          className="border p-2 rounded w-full"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="border p-2 rounded w-full"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Địa chỉ giao hàng"
          className="border p-2 rounded w-full"
          rows={3}
        />
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="VNPAY">VNPay</option>
          <option value="MOMO">Momo</option>
        </select>
      </div>

      <h2 className="text-2xl font-bold mb-4">Tóm tắt đơn hàng</h2>
      <ul className="mb-4">
        {cart.map((item, idx) => (
          <li key={idx} className="border-b py-2">
            {item.productName} x {item.quantity}
          </li>
        ))}
      </ul>

      <div className="text-lg font-semibold mb-4">
        Tổng tiền: {total.toLocaleString()} VND
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Xác nhận đặt hàng
      </button>
    </div>
  );
}
