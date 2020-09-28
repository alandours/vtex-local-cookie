const browser = chrome || browser;

browser.runtime.sendMessage(window.location.origin);
console.log('Sending message...');