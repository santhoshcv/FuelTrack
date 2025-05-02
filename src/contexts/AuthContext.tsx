import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  companyID: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = useMemo(() => !!user, [user]);

  const checkAuthStatus = useCallback(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await apiLogin(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard', { replace: true });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  }, [navigate]);

  const value = useMemo(() => ({
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus,
  }), [isAuthenticated, isLoading, user, login, logout, checkAuthStatus]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};