import { useState } from "react";
import authApi from "../api/authApi";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [data, setData] = useState({
    username: "",
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    const { username, oldPass, newPass, confirmPass } = data;
    setLoading(true);
    try {
      const payload = { username, oldPass, newPass, confirmPass };

      const res = await authApi.changePassword(payload);
      console.log(payload);
      setInfo(res?.message || "Đổi mật khẩu thành công");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      const backendMsg = err.response?.data?.message;
      setError(backendMsg || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-auto items-center justify-center bg-blue-100 dark:bg-dark py-16">
      <div className="overflow-hidden">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-blue-100 px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Đặt lại mật khẩu
                </h3>
                <p className="mb-8 text-center text-base font-medium text-slate-600 dark:text-slate-400">
                  Vui lòng nhập thông tin để đổi mật khẩu.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="mb-3 block text-sm text-gray-700 dark:text-white">
                      Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      value={data.username}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      required
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white"
                      placeholder="Tên đăng nhập"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-3 block text-sm text-gray-700 dark:text-white">
                      Mật khẩu cũ
                    </label>
                    <input
                      type="password"
                      value={data.oldPass}
                      onChange={(e) =>
                        setData({ ...data, oldPass: e.target.value })
                      }
                      required
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white"
                      placeholder="Mật khẩu cũ"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-3 block text-sm text-gray-700 dark:text-white">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={data.newPass}
                      onChange={(e) =>
                        setData({ ...data, newPass: e.target.value })
                      }
                      required
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white"
                      placeholder="Mật khẩu mới"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-3 block text-sm text-gray-700 dark:text-white">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      value={data.confirmPass}
                      onChange={(e) =>
                        setData({ ...data, confirmPass: e.target.value })
                      }
                      required
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white"
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>

                  {error && (
                    <p className="mb-4 text-center text-sm text-red-600">
                      {error}
                    </p>
                  )}
                  {info && (
                    <p className="mb-4 text-center text-sm text-green-500">
                      {info}
                    </p>
                  )}

                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full rounded-sm px-6 py-3 text-base font-medium text-white ${
                        loading
                          ? "bg-blue-300"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                    </button>
                  </div>

                  <p className="text-center text-sm font-medium text-gray-600 dark:text-slate-400">
                    Quay lại{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                      đăng nhập
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
