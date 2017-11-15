'use strict';

class Entry {
    constructor() {
        if (!arguments || arguments.length == 0)
            return;

        this.id = arguments['_id'] || arguments[0]['_id'] || null;
        this.finished = arguments['finished'] || arguments[0]['finished'] || null;
        this.created = arguments['created'] || arguments[0]['created'] || null;
        this.dueto = arguments['dueto'] || arguments[0]['dueto'] || null;
        this.rating = arguments['rating'] || arguments[0]['rating'] || 1;
        this.title = arguments['title'] || arguments[0]['title'] || '';
        this.description = arguments['description'] || arguments[0]['description'] || '';
    }

    Save(editform) {
        if (this.id) {
            this.Update(editform);
        } else {
            this.Create(editform);
        }
    }

    Create(editform) {
        AjaxService.POST('/api/todo', {
            finished: this.finished || null,
            created: new Date().toISOString(),
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
        AjaxService.PUT('/api/todo/' + this.id, {
            _id: this.id,
            finished: this.finished || null,
            created: this.created || null,
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
                current.created = entry.created;
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
        AjaxService.PUT('/api/todo/' + this.id, {
            _id: this.id,
            finished: this.finished === null ? new Date() : null,
            created: this.created,
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
        AjaxService.DELETE('/api/todo/' + this.id, (data) => {
            if (data === '1 was a DELETE') {
                entries = entries.filter(e => e.id !== this.id);
                main.children = entries.map(e => e.GetNode());
                RenderUI();
            }
        });
    }

    GetNode() {
        let descriptionLines = this.description.split('\n').map(e => vDom.CN('p', {}, [e]));
        let duetodate = (new Date(this.dueto)).toLocaleDateString();
        if (new Date().getFullYear() > new Date(this.dueto).getFullYear()) duetodate = 'überfällig';
        else if (new Date().getFullYear() === new Date(this.dueto).getFullYear()) {

            if (new Date().getMonth() > new Date(this.dueto).getMonth()) duetodate = 'überfällig';
            else if (new Date().getMonth() === new Date(this.dueto).getMonth()) {

                if (new Date().getDate() > new Date(this.dueto).getDate()) duetodate = 'überfällig';
                else if (new Date().getDate() === new Date(this.dueto).getDate()) duetodate = 'heute';
            }

        }
        if (((new Date(new Date().getTime() + 86400000))).toDateString() === (new Date(this.dueto)).toDateString()) duetodate = 'morgen';
        if (((new Date(new Date().getTime() + 2 * 86400000))).toDateString() === (new Date(this.dueto)).toDateString()) duetodate = 'übermorgen';

        return vDom.CN('section', {id: this.id}, [
            vDom.CN('input', {type: 'checkbox', id: 'entry_' + this.id, checked: this.finished !== null}, []),
            vDom.CN('label', {className: 'button round', onClick: () => this.Finish(), forceUpdate: true}, ['✔']),
            vDom.CN('div', {className: 'duetodate'}, [duetodate]),
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
                onClick: () => this.Delete(),
                forceUpdate: true
            }, ['☠']),
            vDom.CN('label', {
                className: 'button round edit',
                for: 'formtoggler',
                onClick: () => this.Edit(),
                forceUpdate: true
            }, ['✎']),
        ]);
    }
}