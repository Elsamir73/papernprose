import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((current: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((current: T) => T)) => {
    setStoredValue((current) => {
      const next = value instanceof Function ? value(current) : value;
      window.localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return [storedValue, setValue];
}
