/**
 * Persistent storage
 */
export default class LocalStorage {
    /**
     * @param key
     * @param def
     */
    static get(key, def = undefined) {
        if (LocalStorage.has(key)) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (err) {
            }
        }
        return def;
    }

    /**
     *
     * @param key
     * @param def
     * @param callback
     * @returns def
     */
    static getAndSave(key, def = {}, callback) {
        let value = def;
        if (LocalStorage.has(key)) {
            value = LocalStorage.get(key);
        }

        LocalStorage.set(key, callback(value));
    }

    /**
     * @param key
     * @param value
     */
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            // pass
        }
    }

    /**
     * @param key
     * @returns {boolean}
     */
    static has(key) {
        return localStorage.getItem(key) !== null;
    }

    /**
     * @param key
     */
    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }

    static clearAllExcept(keepThem) {
        for (let itemKey in localStorage) {
            if (!keepThem.includes(itemKey)) {
                LocalStorage.remove(itemKey);
            }
        }
    }

    static getAndRemove(key) {
        const value = JSON.parse(localStorage.getItem(key));
        LocalStorage.remove(key);
        return value;
    }
}