import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "admin" | "editor";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  name: string;
  avatar?: string;
  bio?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (identifier: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  updateProfile: (patch: Partial<AuthUser>) => void;
}

const STORAGE_KEY = "ab.auth.user";

const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: "u-admin",
    username: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
    name: "Dr. Ada Okafor",
    bio: "Lead administrator overseeing operations, content & sales.",
  },
  {
    id: "u-editor",
    username: "editor",
    email: "editor@gmail.com",
    password: "editor123",
    role: "editor",
    name: "Tunde Bello",
    bio: "Content editor for the academy, shop & collections.",
  },
];

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = async (identifier: string, password: string) => {
    const id = identifier.trim().toLowerCase();
    const found = MOCK_USERS.find(
      (u) =>
        (u.email.toLowerCase() === id || u.username.toLowerCase() === id) &&
        u.password === password,
    );
    if (!found) throw new Error("Invalid credentials");
    const { password: _pw, ...safe } = found;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    setUser(safe);
    return safe;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = (patch: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}