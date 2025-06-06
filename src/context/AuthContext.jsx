import { createContext, useContext, useState } from 'react';
import authApi from '../api/authApi';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('accessToken') || '');

  const login = async (credentials) => {
    const { accessToken, user } = await authApi.login(credentials);

    setToken(accessToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cartId');
    localStorage.removeItem('cart');
    setToken('');
    setUser(null);
    Swal.fire({
      icon: 'success',
      title: 'Đăng xuất thành công',
      showConfirmButton: false,
      timer: 1200,
    });
    setTimeout(() => {
      window.location.href = '/login';
    }, 1200);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
