const browser = chrome || browser;

const reload = (localUrl) => {
  window.location.href = localUrl;
};

browser.runtime.sendMessage({}, reload);

console.log('Sending message...');