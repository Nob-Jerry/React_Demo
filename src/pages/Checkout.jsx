import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderById, orderByUsder, saveOrder } from "../service/orderService";
import { deleteListCartItem } from "../service/cartService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, refreshCart, setCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "COD",
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  
  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, item) => {
        const itemTotal = item.productPrice * item.quantity;
        return acc + itemTotal;
      },
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Vui lòng điền đầy đủ thông tin người nhận");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Xác nhận đặt hàng?",
      text: `Bạn có chắc chắn muốn đặt hàng với tổng tiền ${formatPrice(total)}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xác nhận đặt hàng",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#6b7280",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setLoading(true);
    const payload = {
      userId: userId,
      totalAmount: total,
      status: "PENDING",
      paymentMethod: form.paymentMethod,
      receiverName: form.name,
      receiverPhone: form.phone,
      receiverAddress: form.address,
      orderDetails: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.productPrice,
      })),
    };

    try {
      const productIdList = cart.map(item => item.productId);
      
      if (productIdList.length > 0) {
        await deleteListCartItem(userId, productIdList);
      }
      setCart([]); 
      localStorage.removeItem("cart"); 
      if (form.paymentMethod === "COD") {
        await saveOrder(payload);
        await Swal.fire({
          title: "Đặt hàng thành công!",
          text: "Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ liên hệ sớm nhất!",
          icon: "success",
          confirmButtonText: "Tiếp tục mua sắm",
          confirmButtonColor: "#0ea5e9",
          showCancelButton: false,
        });
        navigate("/product");
      } else {
        navigate("/payment", {
          state: {
            orderData: payload,
            receiverInfo: {
              name: form.name,
              phone: form.phone,
              address: form.address,
            },
            paymentMethod: form.paymentMethod,
            total: total,
            cart: cart
          }
        });
      }
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      toast.error("Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  if (cart.length === 0) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#e0f2fe]">
        <div className="text-center">
          <div className="text-6xl mb-4"></div>
          <h2 className="text-2xl font-bold text-sky-800 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <button
            onClick={() => navigate('/product')}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200"
          >
            Mua sắm ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#e0f2fe] p-4">
      <div className="flex flex-col w-full max-w-[1200px] min-h-screen bg-white rounded-2xl shadow-lg p-6">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-sky-600 cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span className="mx-2">/</span>
          <span className="hover:text-sky-600 cursor-pointer" onClick={() => navigate('/cart')}>Giỏ hàng</span>
          <span className="mx-2">/</span>
          <span className="text-sky-800 font-medium">Thanh toán</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-sky-800 tracking-tight mb-2">
            Thanh toán đơn hàng
          </h1>
          <p className="text-gray-600">
            Vui lòng điền thông tin để hoàn tất đơn hàng
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form thông tin người nhận */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-sky-800 mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Thông tin người nhận
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ giao hàng *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ chi tiết"
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-200 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phương thức thanh toán
                  </label>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-200"
                  >
                    <option value="COD">Thanh toán khi nhận hàng</option>
                    <option value="VISA">💳 VISA</option>
                    <option value="MASTER">💳 MasterCard</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-sky-800 mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                    <img
                      src={item.productImage ? `/img/${item.productImage}` : "default-image.jpg"}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                        {item.productName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sky-800">
                        {formatPrice(item.productPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tổng tiền */}
              <div className="border-t border-gray-200 pt-4 mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-sky-800">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-sky-800">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nút đặt hàng */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Xác nhận đặt hàng</span>
                </>
              )}
            </button>

            {/* Thông tin bảo mật */}
            <div className="text-center text-sm text-gray-500">
              <p>🔒 Thông tin của bạn được bảo mật an toàn</p>
              <p>💳 Thanh toán an toàn qua các cổng thanh toán uy tín</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
