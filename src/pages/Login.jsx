import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import cartApi from "../api/cartApi";
import { useState } from "react";
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const { setCart } = useCart();
  const { login, loginGoogle } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      await loginGoogle(credentialResponse.credential);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      const userId = userData.userId;
      try {
        const cartData = await cartApi.getCart(userId);
        localStorage.setItem("cartId", cartData.data.data.cartId || "");
        localStorage.setItem(
          "cart",
          JSON.stringify(cartData.data.data.cartItems || [])
        );
        console.log(cartData.data.data);
        setCart(cartData.data.data.cartItems || []);
      } catch (error) {
        console.error("Lỗi lấy giỏ hàng:", error);
        const backendMsg = error.response?.data?.message;
        setError(backendMsg || "Đăng nhập thất bại");
      } finally{
        Swal.fire({
          icon: "success",
          title: "Đăng nhập Google thành công",
          timer: 1200,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/";
        });
      }
    
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập Google thất bại",
        text: err.message || "Vui lòng thử lại!",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setInfo("");

    try {
      await login({ username, password });
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      const userId = userData.userId;
      try {
        const cartData = await cartApi.getCart(userId);
        localStorage.setItem("cartId", cartData.data.data.cartId || "");
        localStorage.setItem(
          "cart",
          JSON.stringify(cartData.data.data.cartItems || [])
        );
        console.log(cartData.data.data);
        setCart(cartData.data.data.cartItems || []);
      } catch (error) {
        console.error("Lỗi lấy giỏ hàng:", error);
        const backendMsg = error.response?.data?.message;
        setError(backendMsg || "Đăng nhập thất bại");
      } finally {
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công",
          text: "Trang chủ...",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
          }).then(() => {
            window.location.href = "/";
        });
      }
    } catch (error) {
      const backendMsg = error.response?.data?.message;
      setError(backendMsg || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex h-auto items-center justify-center bg-blue-100 dark:bg-dark">
      <div className="overflow-hidden">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-blue-100 px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-[#3935ad] sm:text-3xl">
                  Sign in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-slate-600 dark:text-[#5753c0]">
                  Login to your account for a faster checkout.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-gray-700 dark:text-[#3935ad]"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-gray-700 dark:text-[#3935ad]"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  {error && (
                    <p className="mb-4 text-center text-sm text-red-600">
                      {error}
                    </p>
                  )}
                  {info && (
                    <p className="mb-4 text-center text-sm text-green-400">
                      {info}
                    </p>
                  )}

                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-[#3935ad]">
                        <input
                          type="checkbox"
                          className="mr-2 h-5 w-5 rounded border border-gray-300 bg-white text-blue-600 focus:ring-0"
                        />
                        Remember me
                      </label>
                    </div>
                    <div>
                      <a
                        href="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex w-full items-center justify-center rounded-sm px-9 py-4 text-base font-medium text-white ${
                        loading
                          ? "bg-blue-300"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                  <div className="mb-6 flex w-full items-center justify-center">
                    <div className="w-full">
                      <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                          Swal.fire({
                            icon: "error",
                            title: "Đăng nhập Google thất bại",
                            text: "Vui lòng thử lại!",
                          });
                        }}
                        style={{ 
                          width: "100%",
                          height: "48px",
                          fontSize: "16px",
                          fontWeight: "500"
                        }}
                        size="large"
                        shape="rectangular"
                        text="signin_with"
                        theme="outline"
                      />
                    </div>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-gray-600">
                  Don't you have an account?{" "}
                  <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
