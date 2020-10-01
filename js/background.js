const browser = chrome || browser;
const cookieName = 'VtexIdclientAutCookie';
let storeId;

const init = (request, sender, sendResponse) => {
  const reload = () => {
		return sendResponse({ 
			reload: /vtexlocal/.test(origin),
			url: origin,
      message: `The ${cookieName} cookie was added to ${origin}!`,
      storeId
		})
  };

  const addLocalCookie = (stableCookies) => {
    if (!stableCookies || !stableCookies.length) {
      const regExp = /https?:\/\/(.+)\.vtexlocal\.com\.br/i;
      const match = origin.match(regExp);
      const env = (match && match[1]);

			return sendResponse({
        reload: false,
        message: `There are no ${cookieName} cookies. Log in on ${ env ? `https://${env}.vtexcommercestable.com.br` : 'vtexcommercestable or myvtex' } first`,
        storeId
      });
    }
  
    /* Get the last vtexIdclientAutCookie cookie (latest creation date) */
    const vtexCookie = stableCookies[stableCookies.length - 1];
    const { value, expirationDate } = vtexCookie || {};
		
		if (!value || !expirationDate) {
			return sendResponse({
				reload: false,
        message: `The ${cookieName} cookie has missing data`,
        storeId
      });
    }

    browser.cookies.set({
      url: origin,
      name: cookieName,
      value,
      expirationDate,
      storeId
		}, reload);
  };

  /* If the cookie doesn't exist on vtexlocal, get all the VtexIdclientAutCookie cookies from vtexcommercestable */
  const getCookiesFromStable = (localCookie) => {
    if (localCookie) {
			return sendResponse({
				reload: false,
        message: `The ${cookieName} cookie already exists on ${origin}`,
        storeId
      });
    }

    browser.cookies.getAll({
      name: cookieName,
      storeId
    }, addLocalCookie);
  };

  const { origin, tab } = sender || {};
  const { id: tabId } = tab || {};

  const getStoreId = (cookieStores) => {
    storeId = cookieStores.reduce((acc, curr) => {
      const { id, tabIds } = curr || {};

      const isCurrentStore = tabIds.find(storeTabId => storeTabId === tabId);

      if (isCurrentStore)
        acc = id;

      return acc;
    }, null);

    browser.cookies.get({
      url: origin,
      name: cookieName,
      storeId
    }, getCookiesFromStable);
  };

  browser.cookies.getAllCookieStores(getStoreId);

	/* To send an async sendResponse */
	return true;
};

browser.runtime.onMessage.addListener(init);