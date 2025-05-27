import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Contact from '../pages/Contact'; 
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Product from '../pages/Product';
import Category from '../pages/Category';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/category/:id" element={<Category />} />
    </Routes>
  );
}

export default AppRoutes;