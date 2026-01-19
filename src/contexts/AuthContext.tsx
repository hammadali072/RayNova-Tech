import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user session from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (err) {
        console.error('Failed to restore user session', err);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const DEFAULT_ADMIN_EMAIL = 'admin@raynova.com';
      const DEFAULT_ADMIN_PASSWORD = 'admin123';

      let userCredential;

      // Handle default admin login
      if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
        const usersRef = ref(db, 'users');
        const snapshot = await get(usersRef);
        let adminExists = false;
        let adminUID = null;

        if (snapshot.exists()) {
          const usersObj = snapshot.val();
          for (const [uid, user] of Object.entries(usersObj)) {
            if ((user as any).email === DEFAULT_ADMIN_EMAIL) {
              adminExists = true;
              adminUID = uid;
              break;
            }
          }
        }

        if (!adminExists) {
          // Create admin in Firebase Auth
          try {
            userCredential = await createUserWithEmailAndPassword(auth, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD);
          } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
              userCredential = await signInWithEmailAndPassword(auth, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD);
            } else {
              console.error('Failed to create admin:', err.message);
              return false;
            }
          }
          const firebaseUID = userCredential.user.uid;
          // Add admin to DB
          const adminData = {
            id: firebaseUID,
            name: 'Admin User',
            email: DEFAULT_ADMIN_EMAIL,
            password: DEFAULT_ADMIN_PASSWORD,
            role: 'Admin',
            registeredDate: new Date().toISOString()
          };
          await set(ref(db, `users/${firebaseUID}`), adminData);
        } else {
          // Admin exists, sign in
          try {
            userCredential = await signInWithEmailAndPassword(auth, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD);
          } catch (err: any) {
            console.error('Failed to login as admin:', err.message);
            return false;
          }
        }
      } else {
        // Normal user login
        try {
          userCredential = await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
          console.error('Login error:', err.message);
          return false;
        }
      }

      const firebaseUser = userCredential.user;

      // Get user data from Realtime Database
      const snapshot = await get(ref(db, `users/${firebaseUser.uid}`));
      const userData = snapshot.val();

      const userWithoutPassword: User = {
        id: firebaseUser.uid,
        name: userData?.name || firebaseUser.email?.split('@')[0] || '',
        email: firebaseUser.email || '',
        role: userData?.role || 'User'
      };

      setCurrentUser(userWithoutPassword);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return true;
    } catch (err: any) {
      console.error('Login error:', err.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      localStorage.removeItem(STORAGE_KEY);
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
