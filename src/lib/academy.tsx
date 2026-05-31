import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";

export type AcademyUser = { email: string; name: string };
export type Enrollment = {
  courseId: string;
  title: string;
  cover?: string;
  price: number;
  pages: string[];        // page text content
  currentPage: number;
  practicalDate?: string; // ISO
  purchasedAt: number;
};

interface AcademyValue {
  user: AcademyUser | null;
  enrollments: Enrollment[];
  signIn: (email: string, password: string) => Promise<AcademyUser>;
  signUp: (data: { name: string; email: string; password: string }) => Promise<AcademyUser>;
  signOut: () => void;
  enroll: (e: Omit<Enrollment, "currentPage" | "purchasedAt">) => void;
  isEnrolled: (courseId: string) => boolean;
  setPage: (courseId: string, page: number) => void;
  setPracticalDate: (courseId: string, iso: string) => void;
  progressPct: (courseId: string) => number;
  getEnrollment: (courseId: string) => Enrollment | undefined;
}

const Ctx = createContext<AcademyValue | null>(null);
const USER_KEY = "ab.academy.user";
const USERS_KEY = "ab.academy.users";    // {email: {name, password}}
const ENROLL_KEY = "ab.academy.enrollments";

function readJSON<T>(k: string, fallback: T): T {
  try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}

export function AcademyProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AcademyUser | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    setUser(readJSON<AcademyUser | null>(USER_KEY, null));
    setEnrollments(readJSON<Enrollment[]>(ENROLL_KEY, []));
  }, []);

  useEffect(() => {
    try { localStorage.setItem(ENROLL_KEY, JSON.stringify(enrollments)); } catch {}
  }, [enrollments]);

  const signIn = useCallback(async (email: string, password: string) => {
    const users = readJSON<Record<string, { name: string; password: string }>>(USERS_KEY, {});
    const u = users[email.toLowerCase()];
    if (!u || u.password !== password) throw new Error("Invalid email or password");
    const next = { email: email.toLowerCase(), name: u.name };
    localStorage.setItem(USER_KEY, JSON.stringify(next));
    setUser(next);
    toast.success(`Welcome back, ${u.name.split(" ")[0]}`);
    return next;
  }, []);

  const signUp = useCallback(async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const users = readJSON<Record<string, { name: string; password: string }>>(USERS_KEY, {});
    const key = email.toLowerCase();
    if (users[key]) throw new Error("An account already exists for this email");
    users[key] = { name, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const next = { email: key, name };
    localStorage.setItem(USER_KEY, JSON.stringify(next));
    setUser(next);
    toast.success(`Account created — welcome, ${name.split(" ")[0]}`);
    return next;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    toast.success("Signed out of Academy");
  }, []);

  const enroll = useCallback((e: Omit<Enrollment, "currentPage" | "purchasedAt">) => {
    setEnrollments((prev) => {
      if (prev.some((x) => x.courseId === e.courseId)) return prev;
      return [...prev, { ...e, currentPage: 0, purchasedAt: Date.now() }];
    });
    toast.success(`Purchased — “${e.title}” is in your library`);
  }, []);

  const isEnrolled = useCallback((id: string) => enrollments.some((e) => e.courseId === id), [enrollments]);

  const setPage = useCallback((courseId: string, page: number) => {
    setEnrollments((prev) => prev.map((e) => e.courseId === courseId ? { ...e, currentPage: Math.max(0, Math.min(page, e.pages.length - 1)) } : e));
  }, []);

  const setPracticalDate = useCallback((courseId: string, iso: string) => {
    setEnrollments((prev) => prev.map((e) => e.courseId === courseId ? { ...e, practicalDate: iso } : e));
  }, []);

  const progressPct = useCallback((courseId: string) => {
    const e = enrollments.find((x) => x.courseId === courseId);
    if (!e || e.pages.length <= 1) return e ? (e.currentPage > 0 ? 100 : 0) : 0;
    return Math.round(((e.currentPage + 1) / e.pages.length) * 100);
  }, [enrollments]);

  const getEnrollment = useCallback((id: string) => enrollments.find((e) => e.courseId === id), [enrollments]);

  return (
    <Ctx.Provider value={{ user, enrollments, signIn, signUp, signOut, enroll, isEnrolled, setPage, setPracticalDate, progressPct, getEnrollment }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAcademy() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAcademy must be used within AcademyProvider");
  return v;
}