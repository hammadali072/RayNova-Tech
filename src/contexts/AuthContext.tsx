import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  token?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'raynova_user';
const API_URL = 'http://localhost:5000/api/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user session from localStorage on app load
  useEffect(() => {
    const storedUser = sessionStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Verify token validity with backend if needed, for now just trust local storage
        setCurrentUser(user);
      } catch (err) {
        console.error('Failed to restore user session', err);
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      const user: User = {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token
      };

      setCurrentUser(user);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return true;
    } catch (err: any) {
      console.error('Login error:', err.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      isAuthenticated: !!currentUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
