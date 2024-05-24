import { getAnObjectFromLocalStorage, writeAnObjectToLocalStorage } from './chromeStorageHelper';

// background.js

async function freezeDOM() {
  let isActivated = await getAnObjectFromLocalStorage("isActivated");
  const trialAttempt = await getAnObjectFromLocalStorage("trialAttempt");
  if (!isActivated && Number(trialAttempt) === 0) {
    chrome.runtime.openOptionsPage();
    return;
  }
  
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
    const tabId = activeTabs[0].id;
    chrome.scripting.executeScript({
      target: { tabId },
      function: () => {        
        setTimeout(() => {
          debugger;
        });
      },
      world: "MAIN",
      args: ["action"],
    });
    if (!isActivated) {
      writeAnObjectToLocalStorage("trialAttempt", Number(trialAttempt) - 1);
    }
  });
}
chrome.commands.onCommand.addListener((command) => {
  if (command === "freeze-dom") {
    freezeDOM();
  }
});
const INIT_TRIAL_ATTEMPT = 3;
chrome.runtime.onInstalled.addListener(() => {
  writeAnObjectToLocalStorage("trialAttempt", INIT_TRIAL_ATTEMPT);
  writeAnObjectToLocalStorage("licenseKey", "");
  writeAnObjectToLocalStorage("instanceId", "");
  // Create a context menu item
  chrome.contextMenus.create({
    id: "freezeDOM",
    title: "Freeze DOM",
    contexts: ["all"], // This makes the context menu option appear for all types of content
  });
});

// Add a click event listener for the context menu item
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "freezeDOM") {
    freezeDOM();
  }
});


chrome.runtime.onInstalled.addListener(function (details) {
  console.log("🚀 ~ details.reason:", details.reason)
  if (details.reason === 'update') {
    chrome.runtime.openOptionsPage();
  }
})
