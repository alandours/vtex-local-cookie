const browser = chrome || browser;
const cookieName = 'VtexIdclientAutCookie';

browser.runtime.onMessage.addListener(init);

const init = (localUrl) => {
  browser.cookies.get({
    url: localUrl,
    name: cookieName
  }, getCookiesFromStable);

  /* If the cookie doesn't exist on vtexlocal, get all the VtexIdclientAutCookie cookies from vtexcommercestable */
  const getCookiesFromStable = (localCookie) => {
    if (localCookie) return;

    browser.cookies.getAll({
      name: cookieName
    }, addLocalCookie);
  };

  const addLocalCookie = (stableCookies) => {
    if (!stableCookies || !stableCookies.length) return;
  
    /* Get the last vtexIdclientAutCookie cookie (latest creation date) */
    const vtexCookie = stableCookies[stableCookies.length - 1];
    const { value, expirationDate } = vtexCookie || {};
  
    if (!value || !expirationDate) return;

    browser.cookies.set({
      url: localUrl,
      name: cookieName,
      value,
      expirationDate
    });
  };
};