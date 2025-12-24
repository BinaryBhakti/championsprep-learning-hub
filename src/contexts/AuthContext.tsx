import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  _id: string;
  email: string;
  name: string;
  role: "student" | "parent" | "admin";
  coins: number;
  subscriptionStatus: "free" | "pro";
  educationBoard: string;
  grade: 11 | 12;
  studyStreak: { current: number; longest: number };
  photoUrl?: string;
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: "student" | "parent";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for testing
const DEMO_USER: User = {
  _id: "demo123",
  email: "student@example.com",
  name: "Arjun Sharma",
  role: "student",
  coins: 100,
  subscriptionStatus: "free",
  educationBoard: "CBSE",
  grade: 12,
  studyStreak: { current: 7, longest: 14 },
  profileComplete: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("championsprep_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Demo: Accept any credentials
    const userData = { ...DEMO_USER, email };
    setUser(userData);
    localStorage.setItem("championsprep_user", JSON.stringify(userData));
    setIsLoading(false);
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const userData: User = {
      ...DEMO_USER,
      email: data.email,
      name: data.name,
      role: data.role,
    };
    setUser(userData);
    localStorage.setItem("championsprep_user", JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("championsprep_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem("championsprep_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
