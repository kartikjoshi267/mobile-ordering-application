export const getCookie = name => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
};

export const setCookie = (name, value, daysToExpire) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const deleteCookie = name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
