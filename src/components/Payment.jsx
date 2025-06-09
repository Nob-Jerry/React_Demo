import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveOrder, updateOrderStatus } from "../service/orderService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, receiverInfo, paymentMethod, total, cart } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    if (!orderData || !receiverInfo) {
      toast.error("Không có thông tin đơn hàng");
      navigate("/checkout");
    }
  }, [orderData, receiverInfo, navigate]);

  const handleCardChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const validateCardInfo = () => {
    if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiry || !cardInfo.cvv) {
      toast.error("Vui lòng nhập đầy đủ thông tin thẻ");
      return false;
    }
    
    if (cardInfo.cardNumber.length < 13 || cardInfo.cardNumber.length > 19) {
      toast.error("Số thẻ không hợp lệ");
      return false;
    }
    
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(cardInfo.expiry)) {
      toast.error("Định dạng ngày hết hạn không đúng (MM/YY)");
      return false;
    }
    
    if (cardInfo.cvv.length < 3 || cardInfo.cvv.length > 4) {
      toast.error("CVV không hợp lệ");
      return false;
    }
    
    return true;
  };

  const handlePayment = async () => {
    if (!validateCardInfo()) return;

    // Hiển thị SweetAlert xác nhận thanh toán
    const confirmResult = await Swal.fire({
      title: "Xác nhận thanh toán?",
      text: `Bạn có chắc chắn muốn thanh toán ${formatPrice(total)}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xác nhận thanh toán",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#6b7280",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setLoading(true);
    
    try {
      // Kiểm tra xem đây có phải là đơn hàng đã tồn tại không
      if (orderData.orderId) {
        // Đây là đơn hàng đã tồn tại (PENDING) - cập nhật trạng thái
        const updateRequest = {
          orderId: orderData.orderId,
          status: "PAID",
          paymentMethod: paymentMethod,
        };
        
        console.log("Updating existing order:", updateRequest);
        await updateOrderStatus(updateRequest);
        console.log("Order status updated to PAID");
      } else {
        // Đây là đơn hàng mới - lưu mới
        const updatedOrderData = {
          ...orderData,
          status: "PAID",
          paymentMethod: paymentMethod,
          receiverName: receiverInfo.name,
          receiverPhone: receiverInfo.phone,
          receiverAddress: receiverInfo.address,
        };

        console.log("Saving new order:", updatedOrderData);
        await saveOrder(updatedOrderData);
        console.log("New order saved with PAID status");
      }
      
      await Swal.fire({
        title: "Thanh toán thành công!",
        text: "Đơn hàng của bạn đã được thanh toán và xác nhận.",
        icon: "success",
        confirmButtonText: "Tiếp tục mua sắm",
        confirmButtonColor: "#0ea5e9",
        showCancelButton: false,
      });
      
      navigate("/product");
    } catch (err) {
      console.error("Lỗi khi thanh toán:", err);
      toast.error("Thanh toán thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPayment = async () => {
    const result = await Swal.fire({
      title: "Hủy thanh toán?",
      text: "Đơn hàng sẽ được lưu với trạng thái chờ thanh toán.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hủy thanh toán",
      cancelButtonText: "Tiếp tục thanh toán",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#0ea5e9",
    });

    if (result.isConfirmed) {
      setLoading(true);
      
      try {
        // Kiểm tra xem đây có phải là đơn hàng đã tồn tại không
        if (orderData.orderId) {
          // Đây là đơn hàng đã tồn tại - cập nhật trạng thái
          const updateRequest = {
            orderId: orderData.orderId,
            status: "PENDING",
            paymentMethod: paymentMethod,
          };
          
          console.log("Updating existing order to PENDING:", updateRequest);
          await updateOrderStatus(updateRequest);
          console.log("Order status updated to PENDING");
        } else {
          // Đây là đơn hàng mới - lưu mới
          const pendingOrderData = {
            ...orderData,
            status: "PENDING",
            paymentMethod: paymentMethod,
            receiverName: receiverInfo.name,
            receiverPhone: receiverInfo.phone,
            receiverAddress: receiverInfo.address,
          };

          console.log("Saving new order with PENDING status:", pendingOrderData);
          await saveOrder(pendingOrderData);
          console.log("New order saved with PENDING status");
        }
        
        toast.success("Đơn hàng đã được lưu với trạng thái chờ thanh toán");
        navigate("/product");
      } catch (err) {
        console.error("Lỗi khi lưu đơn hàng:", err);
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }
  };

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  if (!orderData || !receiverInfo) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#e0f2fe]">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-sky-800 mb-2">Không có thông tin đơn hàng</h2>
          <p className="text-gray-600 mb-6">Vui lòng quay lại trang thanh toán</p>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#e0f2fe] p-4">
      <div className="flex flex-col w-full max-w-[800px] min-h-screen bg-white rounded-2xl shadow-lg p-6">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-sky-600 cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span className="mx-2">/</span>
          <span className="hover:text-sky-600 cursor-pointer" onClick={() => navigate('/checkout')}>Thanh toán</span>
          <span className="mx-2">/</span>
          <span className="text-sky-800 font-medium">Xác nhận thanh toán</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-sky-800 tracking-tight mb-2">
            Xác nhận thanh toán
          </h1>
          <p className="text-gray-600">
            Vui lòng nhập thông tin thẻ để hoàn tất thanh toán
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form thanh toán */}
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Thông tin thanh toán
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số thẻ *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-200"
                    maxLength="19"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên chủ thẻ *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardInfo.cardName}
                    onChange={handleCardChange}
                    placeholder="NGUYEN VAN A"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-200"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày hết hạn *
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardInfo.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-200"
                      maxLength="5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardInfo.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition duration-200"
                      maxLength="4"
                    />
                  </div>
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

              {/* Thông tin người nhận */}
              <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Thông tin người nhận</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Tên:</strong> {receiverInfo.name}</p>
                  <p><strong>SĐT:</strong> {receiverInfo.phone}</p>
                  <p><strong>Địa chỉ:</strong> {receiverInfo.address}</p>
                </div>
              </div>

              {/* Danh sách sản phẩm */}
              <div className="space-y-3 mb-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                        {item.productName}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sky-800">
                        {formatPrice((item.price || item.productPrice) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tổng tiền */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
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

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handlePayment}
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
                    <span>Xác nhận thanh toán</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCancelPayment}
                disabled={loading}
                className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition duration-200"
              >
                Hủy thanh toán
              </button>
            </div>

            {/* Thông tin bảo mật */}
            <div className="text-center text-sm text-gray-500">
              <p>🔒 Thông tin thẻ được mã hóa và bảo mật</p>
              <p>💳 Thanh toán an toàn qua cổng thanh toán uy tín</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
