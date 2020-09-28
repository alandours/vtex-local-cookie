const browser = chrome || browser;
const cookieName = 'VtexIdclientAutCookie';
const defaultEnv = 'qarosenchile';

const init = (request, sender, sendResponse) => {
  const reload = () => {
		return sendResponse({ 
			reload: true,
			url: origin,
			message: `The ${cookieName} cookie was added to ${origin}!`
		})
  };

  const addLocalCookie = (stableCookies) => {
    if (!stableCookies || !stableCookies.length) {
      const regExp = /https?:\/\/(.+)\.vtexlocal\.com\.br/i;
      const match = origin.match(regExp);
      const env = (match && match[1]) || defaultEnv;

			return sendResponse({
        reload: false,
				message: `There are no ${cookieName} cookies. Log in on https://${env}.vtexcommercestable.com.br`
      });
    }
  
    /* Get the last vtexIdclientAutCookie cookie (latest creation date) */
    const vtexCookie = stableCookies[stableCookies.length - 1];
    const { value, expirationDate } = vtexCookie || {};
		
		if (!value || !expirationDate) {
			return sendResponse({
				reload: false,
				message: `The ${cookieName} cookie has missing data`
      });
    }

    browser.cookies.set({
      url: origin,
      name: cookieName,
      value,
      expirationDate
		}, reload);
  };

  /* If the cookie doesn't exist on vtexlocal, get all the VtexIdclientAutCookie cookies from vtexcommercestable */
  const getCookiesFromStable = (localCookie) => {
    if (localCookie) {
			return sendResponse({
				reload: false,
				message: `The ${cookieName} cookie already exists on ${origin}`
      });
    }

    browser.cookies.getAll({
      name: cookieName
    }, addLocalCookie);
  };

  const { origin } = sender || {};

  console.log('sneder', sender)

  browser.cookies.get({
    url: origin,
    name: cookieName
	}, getCookiesFromStable);

	/* To send an async sendResponse */
	return true;
};

browser.runtime.onMessage.addListener(init);