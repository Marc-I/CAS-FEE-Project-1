'use strict';

// selects the theme-selection
var themeSelector = document.getElementById('themeselector');

/*
 * gets the theme from the local storage
 */
function initTheme() {
    if (typeof Storage !== undefined) {
        var theme = localStorage.getItem('theme');
        // if there is a value in the local storage
        if (!!theme) {
            // sets the selection
            themeSelector.value = theme;
            changeTheme(theme);
        }
    }
}

// call init-function on startup
initTheme();

/*
 * EventListener for click on options (fallback for EventListener on change)
 */
themeSelector.addEventListener('click', function () {
    var options = themeSelector.querySelectorAll('option');
    var count = options.length;
    if (typeof count === 'undefined' || count < 2) {
        changeTheme(count);
    }
});

/*
 * EventListener on change of selection
 */
themeSelector.addEventListener('change', function () {
    changeTheme(themeSelector.value);
});

/*
 * changes the theme-link in head
 */
function changeTheme(newTheme) {
    // link-element in head
    var linkElement = document.querySelector('link[href^=\'css/theme\']');

    // create, if does not exist
    if (linkElement === null) {
        var link = document.createElement('link');
        link.href = 'css/theme_' + newTheme + '.css';
        link.rel = 'stylesheet';

        document.getElementsByTagName('head')[0].appendChild(link);
    }
    else // or change the href
        linkElement.href = 'css/theme_' + newTheme + '.css';

    // save the selected theme in the local storage
    if (typeof Storage !== 'undefined')
        localStorage.setItem('theme', newTheme);
}
