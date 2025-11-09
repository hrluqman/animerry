import { useEffect, useState } from "react";

/**
 * Returns a debounced version of `value` that updates
 * only after `delay` ms of no changes.
 */
export function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}