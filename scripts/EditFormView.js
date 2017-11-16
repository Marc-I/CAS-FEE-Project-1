'use strict';

class EditFormView {
    constructor () {
        vDom.Render('addButton1', EditFormView.GetAddButton1());
        vDom.Render('addButton2', EditFormView.GetAddButton2());
    }

    static GetAddButton1() {
        return vDom.CN('button', {type: 'button', onClick: () => this.Render(new EntryModel()), forceUpdate: true}, ['create node']);
    }

    static GetAddButton2() {
        return vDom.CN('button', {type: 'button', className: 'round', onClick: () => this.Render(new EntryModel()), forceUpdate: true}, ['+']);
    }

    static Save(entry) {
        if (entry.id)
            BaseController.EntryController.Update(entry);
        else
            BaseController.EntryController.Add(entry);
        this.Render();
    }

    static Close() {
        this.Render();
    }

    static Render(entry) {
        vDom.Render('editform', entry ? this.GetNode(entry) : vDom.CN('span', {}, []));
    }

    static GetNode(entry) {
        return vDom.CN('div', {id: 'hdiv'}, [
            vDom.CN('form', {
                action: '#', method: 'post', onSubmit: (e) => {
                    e.preventDefault();
                    entry.Save(this);
                    return false;
                },
                forceUpdate: true
            }, [
                vDom.CN('div', {}, [
                    vDom.CN('h1', {}, ['Hinzufügen / Bearbeiten']),
                    vDom.CN('div', {className: 'material inputgroup'}, [
                        vDom.CN('input', {
                            type: 'text',
                            name: 'title',
                            value: entry.title || '',
                            required: true,
                            onChange: (event) => {
                                entry.title = event.target.value;
                            },
                            forceUpdate: true
                        }, []),
                        vDom.CN('span', {className: 'highlight'}, []),
                        vDom.CN('span', {className: 'bar'}, []),
                        vDom.CN('label', {}, ['Titel']),
                    ]),
                    vDom.CN('div', {className: 'material inputgroup'}, [
                        vDom.CN('textarea', {
                            name: 'description',
                            value: entry.description || '',
                            required: true,
                            onChange: (event) => {
                                entry.description = event.target.value;
                            },
                            forceUpdate: true
                        }, [entry.description || '']),
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
                            checked: (!!entry.rating && entry.rating.toString() === '1') || !entry.rating,
                            onClick: () => {
                                entry.rating = 1;
                            },
                            forceUpdate: true
                        }, ['']),
                        vDom.CN('label', {for: 'rating_2'}, ['★']),
                        vDom.CN('input', {
                            type: 'radio',
                            name: 'rating',
                            value: '2',
                            id: 'rating_2',
                            checked: !!entry.rating && (entry.rating.toString() === '2'),
                            onClick: () => {
                                entry.rating = 2;
                            },
                            forceUpdate: true
                        }, ['']),
                        vDom.CN('label', {for: 'rating_3'}, ['★']),
                        vDom.CN('input', {
                            type: 'radio',
                            name: 'rating',
                            value: '3',
                            id: 'rating_3',
                            checked: !!entry.rating && (entry.rating.toString() === '3'),
                            onClick: () => {
                                entry.rating = 3;
                            },
                            forceUpdate: true
                        }, ['']),
                        vDom.CN('label', {for: 'rating_4'}, ['★']),
                        vDom.CN('input', {
                            type: 'radio',
                            name: 'rating',
                            value: '4',
                            id: 'rating_4',
                            checked: !!entry.rating && (entry.rating.toString() === '4'),
                            onClick: () => {
                                entry.rating = 4;
                            },
                            forceUpdate: true
                        }, ['']),
                        vDom.CN('label', {for: 'rating_5'}, ['★']),
                        vDom.CN('input', {
                            type: 'radio',
                            name: 'rating',
                            value: '5',
                            id: 'rating_5',
                            checked: !!entry.rating && (entry.rating.toString() === '5'),
                            onClick: () => {
                                entry.rating = 5;
                            },
                            forceUpdate: true
                        }, ['']),
                    ]),
                    vDom.CN('div', {className: 'material inputgroup'}, [
                        vDom.CN('input', {
                            type: 'date',
                            name: 'dueto',
                            value: entry.dueto,
                            required: true,
                            onChange: (event) => {
                                entry.dueto = event.target.value;
                            },
                            forceUpdate: true
                        }, []),
                        vDom.CN('span', {className: 'highlight'}, []),
                        vDom.CN('span', {className: 'bar'}, []),
                        vDom.CN('label', {}, ['Erledigen bis:']),
                    ]),
                    vDom.CN('button', {
                        type: 'button',
                        onClick: () => this.Save(entry),
                        forceUpdate: true
                    }, ['speichern']),
                    vDom.CN('button', {type: 'button', onClick: () => this.Close(), forceUpdate: true}, ['abbrechen']),
                ]),
            ]),
        ]);
    }
}

new EditFormView();
