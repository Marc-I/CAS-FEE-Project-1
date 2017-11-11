'use strict';

class Entry {
    constructor() {
        if (!arguments || arguments.length == 0)
            return;

        this.id = arguments['id'] || arguments[0]['id'] || null;
        this.finished = arguments['finished'] || arguments[0]['finished'] || false;
        this.dueto = arguments['dueto'] || arguments[0]['dueto'] || null;
        this.rating = arguments['rating'] || arguments[0]['rating'] || 1;
        this.title = arguments['title'] || arguments[0]['title'] || '';
        this.description = arguments['description'] || arguments[0]['description'] || '';
    }

    Edit() {
        editForm.Open(this);
    }

    Finish() {
        this.finished = !this.finished;

        main.children = entries.map(e => e.GetNode());
        RenderUI();
    }

    GetNode() {
        let descriptionLines = this.description.split('\n').map(e => vDom.CN('p', {}, [e]));
        return vDom.CN('section', {}, [
            vDom.CN('input', {type: 'checkbox', id: 'entry_' + this.id, checked: this.finished}, []),
            vDom.CN('label', {className: 'button round', onClick: () => this.Finish()}, ['✔']),
            vDom.CN('div', {className: 'duetodate'}, [this.dueto]),
            vDom.CN('div', {'data-rating': this.rating}, [
                vDom.CN('span', {}, ['★']),
                vDom.CN('span', {}, ['★']),
                vDom.CN('span', {}, ['★']),
                vDom.CN('span', {}, ['★']),
                vDom.CN('span', {}, ['★']),
            ]),
            vDom.CN('details', {}, [
                vDom.CN('summary', {}, [this.title]),
                ...descriptionLines
            ]),
            vDom.CN('label', {
                className: 'button round edit',
                for: 'formtoggler',
                onClick: () => this.Edit()
            }, ['✎']),
        ]);
    }
}