import devLog from "@helper_functions/devLog";

export function getItemsFromLocalStorage<T>({
  key,
}: {
  key: string;
}): T | null {
  if (typeof window === "undefined") return null;
  devLog("getting from local storage", key.toUpperCase());
  try {
    const items = localStorage.getItem(key);
    if (items) {
      const parsedItems = JSON.parse(items) as T;

      // If the parsed items are null, return null. Otherwise, return the parsed items.
      if (!parsedItems) {
        return null;
      }

      return parsedItems;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function setItemsToLocalStorage({
  key,
  item,
}: {
  key: string;
  item: any;
}): boolean {
  devLog("setting to local storage", key.toUpperCase(), item);
  try {
    localStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    devLog(error);
    return false;
  }
}

export function deleteItemsFromLocalStorage({ keys }: { keys: string[] }) {
  devLog("deleting from local storage", keys);
  try {
    keys.forEach((item) => {
      localStorage.removeItem(item);
    });
    return true;
  } catch (error) {
    devLog(error);
    return false;
  }
}

export function clearLocalStorage() {
  devLog("clearing local storage");
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    devLog(error);
    return false;
  }
}
