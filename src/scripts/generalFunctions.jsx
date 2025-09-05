window.setSession = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

window.clearSession = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('md_v_u_s')
    localStorage.removeItem('md_ac_u_s')
    localStorage.clear()
}

window.redirectTo = (path) => {
    window.location.href = window.location.href.split('#')[0] + `#${path}`
}

window.setCookieOnce = (name, value) => {
    document.cookie = `${name}=${value}; expires=Fri 31 Dec 9999 23:59:59 GMT; secure; SameSite=none";`
}

window.getCookieToken = () =>
    document.cookie.replace(/(?:(?:^|.*;\s*)x-access-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

