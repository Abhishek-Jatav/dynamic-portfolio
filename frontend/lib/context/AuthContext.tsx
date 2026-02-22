"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
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
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const logoutTimer = useRef<NodeJS.Timeout | null>(null);

  // ✅ Logout
  const logout = () => {
    setAdmin(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("expiry");

    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
  };

  // ✅ Schedule auto logout
  const scheduleAutoLogout = (expiryTime: number) => {
    const currentTime = Date.now();
    const remainingTime = expiryTime - currentTime;

    if (remainingTime <= 0) {
      logout();
    } else {
      logoutTimer.current = setTimeout(logout, remainingTime);
    }
  };

  // ✅ Restore session on reload
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("admin");
    const storedExpiry = localStorage.getItem("expiry");

    if (storedToken && storedAdmin && storedExpiry) {
      const expiryTime = parseInt(storedExpiry);

      if (Date.now() < expiryTime) {
        setToken(storedToken);
        setAdmin(JSON.parse(storedAdmin));
        scheduleAutoLogout(expiryTime);
      } else {
        logout();
      }
    }
  }, []);

  // ✅ Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginApi(email, password);

      setAdmin(data.admin);
      setToken(data.access_token);

      // backend sends expiresIn in seconds
      const expiryTime = Date.now() + data.expiresIn * 1000;

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      localStorage.setItem("expiry", expiryTime.toString());

      scheduleAutoLogout(expiryTime);
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
