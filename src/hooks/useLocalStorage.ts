import { useState, useCallback } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  const setStoredValue = useCallback(
    (newValue: string) => {
      setValue(newValue);
      localStorage.setItem(key, newValue);
    },
    [key]
  );

  return [value, setStoredValue] as const;
};

export default useLocalStorage;
