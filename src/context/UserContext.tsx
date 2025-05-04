import { createContext, useContext, useState, ReactNode } from 'react';
import { mockUserData } from '../data/mockData';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isPremium: boolean;
  joinDate: string;
  preferences: {
    notifications: boolean;
    autoTradingEnabled: boolean;
    riskLevel: 'low' | 'medium' | 'high';
  };
};

type UserContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUserData);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!mockUserData);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUserData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserPreferences = (preferences: Partial<User['preferences']>) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        },
      });
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUserPreferences }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};