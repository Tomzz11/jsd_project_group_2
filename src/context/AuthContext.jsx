import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchFullUserData = async (token) => {
    try {
      const meResponse = await authAPI.getMe();
      return { ...meResponse.data.data, token };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          const response = await authAPI.getMe();
          const fullUserData = { ...response.data.data, token };
          setUser(fullUserData);
          localStorage.setItem('user', JSON.stringify(fullUserData));
        } catch (error) {
          console.error('Auth init error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);


  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      const { data } = response.data;
      
      
      localStorage.setItem('token', data.token);
      
      
      const fullUserData = await fetchFullUserData(data.token);
      
      if (fullUserData) {
        localStorage.setItem('user', JSON.stringify(fullUserData));
        setUser(fullUserData);
        return { success: true, data: fullUserData };
      } else {
        const basicUserData = { ...data, createdAt: new Date().toISOString() };
        localStorage.setItem('user', JSON.stringify(basicUserData));
        setUser(basicUserData);
        return { success: true, data: basicUserData };
      }
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
      };
    }
  };


  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { data } = response.data;
      

      localStorage.setItem('token', data.token);
      

      const fullUserData = await fetchFullUserData(data.token);
      
      if (fullUserData) {
        localStorage.setItem('user', JSON.stringify(fullUserData));
        setUser(fullUserData);
        return { success: true, data: fullUserData };
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        return { success: true, data };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;






