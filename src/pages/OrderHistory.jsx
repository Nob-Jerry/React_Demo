import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orderByUsder } from "../service/orderService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để xem đơn hàng");
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [userId, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const orderData = await orderByUsder(userId);
      setOrders(orderData || []);
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
      setError("Không thể tải danh sách đơn hàng");
      toast.error("Lỗi khi tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        text: "Chờ thanh toán",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: "⏳",
      },
      PAID: {
        text: "Đã thanh toán",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: "✅",
      },
      SHIPPED: {
        text: "Đang giao hàng",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: "🚚",
      },
      DELIVERED: {
        text: "Đã giao hàng",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: "📦",
      },
      CANCELLED: {
        text: "Đã hủy",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: "❌",
      },
    };

    const config = statusConfig[status] || {
      text: status,
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: "❓",
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.text}
      </span>
    );
  };

  const getPaymentMethodBadge = (paymentMethod) => {
    const methodConfig = {
      COD: {
        text: "Thanh toán khi nhận hàng",
        color: "bg-orange-100 text-orange-800",
        icon: "💳",
      },
      VISA: {
        text: "VISA",
        color: "bg-blue-100 text-blue-800",
        icon: "💳",
      },
      MASTER: {
        text: "MasterCard",
        color: "bg-red-100 text-red-800",
        icon: "💳",
      },
    };

    const config = methodConfig[paymentMethod] || {
      text: paymentMethod,
      color: "bg-gray-100 text-gray-800",
      icon: "💳",
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#e0f2fe]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-sky-800 font-semibold">Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-[#e0f2fe]">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-sky-800 mb-2">Lỗi tải đơn hàng</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200"
          >
            Thử lại
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
          <span className="text-sky-800 font-medium">Lịch sử đơn hàng</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-sky-800 tracking-tight mb-2">
            Lịch sử đơn hàng
          </h1>
          <p className="text-gray-600">
            Xem tất cả đơn hàng và trạng thái của bạn
          </p>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
            <div className="text-sm text-blue-800">Tổng đơn hàng</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(order => order.status === 'PENDING').length}
            </div>
            <div className="text-sm text-yellow-800">Chờ thanh toán</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(order => order.status === 'PAID').length}
            </div>
            <div className="text-sm text-green-800">Đã thanh toán</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {orders.filter(order => order.status === 'DELIVERED').length}
            </div>
            <div className="text-sm text-purple-800">Đã giao hàng</div>
          </div>
        </div>

        {/* Danh sách đơn hàng */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-sky-800 mb-2">Chưa có đơn hàng nào</h2>
            <p className="text-gray-600 mb-6">Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm!</p>
            <button
              onClick={() => navigate('/product')}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200"
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                {/* Header đơn hàng */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-sky-800">
                      Đơn hàng #{order.orderId}
                    </div>
                    {getStatusBadge(order.status)}
                    {order.paymentMethod && getPaymentMethodBadge(order.paymentMethod)}
                  </div>
                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    {formatDate(order.createdAt)}
                  </div>
                </div>

                {/* Thông tin người nhận */}
                {order.receiverName && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">Thông tin người nhận</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Tên:</strong> {order.receiverName}</p>
                      {order.receiverPhone && <p><strong>SĐT:</strong> {order.receiverPhone}</p>}
                      {order.receiverAddress && <p><strong>Địa chỉ:</strong> {order.receiverAddress}</p>}
                    </div>
                  </div>
                )}

                {/* Danh sách sản phẩm */}
                <div className="space-y-3 mb-4">
                  {order.orderDetails?.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200">
                      <img
                        src={detail.productImage ? `/img/${detail.productImage}` : "default-image.jpg"}
                        alt={detail.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {detail.productName}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Số lượng: {detail.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sky-800">
                          {formatPrice(detail.price * detail.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tổng tiền */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-sky-800">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-sky-800">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {order.status === 'PENDING' && (
                    <button
                      onClick={() => navigate('/payment', { 
                        state: { 
                          orderData: {
                            orderId: order.orderId,
                            userId: order.userId,
                            totalAmount: order.totalAmount,
                            status: order.status,
                            orderDetails: order.orderDetails
                          },
                          receiverInfo: {
                            name: order.receiverName,
                            phone: order.receiverPhone,
                            address: order.receiverAddress,
                          },
                          paymentMethod: order.paymentMethod,
                          total: order.totalAmount,
                          cart: order.orderDetails
                        }
                      })}
                      className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-200"
                    >
                      Thanh toán ngay
                    </button>
                  )}
                  <button
                    onClick={() => {
                      // Có thể thêm chức năng xem chi tiết đơn hàng
                      toast.info("Chức năng xem chi tiết đang được phát triển");
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-200"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
} 