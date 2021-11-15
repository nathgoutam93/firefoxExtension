function handleCreated(tab) {
    browser.storage.local.set({ [tab.id]: false });
  }
  
  function handleActive(tab) {
    browser.storage.local.set({ currentTab: tab.tabId });
  }
  
  function handleRemove(tabId) {
    browser.storage.local.remove(tabId.toString());
  }
  
  async function handleClick(tab) {
    let enable = await browser.storage.local.get(tab.id.toString());
  
    if (enable[tab.id]) {
      browser.tabs.executeScript(tab.id, { file: '/stopScript.js' });
      browser.storage.local.set({ [tab.id]: false });
    } else {
      browser.tabs.executeScript(tab.id, { file: '/script.js' });
      browser.storage.local.set({ [tab.id]: true });
    }
  }
  
  browser.tabs.onActivated.addListener(handleActive);
  
  browser.tabs.onCreated.addListener(handleCreated);
  
  browser.tabs.onRemoved.addListener(handleRemove);
  
  browser.browserAction.onClicked.addListener(handleClick);
  
  
  