"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login as loginApi } from "../api/auth/login";

type Admin = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(false);

  // Restore admin from localStorage on client
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStr = localStorage.getItem("admin");
    if (token && adminStr) {
      setAdmin(JSON.parse(adminStr));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginApi(email, password);

      setAdmin(data.admin);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
