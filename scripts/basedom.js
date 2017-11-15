'use strict';

function createEditForm(entry = {}) {
    return vDom.CN('form', {action: '#', method: 'post'}, [
        vDom.CN('div', {}, [
            vDom.CN('h1', {}, ['Hinzufügen / Bearbeiten']),
            vDom.CN('div', {className: 'material inputgroup'}, [
                vDom.CN('input', {type: 'text', name: 'title', value: entry.title, required: true}, []),
                vDom.CN('span', {className: 'highlight'}, []),
                vDom.CN('span', {className: 'bar'}, []),
                vDom.CN('label', {}, ['Titel']),
            ]),
            vDom.CN('div', {className: 'material inputgroup'}, [
                vDom.CN('textarea', {name: 'description', required: true}, [entry.description || '']),
                vDom.CN('span', {className: 'highlight'}, []),
                vDom.CN('span', {className: 'bar'}, []),
                vDom.CN('label', {}, ['Beschreibung']),
            ]),
            vDom.CN('div', {className: 'material inputgroup'}, [
                vDom.CN('input', {type: 'hidden'}, []),
                vDom.CN('label', {}, ['Wichtigkeit']),
            ]),
            vDom.CN('div', {className: 'rating'}, [
                /*                   vDom.CN('label', {for: 'rating_0'}, ['⊘']),
                                   vDom.CN('input', {
                                       type: 'radio',
                                       name: 'rating',
                                       value: '0',
                                       id: 'rating_0',
                                       checked: true
                                   }, ['']),
                                 */
                vDom.CN('label', {for: 'rating_1'}, ['★']),
                vDom.CN('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '1',
                    id: 'rating_1',
                    checked: entry.rating === 1
                }, ['']),
                vDom.CN('label', {for: 'rating_2'}, ['★']),
                vDom.CN('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '2',
                    id: 'rating_2',
                    checked: entry.rating === 2
                }, ['']),
                vDom.CN('label', {for: 'rating_3'}, ['★']),
                vDom.CN('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '3',
                    id: 'rating_3',
                    checked: entry.rating === 3
                }, ['']),
                vDom.CN('label', {for: 'rating_4'}, ['★']),
                vDom.CN('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '4',
                    id: 'rating_4',
                    checked: entry.rating === 4
                }, ['']),
                vDom.CN('label', {for: 'rating_5'}, ['★']),
                vDom.CN('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '5',
                    id: 'rating_5',
                    checked: entry.rating === 5
                }, ['']),
            ]),
            vDom.CN('div', {className: 'material inputgroup'}, [
                vDom.CN('input', {type: 'date', name: 'dueto', value: entry.dueto, required: true}, []),
                vDom.CN('span', {className: 'highlight'}, []),
                vDom.CN('span', {className: 'bar'}, []),
                vDom.CN('label', {}, ['Erledigen bis:']),
            ]),
            vDom.CN('button', {type: 'submit'}, ['speichern']),
            vDom.CN('label', {className: 'button', for: 'formtoggler'}, ['abbrechen']),
        ]),
    ]);
}

let socket = new Socket();

let main = vDom.CN('main', {className: 'cell-grow'}, []);
let entries = [];
let editFormNode = vDom.CN('section', {id: 'editform'}, []);
let editForm = new EditForm();
let themeSelector = new ThemeSelector();

let sortString = 'dueto';
let filterString = null;

function LoadEntries(sorting, filtering) {
    sortString = sorting || sortString;
    filterString = filtering ? (filtering === filterString ? null : filtering) : filterString;
    let querystring = [
        (sortString ? 'sort=' + sortString : null),
        (filterString ? 'filter=' + filterString : null)
    ].filter(e => e !== null).join('&');

    Ajax.GET('http://127.0.0.1:3119/api/todo' + (querystring ? '?' + querystring : ''), data => {
        entries = JSON.parse(data).map(e => new Entry(e));
        main.children = entries.map(e => e.GetNode());
        RenderUI();
    });
}

// v-dom object (will be loaded from server later), represents the dom
let vdomTree = vDom.CN('div', {className: 'wrapper grid-column'}, [
    vDom.CN('header', {className: 'grid'}, [
        vDom.CN('div', {className: 'cell'}, [
            vDom.CN('label', {className: 'button', for: 'formtoggler', onClick: () => editForm.Open()}, ['create new note']),
        ]),
        vDom.CN('div', {className: 'cell-shrink'}, [themeSelector.GetNode()]),
    ]),
    vDom.CN('nav', {className: 'grid'}, [
        vDom.CN('div', {className: 'cell'}, [
            vDom.CN('button', {onClick: () => LoadEntries('finished')}, ['By finish Date']),
            vDom.CN('button', {onClick: () => LoadEntries('created')}, ['By created Date']),
            vDom.CN('button', {onClick: () => LoadEntries('rating')}, ['By Importance']),
        ]),
        vDom.CN('div', {className: 'cell-srink'}, [
            vDom.CN('button', {onClick: () => LoadEntries(null, true)}, ['Show finished']),
        ]),
    ]),
    main,
    vDom.CN('footer', {}, [
        vDom.CN('button', {type: 'button', className: 'round', onClick: () => editForm.Open()}, ['+']),
    ]),
    editFormNode,
]);

LoadEntries();
RenderUI();

function RenderUI() {
    vDom.Update(vdomTree);
}