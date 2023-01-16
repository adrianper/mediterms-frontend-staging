global.setCookieOnce = (name, value) => {
    document.cookie = `${name}=${value}; expires=Fri 31 Dec 9999 23:59:59 GMT; secure; SameSite=none";`
}

global.getCookieToken = () =>
    document.cookie.replace(/(?:(?:^|.*;\s*)x-access-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

// global.getCookieValue = (name) =>
//     document.cookie.replace(new RegExp('/(?:(?:^|.*;\s*)' + name + '\s*\=\s*([^;]*).*$)|^.*$/'), "$1")