import { useState } from "react";
import authApi from "../api/authApi";
import Swal from "sweetalert2";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    phone: "",
    address: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const phoneRegex = /^0\d{9}$/;

    if (!emailRegex.test(User.email)) {
      setError("Email không hợp lệ.");
      return;
    }
    if (!passwordRegex.test(User.password)) {
      setError("Mật khẩu phải trên 6 ký tự, gồm ít nhất 1 chữ và 1 số.");
      return;
    }
    // if (!phoneRegex.test(User.phone)) {
    //   setError("Số điện thoại phải bắt đầu bằng 0 và đủ 10 số.");
    //   return;
    // }

    setLoading(true);
    try {
      const payload = { ...User };
      const res = await authApi.signup(payload);
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Tạo tài khoản thành công!",
        text: "Bạn sẽ được chuyển đến trang đăng nhập.",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Đã xảy ra lỗi khi tạo tài khoản.";
      Swal.fire({
        icon: "error",
        title: "Tạo tài khoản thất bại",
        text: message
      });
      setError(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-auto items-center justify-center bg-blue-100 dark:bg-dark">
      <div className="overflow-hidden w-full bg-white dark:bg-dark sm:w-[500px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[700px] rounded bg-blue-100 px-6 py-10 dark:bg-dark sm:p-[60px] shadow-lg">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-[#3935ad] sm:text-3xl">
                  Tạo tài khoản
                </h3>
                <p className="mb-6 text-center text-base font-medium text-slate-600 dark:text-[#5961d5]">
                  Tham gia để trải nghiệm tốt hơn!
                </p>

                <form onSubmit={handleSubmit}>
                  {/* <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-[#3935ad] mb-1">Họ tên</label>
                    <input
                      type="text"
                      value={User.fullname}
                      onChange={(e) => setUser({ ...User, fullname: e.target.value })}
                      placeholder="Nhập họ tên"
                      className="w-full rounded-sm bg-blue-50 px-4 py-2 text-gray-700 outline-none focus:bg-white"
                    />
                  </div> */}

                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-[#3935ad] mb-1">Tên đăng nhập</label>
                    <input
                      type="text"
                      value={User.username}
                      onChange={(e) => setUser({ ...User, username: e.target.value })}
                      placeholder="Tên đăng nhập"
                      className="w-full rounded-sm bg-blue-50 px-4 py-2 text-gray-700 outline-none focus:bg-white"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-[#3935ad] mb-1">Email</label>
                    <input
                      type="email"
                      value={User.email}
                      onChange={(e) => setUser({ ...User, email: e.target.value })}
                      placeholder="Email"
                      className="w-full rounded-sm bg-blue-50 px-4 py-2 text-gray-700 outline-none focus:bg-white"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-[#3935ad] mb-1">Mật khẩu</label>
                    <input
                      type="password"
                      value={User.password}
                      onChange={(e) => setUser({ ...User, password: e.target.value })}
                      placeholder="Mật khẩu"
                      className="w-full rounded-sm bg-blue-50 px-4 py-2 text-gray-700 outline-none focus:bg-white"
                    />
                  </div>
                  

                  {/* <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-[#3935ad] mb-1">Số điện thoại</label>
                    <input
                      type="number"
                      value={User.phone}
                      onChange={(e) => setUser({ ...User, phone: e.target.value })}
                      placeholder="SĐT"
                      className="w-full rounded-sm bg-blue-50 px-4 py-2 text-gray-700 outline-none focus:bg-white"
                    />
                  </div> */}

                  {/* <div className="mb-6">
                    <label className="block text-sm text-gray-700 dark:text-[#3935ad] mb-1">Địa chỉ</label>
                    <input
                      type="text"
                      value={User.address}
                      onChange={(e) => setUser({ ...User, address: e.target.value })}
                      placeholder="Địa chỉ"
                      className="w-full rounded-sm bg-blue-50 px-4 py-2 text-gray-700 outline-none focus:bg-white"
                    />
                  </div> */}
                  <div className="flex items-center justify-center mb-4">
                    {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
                  </div>

                  <div className="mb-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-sm bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
                    >
                      {loading ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                      Quay về đăng nhập
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
