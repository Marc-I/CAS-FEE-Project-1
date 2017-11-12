'use strict';

class Entry {
    constructor() {
        if (!arguments || arguments.length == 0)
            return;

        this.id = arguments['_id'] || arguments[0]['_id'] || null;
        this.finished = arguments['finished'] || arguments[0]['finished'] || false;
        this.dueto = arguments['dueto'] || arguments[0]['dueto'] || null;
        this.rating = arguments['rating'] || arguments[0]['rating'] || 1;
        this.title = arguments['title'] || arguments[0]['title'] || '';
        this.description = arguments['description'] || arguments[0]['description'] || '';
    }

    static GetAll() {
        Ajax.GET('http://127.0.0.1:3119/api/todo', function (data) {
            entries = JSON.parse(data).map(e => new Entry(e));
            main.children = entries.map(e => e.GetNode());
            RenderUI();
        });
    }

    Save(editform) {
        if (this.id) {
            this.Update(editform);
        } else {
            this.Create(editform);
        }
    }

    Create(editform) {
        Ajax.POST('http://127.0.0.1:3119/api/todo', {
            finished: this.finished || false,
            dueto: this.dueto || "",
            rating: this.rating || "1",
            title: this.title || "",
            description: this.description || ""
        }, (data) => {
            if (data) {
                let entry = JSON.parse(data);
                entries.push(new Entry(entry));
                main.children = entries.map(e => e.GetNode());
                editform.Close();
            }
        });
    }

    Update(editform) {
        Ajax.PUT('http://127.0.0.1:3119/api/todo', {
            _id: this.id,
            finished: this.finished || false,
            dueto: this.dueto || "",
            rating: this.rating || "1",
            title: this.title || "",
            description: this.description || ""
        }, (data) => {
            if (data) {
                let entry = JSON.parse(data);
                let current = entries.filter(e => e.id === entry._id)[0];
                current.title = entry.title;
                current.description = entry.description;
                current.finished = entry.finished;
                current.dueto = entry.dueto;
                current.rating = entry.rating;

                main.children = entries.map(e => e.GetNode());
                editform.Close();
            }
        });
    }

    Edit() {
        editForm.Open(this);
    }

    Finish() {
        Ajax.PUT('http://127.0.0.1:3119/api/todo', {
            _id: this.id,
            finished: !this.finished,
            dueto: this.dueto,
            rating: this.rating,
            title: this.title,
            description: this.description
        }, (data) => {
            if (data) {
                let entry = JSON.parse(data);
                this.finished = entry.finished;
                let current = entries.filter(e => e.id === entry._id)[0];
                current.finished = entry.finished;

                main.children = entries.map(e => e.GetNode());
                RenderUI();
            }
        });
    }

    Delete() {
        Ajax.DELETE('http://127.0.0.1:3119/api/todo/' + this.id, (data) => {
            if (data === '1 was a DELETE') {
                entries = entries.filter(e => e.id !== this.id);
                main.children = entries.map(e => e.GetNode());
                RenderUI();
            }
        });
    }

    GetNode() {
        let descriptionLines = this.description.split('\n').map(e => vDom.CN('p', {}, [e]));
        return vDom.CN('section', {id: this.id}, [
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
                className: 'button round delete',
                for: 'formtoggler',
                onClick: () => this.Delete()
            }, ['☠']),
            vDom.CN('label', {
                className: 'button round edit',
                for: 'formtoggler',
                onClick: () => this.Edit()
            }, ['✎']),
        ]);
    }
}