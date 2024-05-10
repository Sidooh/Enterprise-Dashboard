export const getItemFromStore = (key: string, defaultValue?: string | boolean, store = localStorage) => {
    try {
        return JSON.parse(String(store.getItem(key))) || defaultValue;
    } catch {
        return store.getItem(key) || defaultValue;
    }
};
export const setItemToStore = (key: string, payload: string, store = localStorage) => store.setItem(key, payload);
