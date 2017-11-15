'use strict';

class EntryView {

    constructor(controller) {
        this.controller = controller;
        this.entrynodes = [];
    }

    RenderEntries(entries) {
        this.entrynodes = entries.map(e => this.createNode(e));
        vDom.Render('entries',vDom.CN('div', {className: 'cell-grow'}, this.entrynodes));
    }

    createNode(entry) {
        let descriptionLines = entry.description.split('\n').map(e => vDom.CN('p', {}, [e]));
        let duetodate = (new Date(entry.dueto)).toLocaleDateString();
        if (new Date().getFullYear() > new Date(entry.dueto).getFullYear()) duetodate = 'überfällig';
        else if (new Date().getFullYear() === new Date(entry.dueto).getFullYear()) {

            if (new Date().getMonth() > new Date(entry.dueto).getMonth()) duetodate = 'überfällig';
            else if (new Date().getMonth() === new Date(entry.dueto).getMonth()) {

                if (new Date().getDate() > new Date(entry.dueto).getDate()) duetodate = 'überfällig';
                else if (new Date().getDate() === new Date(entry.dueto).getDate()) duetodate = 'heute';
            }

        }
        if (((new Date(new Date().getTime() + 86400000))).toDateString() === (new Date(entry.dueto)).toDateString()) duetodate = 'morgen';
        if (((new Date(new Date().getTime() + 2 * 86400000))).toDateString() === (new Date(entry.dueto)).toDateString()) duetodate = 'übermorgen';

        return vDom.CN('section', {id: entry.id}, [
            vDom.CN('input', {type: 'checkbox', id: 'entry_' + entry.id, checked: entry.finished !== null}, []),
            vDom.CN('label', {className: 'button round', onClick: () => this.controller.Finish(entry), forceUpdate: true}, ['✔']),
            vDom.CN('div', {className: 'duetodate'}, [duetodate]),
            vDom.CN('div', {'data-rating': entry.rating}, [
                vDom.CN('span', {}, ['★']),
                vDom.CN('span', {}, ['★']),
                vDom.CN('span', {}, ['★']),
                vDom.CN('span', {}, ['★']),
                vDom.CN('span', {}, ['★']),
            ]),
            vDom.CN('details', {}, [
                vDom.CN('summary', {}, [entry.title]),
                ...descriptionLines
            ]),
            vDom.CN('label', {
                className: 'button round delete',
                for: 'formtoggler',
                onClick: () => this.controller.Delete(entry),
                forceUpdate: true
            }, ['☠']),
            vDom.CN('label', {
                className: 'button round edit',
                for: 'formtoggler',
                onClick: () => this.controller.Edit(entry),
                forceUpdate: true
            }, ['✎']),
        ]);
    }
}
