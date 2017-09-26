'use strict';

var themeSelector = document.getElementById('themeselector');

function initTheme() {
    if (typeof Storage !== undefined) {
        var theme = localStorage.getItem('theme');
        if (!!theme) {
            themeSelector.value = theme;
            changeTheme(theme);
        }
    }
}
initTheme();

themeSelector.addEventListener('click', function () {
    var options = themeSelector.querySelectorAll('option');
    var count = options.length;
    if (typeof(count) === 'undefined' || count < 2) {
        changeTheme(count);
    }
});

themeSelector.addEventListener('change', function () {
    changeTheme(themeSelector.value);
});

function changeTheme(newTheme) {
    var linkElement = document.querySelector('link[href^=\'css/theme\']');

    if (linkElement === null) {
        var link = document.createElement('link');
        link.href = 'css/theme_' + newTheme + '.css';
        link.rel = 'stylesheet';

        document.getElementsByTagName('head')[0].appendChild(link);
    }
    else
        linkElement.href = 'css/theme_' + newTheme + '.css';

    if (typeof Storage !== undefined)
        localStorage.setItem('theme', newTheme);
}
