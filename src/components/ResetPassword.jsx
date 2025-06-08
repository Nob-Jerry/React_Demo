import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const isValidPassword = (pwd) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(pwd);
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!token) {
      Swal.fire("Lỗi", "Liên kết không hợp lệ hoặc đã hết hạn", "error");
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return Swal.fire("Lỗi", "Mật khẩu không khớp", "error");
    }
    if (!isValidPassword(password)) {
      return Swal.fire(
        "Lỗi",
        "Mật khẩu phải tối thiểu 6 ký tự, gồm cả chữ và số",
        "error"
      );
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, password });
      Swal.fire("Thành công", "Mật khẩu đã được thay đổi!", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log(error);
      Swal.fire("Thất bại", "Token không hợp lệ hoặc đã hết hạn", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dbeafe] to-[#e0f2fe] px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Đặt lại mật khẩu
        </h1>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <span
                className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirm"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập lại mật khẩu"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
              />
              <span
                className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : " Xác nhận đặt lại"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Link sẽ hết hạn sau 10 phút. Nếu gặp sự cố, hãy thử lại từ trang "Quên
          mật khẩu".
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
