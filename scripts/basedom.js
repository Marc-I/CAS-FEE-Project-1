'use strict';

function createEditForm(entry = {}) {
    return vDom.CreateNode('form', {action: '#', method: 'post'}, [
        vDom.CreateNode('div', {}, [
            vDom.CreateNode('h1', {}, ['Hinzufügen / Bearbeiten']),
            vDom.CreateNode('div', {className: 'material inputgroup'}, [
                vDom.CreateNode('input', {type: 'text', name: 'title', value: entry.title, required: true}, []),
                vDom.CreateNode('span', {className: 'highlight'}, []),
                vDom.CreateNode('span', {className: 'bar'}, []),
                vDom.CreateNode('label', {}, ['Titel']),
            ]),
            vDom.CreateNode('div', {className: 'material inputgroup'}, [
                vDom.CreateNode('textarea', {name: 'description', required: true}, [entry.description || '']),
                vDom.CreateNode('span', {className: 'highlight'}, []),
                vDom.CreateNode('span', {className: 'bar'}, []),
                vDom.CreateNode('label', {}, ['Beschreibung']),
            ]),
            vDom.CreateNode('div', {className: 'material inputgroup'}, [
                vDom.CreateNode('input', {type: 'hidden'}, []),
                vDom.CreateNode('label', {}, ['Wichtigkeit']),
            ]),
            vDom.CreateNode('div', {className: 'rating'}, [
                /*                   vDom.CreateNode('label', {for: 'rating_0'}, ['⊘']),
                                   vDom.CreateNode('input', {
                                       type: 'radio',
                                       name: 'rating',
                                       value: '0',
                                       id: 'rating_0',
                                       checked: true
                                   }, ['']),
                                 */
                vDom.CreateNode('label', {for: 'rating_1'}, ['★']),
                vDom.CreateNode('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '1',
                    id: 'rating_1',
                    checked: entry.rating === 1
                }, ['']),
                vDom.CreateNode('label', {for: 'rating_2'}, ['★']),
                vDom.CreateNode('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '2',
                    id: 'rating_2',
                    checked: entry.rating === 2
                }, ['']),
                vDom.CreateNode('label', {for: 'rating_3'}, ['★']),
                vDom.CreateNode('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '3',
                    id: 'rating_3',
                    checked: entry.rating === 3
                }, ['']),
                vDom.CreateNode('label', {for: 'rating_4'}, ['★']),
                vDom.CreateNode('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '4',
                    id: 'rating_4',
                    checked: entry.rating === 4
                }, ['']),
                vDom.CreateNode('label', {for: 'rating_5'}, ['★']),
                vDom.CreateNode('input', {
                    type: 'radio',
                    name: 'rating',
                    value: '5',
                    id: 'rating_5',
                    checked: entry.rating === 5
                }, ['']),
            ]),
            vDom.CreateNode('div', {className: 'material inputgroup'}, [
                vDom.CreateNode('input', {type: 'date', name: 'dueto', value: entry.dueto, required: true}, []),
                vDom.CreateNode('span', {className: 'highlight'}, []),
                vDom.CreateNode('span', {className: 'bar'}, []),
                vDom.CreateNode('label', {}, ['Erledigen bis:']),
            ]),
            vDom.CreateNode('button', {type: 'submit'}, ['speichern']),
            vDom.CreateNode('label', {className: 'button', for: 'formtoggler'}, ['abbrechen']),
        ]),
    ]);
}

let main = vDom.CreateNode('main', {className: 'cell-grow'}, []);
let editForm = vDom.CreateNode('section', {className: 'form'}, [createEditForm()]);

// v-dom object (will be loaded from server later), represents the dom
let vdomTree = vDom.CreateNode('div', {className: 'wrapper grid-column'}, [
    vDom.CreateNode('header', {className: 'grid'}, [
        vDom.CreateNode('div', {className: 'cell'}, [
            vDom.CreateNode('label', {className: 'button', for: 'formtoggler'}, ['create new note']),
        ]),
        vDom.CreateNode('div', {className: 'cell-shrink'}, [
            vDom.CreateNode('span', {className: 'select'}, [
                vDom.CreateNode('select', {name: 'theme', id: 'themeselector'}, [
                    vDom.CreateNode('option', {value: 1}, ['White-Black-Style']),
                    vDom.CreateNode('option', {value: 2}, ['Black-Orange-Style']),
                    vDom.CreateNode('option', {value: 3}, ['White-Blue-Style']),
                ]),
            ]),
        ]),
    ]),
    vDom.CreateNode('nav', {className: 'grid'}, [
        vDom.CreateNode('div', {className: 'cell'}, [
            vDom.CreateNode('button', {}, ['By finish Date']),
            vDom.CreateNode('button', {}, ['By created Date']),
            vDom.CreateNode('button', {}, ['By Importance']),
        ]),
        vDom.CreateNode('div', {className: 'cell-srink'}, [
            vDom.CreateNode('button', {}, ['Show finished']),
        ]),
    ]),
    main,
    vDom.CreateNode('footer', {}, [
        vDom.CreateNode('label', {className: 'button round', for: 'formtoggler'}, ['+']),
    ]),

    vDom.CreateNode('input', {type: 'checkbox', id: 'formtoggler'}, []),
    editForm,
]);

vDom.Update(vdomTree);