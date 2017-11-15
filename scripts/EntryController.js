'use strict';

class EntryController {

    constructor() {
        this.entries = [];
        this.view = new EntryView(this);
        this.replaceEntry = (data) => {
            if (data) {
                this.entries.splice(this.entries.findIndex(e => e.id === data.id), 1, data);
                this.view.RenderEntries(this.entries);
            }
        };

        EntryService.GetAll(null, null, (data) => {
            this.entries = data;
            this.view.RenderEntries(this.entries);
        });
    }

    Add(entry) {
        EntryService.Create(entry, () => {});
    }

    AddResponse(entry) {
        if (entry) {
            this.entries.push(entry);
            this.view.RenderEntries(this.entries);
        }
    }

    Edit(entry) {
        EditFormView.Render(entry);
    }

    Update(entry) {
        EntryService.Update(entry, (data) => {
            this.UpdateResponse(data);
        });
    }

    UpdateResponse(entry) {
        if (entry) {
            this.entries.splice(this.entries.findIndex(e => e.id === entry.id), 1, entry);
            this.view.RenderEntries(this.entries);
        }
    }

    Finish(entry) {
        EntryService.Finish(entry, (data) => {
            this.UpdateResponse(data);
        });
    }

    Delete(entry) {
        EntryService.Delete(entry, (data) => this.DeleteResponse);
    }

    DeleteResponse(msg) {
        this.entries = this.entries.filter(e => e.id !== msg);
        this.view.RenderEntries(this.entries);
    }
}
