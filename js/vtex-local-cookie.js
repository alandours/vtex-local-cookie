const browser = chrome || browser;
const logs = false;

const reload = (response) => {
	const { reload, url, message } = response || {};

	if (logs && message)
		console.log(message);

	if (reload && url)
		window.location.href = url;
};

browser.runtime.sendMessage({}, reload);