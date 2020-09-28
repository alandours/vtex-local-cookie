const browser = chrome || browser;
const cookieName = 'VtexIdclientAutCookie';

const init = (message, sender, sendResponse) => {
  const { origin } = sender || {};
  if (!origin) return;

  const reload = () => {
    sendResponse(origin);
  };

  const addLocalCookie = (stableCookies) => {
    if (!stableCookies || !stableCookies.length) return;
  
    /* Get the last vtexIdclientAutCookie cookie (latest creation date) */
    const vtexCookie = stableCookies[stableCookies.length - 1];
    const { value, expirationDate } = vtexCookie || {};
  
    if (!value || !expirationDate) return;

    console.log('Adding cookie...');

    browser.cookies.set({
      url: origin,
      name: cookieName,
      value,
      expirationDate
    }, reload);
  };

  /* If the cookie doesn't exist on vtexlocal, get all the VtexIdclientAutCookie cookies from vtexcommercestable */
  const getCookiesFromStable = (localCookie) => {
    if (localCookie) return;
    console.log('Cookie does not exist, getting cookie...');

    browser.cookies.getAll({
      name: cookieName
    }, addLocalCookie);
  };

  browser.cookies.get({
    url: origin,
    name: cookieName
  }, getCookiesFromStable);
};

browser.runtime.onMessage.addListener(init);