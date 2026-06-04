import { useState, useCallback } from 'react';

interface UseFetchOptions extends RequestInit {
  // Add any custom options here if needed
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: (url: string, options?: UseFetchOptions) => Promise<T | null>;
}

function useFetch<T = any>(): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

  const fetchData = useCallback(async (url: string, options?: UseFetchOptions) => {
    setLoading(true);
    setError(null);
    setData(null); // Clear previous data on new request

    try {
      // Ensure no double slashes if BASE_URL ends with / or url starts with /
      const cleanBase = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
      const cleanPath = url.startsWith('/') ? url : `/${url}`;

      const token = localStorage.getItem("ab.auth.token");
      const headers = new Headers(options?.headers);
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      const response = await fetch(`${cleanBase}${cleanPath}`, { ...options, headers });

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `Error: ${response.status}`);
      }

      if (!response.ok) {
        let errBody;
        try {
          errBody = await response.json();
        } catch {
          errBody = await response.text().catch(() => null);
        }
        const msg =
          (errBody && (errBody.message || errBody.error || JSON.stringify(errBody))) ||
          response.statusText ||
          `HTTP ${response.status}`;
        throw new Error(msg);
      }

      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err; // Rethrow so the caller (e.g. login page) can catch it
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
}

export default useFetch;