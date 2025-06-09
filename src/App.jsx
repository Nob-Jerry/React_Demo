import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AutoLogout from "./components/AutoLogout";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    

    
    <BrowserRouter>
      <GoogleOAuthProvider clientId="589643601471-bdn0io0csul81e91r6u16pit0t5p91ot.apps.googleusercontent.com">
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
      </GoogleOAuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
