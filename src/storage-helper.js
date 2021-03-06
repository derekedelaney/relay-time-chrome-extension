/*global chrome*/

export function get(keys) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(keys, (data) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            resolve(data);
        });
    });
}

export function save(obj) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(obj, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            resolve(obj);
        });
    });
}

export function update(key, callback) {
    return get(key)
        .then(callback)
        .then(updatedData => save({[key]: updatedData}));
}

export function updateAll(keys, callback) {
    return get(keys)
        .then(callback)
        .then(updatedData => save(updatedData));
}
