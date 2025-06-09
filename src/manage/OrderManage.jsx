import React, { useEffect, useState } from "react";
import { getAllOrder, updateOrderStatus } from "../service/orderService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const STATUS_OPTIONS = [
  { value: "ALL", label: "Tất cả" },
  { value: "PENDING", label: "Chờ thanh toán" },
  { value: "PAID", label: "Đã thanh toán" },
  { value: "SHIPPED", label: "Đang giao hàng" },
  { value: "DELIVERED", label: "Đã giao hàng" },
  { value: "CANCELLED", label: "Đã hủy" },
];

const statusBadge = (status) => {
  const map = {
    PENDING: { text: "Chờ thanh toán", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "⏳" },
    PAID: { text: "Đã thanh toán", color: "bg-green-100 text-green-800 border-green-200", icon: "✅" },
    SHIPPED: { text: "Đang giao hàng", color: "bg-blue-100 text-blue-800 border-blue-200", icon: "🚚" },
    DELIVERED: { text: "Đã giao hàng", color: "bg-purple-100 text-purple-800 border-purple-200", icon: "📦" },
    CANCELLED: { text: "Đã hủy", color: "bg-red-100 text-red-800 border-red-200", icon: "❌" },
  };
  const s = map[status] || { text: status, color: "bg-gray-100 text-gray-800 border-gray-200", icon: "❓" };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${s.color}`}>
      <span className="mr-1">{s.icon}</span>{s.text}
    </span>
  );
};

const formatPrice = (price) => price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
const formatDate = (dateString) => new Date(dateString).toLocaleString("vi-VN");

export default function OrderManage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrder();
      setOrders(data || []);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      await updateOrderStatus({ orderId, status: newStatus });
      toast.success("Cập nhật trạng thái thành công!");
      fetchOrders();
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại!");
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = statusFilter === "ALL"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-sky-800">Quản lý đơn hàng</h1>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 text-base"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-center text-sky-700 py-10">Đang tải đơn hàng...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Không có đơn hàng nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-blue-200 rounded-xl">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Khách hàng</th>
                  <th className="p-2">Ngày đặt</th>
                  <th className="p-2">Tổng tiền</th>
                  <th className="p-2">Trạng thái</th>
                  <th className="p-2">Cập nhật trạng thái</th>
                  <th className="p-2">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.orderId} className="text-center border-b hover:bg-blue-50">
                    <td className="p-2 font-semibold text-sky-800">{order.orderId}</td>
                    <td className="p-2">{order.username || order.receiverName}</td>
                    <td className="p-2">{formatDate(order.orderDate)}</td>
                    <td className="p-2 font-bold text-blue-700">{formatPrice(order.totalAmount)}</td>
                    <td className="p-2">{statusBadge(order.status)}</td>
                    <td className="p-2">
                      <select
                        value={order.status}
                        disabled={updating}
                        onChange={e => handleStatusChange(order.orderId, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        {STATUS_OPTIONS.filter(opt => opt.value !== "ALL").map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <button
                        className="text-sky-600 underline hover:text-sky-800"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal chi tiết đơn hàng */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-sky-800 mb-4">Chi tiết đơn hàng #{selectedOrder.orderId}</h2>
              <div className="mb-4">
                <div><b>Khách hàng:</b> {selectedOrder.username || selectedOrder.receiverName}</div>
                <div><b>Ngày đặt:</b> {formatDate(selectedOrder.orderDate)}</div>
                <div><b>Trạng thái:</b> {statusBadge(selectedOrder.status)}</div>
                <div><b>Phương thức thanh toán:</b> {selectedOrder.paymentMethod}</div>
                <div><b>Người nhận:</b> {selectedOrder.receiverName}</div>
                <div><b>SĐT:</b> {selectedOrder.receiverPhone}</div>
                <div><b>Địa chỉ:</b> {selectedOrder.receiverAddress}</div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sản phẩm:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedOrder.orderDetails?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 border rounded-lg p-2">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{item.productName}</div>
                        <div className="text-sm text-gray-600">Số lượng: {item.quantity}</div>
                      </div>
                      <div className="text-right font-bold text-blue-700">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-lg font-bold text-sky-800">
                  Tổng cộng: {formatPrice(selectedOrder.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
} 