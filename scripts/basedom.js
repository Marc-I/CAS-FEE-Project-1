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

let main = vDom.CN('main', {className: 'cell-grow'}, []);
let editForm = vDom.CN('section', {className: 'form'}, [createEditForm()]);
let themeSelector = new ThemeSelector();

// v-dom object (will be loaded from server later), represents the dom
let vdomTree = vDom.CN('div', {className: 'wrapper grid-column'}, [
    vDom.CN('header', {className: 'grid'}, [
        vDom.CN('div', {className: 'cell'}, [
            vDom.CN('label', {className: 'button', for: 'formtoggler'}, ['create new note']),
        ]),
        vDom.CN('div', {className: 'cell-shrink'}, [ themeSelector.GetNode()
            // vDom.CN('span', {className: 'select'}, [
            //     vDom.CN('select', {name: 'theme', id: 'themeselector'}, [
            //         vDom.CN('option', {value: 1}, ['White-Black-Style']),
            //         vDom.CN('option', {value: 2}, ['Black-Orange-Style']),
            //         vDom.CN('option', {value: 3}, ['White-Blue-Style']),
            //     ]),
            // ]),
        ]),
    ]),
    vDom.CN('nav', {className: 'grid'}, [
        vDom.CN('div', {className: 'cell'}, [
            vDom.CN('button', {}, ['By finish Date']),
            vDom.CN('button', {}, ['By created Date']),
            vDom.CN('button', {}, ['By Importance']),
        ]),
        vDom.CN('div', {className: 'cell-srink'}, [
            vDom.CN('button', {}, ['Show finished']),
        ]),
    ]),
    main,
    vDom.CN('footer', {}, [
        vDom.CN('label', {className: 'button round', for: 'formtoggler'}, ['+']),
    ]),

    vDom.CN('input', {type: 'checkbox', id: 'formtoggler'}, []),
    editForm,
]);

vDom.Update(vdomTree);