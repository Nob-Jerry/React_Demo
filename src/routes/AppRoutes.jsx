import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Product from "../pages/Product";
import Category from "../pages/Category";
import UserM from "../manage/UserM";
import ProductM from "../manage/ProductM";
import CategoryM from "../manage/CategoryM";
import UserDetail from "../pages/userDetail";
import ChangePassword from "../pages/ChangePassword";
import ResetPassword from "../components/ResetPassword";
import FogotPassword from "../components/ForgotPassword";
import ProductDetail from "../pages/ProductDetail";
import VerifyPage from "../components/VerifyPage";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import PaymentPage from "../components/Payment";
import OrderHistory from "../pages/OrderHistory";
import OrderManage from "../manage/OrderManage";

function AppRoutes() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product" element={<Product />} />
      <Route path="/verify-email" element={<VerifyPage />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<FogotPassword />} />


      {/* Chưa đăng nhập  */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* cần đăng nhập */}
      <Route element={<RequireAuth />}>
        <Route path="/detail" element={<UserDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>

      {/* quyền admin */}
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
        <Route path="/management/category" element={<CategoryM />} />
        <Route path="/management/product" element={<ProductM />} />
        <Route path="/management/user" element={<UserM />} />
        <Route path="/management/order" element={<OrderManage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
