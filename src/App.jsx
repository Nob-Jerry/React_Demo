import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import AutoLogout from './components/AutoLogout';

function App() {
  return (
    
    <BrowserRouter>
      <AutoLogout />
      <Header />   
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;