import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
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
import ResetPassword from "../pages/ResetPassword";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

function AppRoutes() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product" element={<Product />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/product/:id" element={<ProductDetail />} />


      {/* cần đăng nhập */}
      <Route element={<RequireAuth />}>
        <Route path="/detail" element={<UserDetail />} />
        <Route path="/cart" element={<Cart />} />

      </Route>

      {/* quyền admin */}
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
        <Route path="/management/category" element={<CategoryM />} />
        <Route path="/management/product" element={<ProductM />} />
        <Route path="/management/user" element={<UserM />} />
        <Route path="/category/:id" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
