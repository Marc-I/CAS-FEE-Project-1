'use strict';

class EntryModel {
    constructor() {
        if (!arguments || arguments.length == 0)
            return;

        this.id = arguments['_id'] || arguments['id'] || arguments[0]['_id'] || arguments[0]['id'] || null;
        this.finished = arguments['finished'] || arguments[0]['finished'] || null;
        this.created = arguments['created'] || arguments[0]['created'] || null;
        this.dueto = arguments['dueto'] || arguments[0]['dueto'] || null;
        this.rating = arguments['rating'] || arguments[0]['rating'] || 1;
        this.title = arguments['title'] || arguments[0]['title'] || '';
        this.description = arguments['description'] || arguments[0]['description'] || '';
    }
}