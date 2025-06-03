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
import ProductM from "../manage/ProductM";
import UserDetail from "../pages/userDetail";
import ResetPassword from "../pages/ResetPassword";
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

      {/* cần đăng nhập */}
      <Route element={<RequireAuth />}>
        <Route path="/detail" element={<UserDetail />} />
      </Route>

      {/* quyền admin */}
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
        <Route path="/management/product" element={<ProductM />} />
        <Route path="/category/:id" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
