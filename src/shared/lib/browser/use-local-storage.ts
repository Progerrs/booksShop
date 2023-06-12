import { useState } from "react";

const PREFIX = "SHAREAD";

// Hook
export function useLocalStorage<T>(key: string, initialValue: T) {
    const keyLS = `${PREFIX}:${key}`;

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(keyLS);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(keyLS, JSON.stringify(valueToStore));
        } catch (error) {
            /* console.log(error);*/
        }
    };
    return [storedValue, setValue] as const;
}

export function initLSItem<T>(key: string, initialValue: T) {
    const keyLS = `${PREFIX}:${key}`;
    const item = window.localStorage.getItem(keyLS);
    const value: T = item ? JSON.parse(item) : initialValue;
    const setValue = (nextValue: T) => {
        window.localStorage.setItem(keyLS, JSON.stringify(nextValue));
    };

    return { value, setValue };
}
