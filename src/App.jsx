import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AutoLogout from "./components/AutoLogout";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <CategoryProvider>
          <ProductProvider>
            <AutoLogout />
            <ScrollToTop />
            <Header />
            <AppRoutes />
            <Footer />
          </ProductProvider>
        </CategoryProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
