'use strict';

class Entry {
    constructor() {
        this.id = arguments['id'] || arguments[0]['id'] || null;
        this.finished = arguments['finished'] || arguments[0]['finished'] || false;
        this.dueto = arguments['dueto'] || arguments[0]['dueto'] || null;
        this.rating = arguments['rating'] || arguments[0]['rating'] || 1;
        this.title = arguments['title'] || arguments[0]['title'] || '';
        this.description = arguments['description'] || arguments[0]['description'] || '';
    }

    Edit() {
        editForm.children = [createEditForm(this)];
        vDom.Update(vdomTree);
    }

    Finish() {
        this.finished = !this.finished;

        main.children = entries.map(e => e.GetNode());
        vDom.Update(vdomTree);
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

let entries = [
    new Entry({id: '213', dueto: 'heute', rating: 5, title: 'neu', description: 'Hallo Welt'}),
    new Entry({
        id: '324123',
        finished: false,
        dueto: 'Übermorgen',
        rating: 3,
        title: 'Diese Seite fertig machen',
        description: 'Es muss getan werden.\n- HTML\n- CSS\n- JS',
    }),
    new Entry({
        id: '34523',
        finished: true,
        dueto: 'Nächsten Mittwoch',
        rating: 4,
        title: 'CAS FEE Selbststudium / Projekt Aufgabe erledigen',
        description: 'HTML für die note App erstellen\nCSS erstellen für die note App.',
    }),
    new Entry({
        id: '543353',
        finished: false,
        dueto: 'Heute',
        rating: 1,
        title: 'Einkaufen',
        description: 'Butter\nEier\nBrot',
    }),
];

main.children = entries.map(e => e.GetNode());
vDom.Update(vdomTree);