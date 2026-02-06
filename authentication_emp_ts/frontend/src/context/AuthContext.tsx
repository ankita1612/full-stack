import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  username: string;
  id: string;
};

type AuthContextType = {
  accessToken: string | null;
  user: User | null;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        setAccessToken(parsed.accessToken);
        setUser(parsed.user);
      }
    } catch {
      localStorage.removeItem("auth_data");
    }
  }, []);

  const login = (accessToken: string, user: User) => {
    setAccessToken(accessToken);
    setUser(user);
    localStorage.setItem("auth_data", JSON.stringify({ accessToken, user }));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("auth_data");
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
