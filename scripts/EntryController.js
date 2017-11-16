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

        this.Get(null, null);
    }

    Get(sorting, filtering) {
        EntryService.GetAll(sorting, filtering, (data) => {
            this.entries = data;
            this.view.RenderEntries(this.entries);
        });
    }

    Add(entry) {
        EntryService.Create(entry, (data) => {
            this.AddOrUpdateResponse(data);
        });
    }

    AddOrUpdateResponse(entry) {
        if (entry) {
            if (this.entries.findIndex(e => e.id === entry.id) >= 0)
                this.entries.splice(this.entries.findIndex(e => e.id === entry.id), 1, entry);
            else
                this.entries.push(entry);
            this.view.RenderEntries(this.entries);
        }
    }

    Edit(entry) {
        EditFormView.Render(entry);
    }

    Update(entry) {
        EntryService.Update(entry, (data) => {
            this.AddOrUpdateResponse(data);
        });
    }

    Finish(entry) {
        EntryService.Finish(entry, (data) => {
            this.AddOrUpdateResponse(data);
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
