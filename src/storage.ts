// === Generics sederhana: loadFromStorage<T> ===
export function loadFromStorage<T>(key: string): T[] {
  const data: string | null = localStorage.getItem(key);
  if (!data) return [];
  return JSON.parse(data) as T[];
}

export function saveToStorage<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items));
}
