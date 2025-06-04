import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import AutoLogout from './components/AutoLogout';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    
    <BrowserRouter>
      <CartProvider>
      <AutoLogout />
      <ScrollToTop />
      <Header />   
      <AppRoutes />
      <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;