'use strict';

// selects the theme-selection
let themeSelector = document.getElementById('themeselector');

/*
 * gets the theme from the local storage
 */
function initTheme() {
    if (typeof Storage !== undefined) {
        let theme = localStorage.getItem('theme');
        // if there is a value in the local storage
        if (!!theme && !!themeSelector) {
            // sets the selection
            themeSelector.value = theme;
            changeTheme(theme);
        }
    }
}

// call init-function on startup
initTheme();

function addEventListeners() {
    if (!themeSelector) {
        setTimeout(addEventListeners, 100);
        return;
    }
    /*
     * EventListener for click on options (fallback for EventListener on change)
     */
    themeSelector.addEventListener('click', function () {
        let options = themeSelector.querySelectorAll('option');
        let count = options.length;
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
}

addEventListeners();

/*
 * changes the theme-link in head
 */
function changeTheme(newTheme) {
    // link-element in head
    let linkElement = document.querySelector('link[href^=\'css/theme\']');

    // create, if does not exist
    if (linkElement === null) {
        let link = document.createElement('link');
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
