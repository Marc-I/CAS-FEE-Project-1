'use strict';

// add elements to main

function finishEntry(entry) {
    entry.finished = !entry.finished;

    main.children = entries.map(e => entryToDomNode(e));
    vDom.Update(vdomTree);
}

function editEntry(entry) {
    editForm.children = [ createEditForm(entry) ];
    vDom.Update(vdomTree);
}

function entryToDomNode(entry) {
    var descriptionLines = entry.description.split('\n').map(e => vDom.CreateNode('p', {}, [e]));
    return vDom.CreateNode('section', {}, [
        vDom.CreateNode('input', {type: 'checkbox', id: 'entry_' + entry.id, checked: entry.finished}, []),
        vDom.CreateNode('label', {className: 'button round', onClick: () => finishEntry(entry)}, ['✔']),
        vDom.CreateNode('div', {className: 'duetodate'}, [entry.dueto]),
        vDom.CreateNode('div', {'data-rating': entry.rating}, [
            vDom.CreateNode('span', {}, ['★']),
            vDom.CreateNode('span', {}, ['★']),
            vDom.CreateNode('span', {}, ['★']),
            vDom.CreateNode('span', {}, ['★']),
            vDom.CreateNode('span', {}, ['★']),
        ]),
        vDom.CreateNode('details', {}, [
            vDom.CreateNode('summary', {}, [entry.title]),
            ...descriptionLines
        ]),
        vDom.CreateNode('label', {className: 'button round edit', for: 'formtoggler', onClick: () => editEntry(entry)}, ['✎']),
    ]);
};

var entries = [
    {
        id: '324123',
        finished: false,
        dueto: 'Übermorgen',
        rating: 3,
        title: 'Diese Seite fertig machen',
        description: 'Es muss getan werden.\n- HTML\n- CSS\n- JS',
    },
    {
        id: '34523',
        finished: true,
        dueto: 'Nächsten Mittwoch',
        rating: 4,
        title: 'CAS FEE Selbststudium / Projekt Aufgabe erledigen',
        description: 'HTML für die note App erstellen\nCSS erstellen für die note App.',
    },
    {
        id: '543353',
        finished: false,
        dueto: 'Heute',
        rating: 1,
        title: 'Einkaufen',
        description: 'Butter\nEier\nBrot',
    },
];

main.children = entries.map(e => entryToDomNode(e));
vDom.Update(vdomTree);

/*
var t = 1;
setInterval(function () {
    entries[0].rating = 5 - t % 5;
    entries[2].title = 'Einkaufen für ' + (t % 10) + '.- CHF';
    entries[2].rating = Math.floor(t % 10 / 2) + 1;

    main.children = entries.map(e => entryToDomNode(e));
    vDom.Update(vdomTree);

    t++;
}, 500);
*/