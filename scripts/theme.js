'use strict';

class ThemeSelector {
    constructor() {
        this.theme = '1';
        this.selector = null;
        this._load();
    }

    _load() {
        if (typeof Storage !== undefined) {
            let theme = localStorage.getItem('theme');
            // if there is a value in the local storage
            if (!!theme) {
                // sets the selection
                this.theme = theme;
                this.Change();
            }
        }
    }

    _save() {
        // save the selected theme in the local storage
        if (typeof Storage !== 'undefined')
            localStorage.setItem('theme', this.theme);
    }

    _setLink() {
        // link-element in head
        let linkElement = document.querySelector('link[href^=\'css/theme\']');

        // create, if does not exist
        if (linkElement === null) {
            let link = document.createElement('link');
            link.href = 'css/theme_' + this.theme + '.css';
            link.rel = 'stylesheet';

            document.getElementsByTagName('head')[0].appendChild(link);
        }
        else // or change the href
            linkElement.href = 'css/theme_' + this.theme + '.css';
    }

    Change() {
        if (this.selector === null)
            this.selector = document.getElementById('themeselector');

        if (this.selector !== null)
            this.theme = this.selector.value;

        this._setLink();
        this._save();
    }

    GetNode() {
        return vDom.CN('span', {className: 'select'}, [
            vDom.CN('select', {name: 'theme', id: 'themeselector', onChange: () => this.Change()}, [
                vDom.CN('option', {value: 1, selected: this.theme === "1"}, ['White-Black-Style']),
                vDom.CN('option', {value: 2, selected: this.theme === "2"}, ['Black-Orange-Style']),
                vDom.CN('option', {value: 3, selected: this.theme === "3"}, ['White-Blue-Style']),
            ]),
        ]);
    }
}
