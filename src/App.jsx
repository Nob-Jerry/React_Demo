import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import AutoLogout from './components/AutoLogout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    
    <BrowserRouter>
      <AutoLogout />
      <ScrollToTop />
      <Header />   
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;