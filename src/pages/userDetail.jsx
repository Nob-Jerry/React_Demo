import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import Swal from "sweetalert2";

export default function UserDetailPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const username = user?.username;

  if (!username) {
    throw new Error("Username not found in localStorage");
  }

  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    email: "",
    fullname: "",
    phone: "",
    address: "",
    role: "",
    isActive: false,
    createdAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.getByUserName(username);
        const user = res.data.data;

        setFormData({
          userId: user.userId || "",
          username: user.username || "",
          email: user.email || "",
          fullname: user.fullname || "",
          phone: user.phone || "",
          address: user.address || "",
          role: user.role || "",
          isActive: user.isActive || false,
          createdAt: user.createdAt || "",
        });
      } catch (err) {
        console.error("Lỗi khi tải người dùng:", err);
        setError("Không thể tải dữ liệu người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      setError("Email không hợp lệ hoặc đang để trống.");
      return;
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setError("Số điện thoại phải bắt đầu bằng 0 và đủ 10 số hoặc để trống.");
      return;
    }
    const result = await Swal.fire({
      title: "Xác nhận lưu thay đổi?",
      text: "Bạn có chắc muốn lưu các thay đổi này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    });
    if (!result.isConfirmed) return;

    setSaving(true);
    setMessage("");
    try {
      await userApi.update(formData);
      setMessage("Lưu thành công!");
      Swal.fire({
        icon: "success",
        title: "Đã lưu thay đổi!",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (err) {
      setError("Lưu thất bại!");
      Swal.fire({
        icon: "error",
        title: "Lưu thất bại!",
        text: err?.response?.data?.message || "Có lỗi xảy ra khi lưu.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/40 backdrop-blur-lg shadow-xl border border-white/30 p-8 rounded-2xl w-full max-w-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
          Chỉnh sửa thông tin người dùng
        </h2>

        {/* Tên đăng nhập (readonly) */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Tên đăng nhập
          </label>
          <input
            type="text"
            value={formData.username}
            disabled
            className="w-full rounded-lg bg-gray-100 border border-gray-300 p-2 text-gray-500"
          />
        </div>

        {/* Các trường chỉnh sửa */}
        {[
          { label: "Email", name: "email", type: "email" },
          { label: "Họ và tên", name: "fullname", type: "text" },
          { label: "Số điện thoại", name: "phone", type: "text" },
          { label: "Địa chỉ", name: "address", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        {/* Ngày tạo (readonly) */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Ngày tạo
          </label>
          <input
            type="text"
            value={formData.createdAt}
            disabled
            className="w-full rounded-lg bg-gray-100 border border-gray-300 p-2 text-gray-500"
          />
        </div>

        {/* Vai trò */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Quyền
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              role === "USER"
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : ""
            }`}
            disabled={role === "USER"}
          >
            {!["USER", "ADMIN"].includes(formData.role) && (
              <option value={formData.role}>{formData.role}</option>
            )}
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        {/* Trạng thái hoạt động */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Trạng thái hoạt động
          </label>
          <select
            name="isActive"
            value={formData.isActive ? "true" : "false"}
            onChange={handleChange}
            className={`w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              role === "USER"
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : ""
            }`}
            disabled={role === "USER"}
          >
            <option value="true">Đang hoạt động</option>
            <option value="false">Ngừng hoạt động</option>
          </select>
        </div>

        {message && (
          <div className="text-center p-2 rounded text-green-700 font-medium">
            {message}
          </div>
        )}
        {error && (
          <div className="text-center p-2 rounded text-red-600 font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className={`w-full sm:w-1/2 py-2 rounded-lg text-white font-semibold transition ${
              saving
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Đang lưu..." : "💾 Lưu thay đổi"}
          </button>

          <button
            type="button"
            onClick={() => (window.location.href = "/change-password")}
            className="w-full sm:w-1/2 py-2 rounded-lg border border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            🔐 Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}
