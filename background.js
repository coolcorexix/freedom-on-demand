// background.js

function freezeDOM() {
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
  });
}
chrome.commands.onCommand.addListener((command) => {
  if (command === "freeze-dom") {
    freezeDOM();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  // Create a context menu item
  chrome.contextMenus.create({
    id: "freezeDOM",
    title: "Freeze DOM",
    contexts: ["all"], // This makes the context menu option appear for all types of content
  });
});

chrome.runtime.onStartup.addListener(() => {
  // Add a click event listener for the context menu item
  chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "freezeDOM") {
      freezeDOM();
    }
  });
});
