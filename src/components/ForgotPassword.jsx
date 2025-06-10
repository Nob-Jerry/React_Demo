import { useState } from "react";
import authApi from "../api/authApi";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      Swal.fire(
        "Thành công",
        "Hãy kiểm tra email để đặt lại mật khẩu",
        "success"
      );
    } catch (error) {
      console.log(error);
      const backendMsg = error.response?.data?.message;
      Swal.fire("Lỗi", backendMsg || "Email không tồn tại hoặc có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Quên mật khẩu?
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang gửi..." : "Gửi liên kết đặt lại"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Liên kết đặt lại sẽ hết hạn sau 10 phút. Kiểm tra hộp thư đến hoặc thư
          rác.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
