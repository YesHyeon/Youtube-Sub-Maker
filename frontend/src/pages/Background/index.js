chrome.runtime.onMessage.addListener(async (args) => {
  console.log('This is the background page.');
  console.log('Put the background scripts here.');

  //   const [tab] = await ChromeAPI.queryTabs({
  //     active: true,
  //     currentWindow: true,
  //   });
  chrome.tabs.sendMessage({ action: '원하는 액션명' });

  console.log(args);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //work!

  sendResponse({ res: 'sucess!' });
  console.log('dddd');
});

export {};
