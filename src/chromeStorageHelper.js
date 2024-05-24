export async function writeAnObjectToLocalStorage(key, value) {
  return chrome.storage.local.set({ [key]: JSON.stringify(value) });
}

export async function getAnObjectFromLocalStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
            if (result[key]) {
              resolve(JSON.parse(result[key]));
            } else {
              resolve(null);
            }
          });
    });
  
}
