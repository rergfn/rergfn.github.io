const DARK = 'dark'
const LIGHT = 'light'
const KEY_THEME = 'theme'
const KEY_THEME_DATE = 'theme_date'
const PREFERS_DARK = '(prefers-color-scheme: dark)'
const PREFERS_LIGHT = '(prefers-color-scheme: light)'

setTheme(getInitTheme())

window.matchMedia(PREFERS_LIGHT).addEventListener('change', e => {
    if (e.matches) {
        setAndSaveTheme(LIGHT)
    }
});

window.matchMedia(PREFERS_DARK).addEventListener('change', e => {
    if (e.matches) {
        setAndSaveTheme(DARK)
    }
});

function toggleDarkMode() {
    let theme = document.documentElement.getAttribute(KEY_THEME)
    setAndSaveTheme(theme === DARK ? LIGHT : DARK)
}

function setTheme(theme) {
    if (theme === DARK) {
        document.documentElement.setAttribute(KEY_THEME, DARK)
    } else {
        document.documentElement.removeAttribute(KEY_THEME);
    }
}

function setAndSaveTheme(theme) {
    setTheme(theme)
    localStorage.setItem(KEY_THEME, theme);
    localStorage.setItem(KEY_THEME_DATE, '' + new Date().getTime())
}

function getInitTheme() {
    if (isUsePrefersTheme()) return getPrefersTheme()
    return localStorage.getItem(KEY_THEME)
}

function getPrefersTheme() {
    if (window.matchMedia && window.matchMedia(PREFERS_LIGHT).matches) return LIGHT
    if (window.matchMedia && window.matchMedia(PREFERS_DARK).matches) return DARK
    return null
}

function isUsePrefersTheme() {
    if (getPrefersTheme()) {
        let theme = localStorage.getItem(KEY_THEME)
        let date = new Date(parseInt(localStorage.getItem(KEY_THEME_DATE)))
        return !(theme === DARK || theme === LIGHT) || !isDateValid(date);
    }
    return false
}

function isDateValid(date) {
    let now = new Date()
    return date.getDate() === now.getDate()
        && date.getMonth() === now.getMonth()
        && date.getFullYear() === now.getFullYear();
}
