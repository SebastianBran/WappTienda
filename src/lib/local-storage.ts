/**
 * Set a value in local storage
 * @param key The key to store the value under
 * @param value The value to store
 */
export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item '${key}':`, error);
  }
}

/**
 * Get a value from local storage
 * @param key The key to retrieve
 * @param defaultValue A default value to return if the key doesn't exist
 * @returns The stored value or defaultValue if not found
 */
export function getItem<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage item '${key}':`, error);
    return defaultValue;
  }
}

/**
 * Check if a key exists in local storage
 * @param key The key to check
 * @returns True if the key exists, false otherwise
 */
export function hasItem(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

/**
 * Remove a specific item from local storage
 * @param key The key to remove
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item '${key}':`, error);
  }
}

/**
 * Clear all items from local storage
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
