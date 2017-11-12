'use strict';

class EditForm {
    constructor(entry) {
        this.Entry = entry instanceof Entry ? entry : new Entry();
    }

    Open(entry) {
        this.Entry = entry instanceof Entry ? entry : new Entry();
        editFormNode.children = [this.GetNode()];
        RenderUI();
    }

    Close() {
        this.Entry = null;
        editFormNode.children = [];
        RenderUI();
    }

    GetNode() {
        return vDom.CN('div', {id: 'hdiv'}, [
            vDom.CN('form', {
                action: '#', method: 'post', onSubmit: (e) => {
                    e.preventDefault();
                    this.Entry.Save(this);
                    return false;
                }
            }, [
                vDom.CN('div', {}, [
                    vDom.CN('h1', {}, ['Hinzufügen / Bearbeiten']),
                    vDom.CN('div', {className: 'material inputgroup'}, [
                        vDom.CN('input', {
                            type: 'text',
                            name: 'title',
                            value: this.Entry.title || '',
                            required: true,
                            onChange: (event) => {
                                this.Entry.title = event.target.value;
                            }
                        }, []),
                        vDom.CN('span', {className: 'highlight'}, []),
                        vDom.CN('span', {className: 'bar'}, []),
                        vDom.CN('label', {}, ['Titel']),
                    ]),
                    vDom.CN('div', {className: 'material inputgroup'}, [
                        vDom.CN('textarea', {
                            name: 'description',
                            value: this.Entry.description || '',
                            required: true,
                            onChange: (event) => {
                                this.Entry.description = event.target.value;
                            }
                        }, [this.Entry.description || '']),
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
                            checked: this.Entry.rating && this.Entry.rating.toString() === '1',
                            onClick: () => {
                                this.Entry.rating = 1;
                            }
                        }, ['']),
                        vDom.CN('label', {for: 'rating_2'}, ['★']),
                        vDom.CN('input', {
                            type: 'radio',
                            name: 'rating',
                            value: '2',
                            id: 'rating_2',
                            checked: this.Entry.rating && this.Entry.rating.toString() === '2',
                            onClick: () => {
                                this.Entry.rating = 2;
                            }
                        }, ['']),
                        vDom.CN('label', {for: 'rating_3'}, ['★']),
                        vDom.CN('input', {
                            type: 'radio',
                            name: 'rating',
                            value: '3',
                            id: 'rating_3',
                            checked: this.Entry.rating && this.Entry.rating.toString() === '3',
                            onClick: () => {
                                this.Entry.rating = 3;
                            }
                        }, ['']),
                        vDom.CN('label', {for: 'rating_4'}, ['★']),
                        vDom.CN('input', {
                            type: 'radio',
                            name: 'rating',
                            value: '4',
                            id: 'rating_4',
                            checked: this.Entry.rating && this.Entry.rating.toString() === '4',
                            onClick: () => {
                                this.Entry.rating = 4;
                            }
                        }, ['']),
                        vDom.CN('label', {for: 'rating_5'}, ['★']),
                        vDom.CN('input', {
                            type: 'radio',
                            name: 'rating',
                            value: '5',
                            id: 'rating_5',
                            checked: this.Entry.rating && this.Entry.rating.toString() === '5',
                            onClick: () => {
                                this.Entry.rating = 5;
                            }
                        }, ['']),
                    ]),
                    vDom.CN('div', {className: 'material inputgroup'}, [
                        vDom.CN('input', {
                            type: 'date',
                            name: 'dueto',
                            value: this.Entry.dueto,
                            required: true,
                            onChange: (event) => {
                                this.Entry.dueto = event.target.value;
                            }
                        }, []),
                        vDom.CN('span', {className: 'highlight'}, []),
                        vDom.CN('span', {className: 'bar'}, []),
                        vDom.CN('label', {}, ['Erledigen bis:']),
                    ]),
                    vDom.CN('button', {type: 'button', onClick: () => this.Entry.Save(this)}, ['speichern']),
                    vDom.CN('button', {type: 'button', onClick: () => this.Close()}, ['abbrechen']),
                ]),
            ]),
        ]);
    }
}
