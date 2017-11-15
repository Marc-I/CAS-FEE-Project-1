'use strict';

class EntryService {

    static GetAll(sorting, filtering, callback) {
        let sortString = sorting || 'dueto';
        let filterString = filtering || null;
        let querystring = [
            (sortString ? 'sort=' + sortString : null),
            (filterString ? 'filter=' + filterString : null)
        ].filter(e => e !== null).join('&');

        AjaxService.GET('/api/todo' + (querystring ? '?' + querystring : ''), data => {
            callback(JSON.parse(data).map(e => new EntryModel(e)));
        });
    }

    static GetOne(id, callback) {
        AjaxService.GET('/api/todo/' + id, data => {
            callback(new EntryModel(JSON.parse(data)));
        });
    }

    static Create(entry, callback) {
        AjaxService.POST('/api/todo', {
            finished: entry.finished || null,
            created: new Date().toISOString(),
            dueto: entry.dueto || "",
            rating: entry.rating || "1",
            title: entry.title || "",
            description: entry.description || ""
        }, (data) => {
            callback(new EntryModel(JSON.parse(data)));
        });
    }

    static Update(entry, callback) {
        AjaxService.PUT('/api/todo/' + entry.id, {
            _id: entry.id,
            finished: entry.finished || null,
            created: entry.created || null,
            dueto: entry.dueto || "",
            rating: entry.rating || "1",
            title: entry.title || "",
            description: entry.description || ""
        }, (data) => {
            callback(new EntryModel(JSON.parse(data)));
        });
    }

    static Finish(entry, callback) {
        entry.finished = entry.finished === null ? new Date() : null;
        this.Update(entry, callback);

    }

    static Delete(entry, callback) {
        AjaxService.DELETE('/api/todo/' + entry.id, (data) => {
            callback(data);
        });
    }

}