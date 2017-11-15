'use strict';
const Datastore = require('nedb');
const db = new Datastore({filename: './data/todo.db', autoload: true});

exports.getAllNotes = (req, res, io) => {
    let sorting = {dueto: 1};
    if (req.query.sort) {
        switch (req.query.sort) {
            case 'dueto':
                sorting = {dueto: 1};
                break;
            case '-dueto':
                sorting = {dueto: -1};
                break;
            case 'finished':
                sorting = {finished: 1};
                break;
            case '-finished':
                sorting = {finished: -1};
                break;
            case 'created':
                sorting = {created: 1};
                break;
            case '-created':
                sorting = {created: -1};
                break;
            case 'rating':
                sorting = {rating: 1};
                break;
            case '-rating':
                sorting = {rating: -1};
                break;
        }
    }

    let filter = {};
    if (req.query.filter) {
        filter = {$not: {finished: null}};
    }

    db.find(filter).sort(sorting).exec((err, newDoc) => {
        res.json(newDoc);
    });
};

exports.getOneNote = (req, res, io) => {
    db.findOne({_id: req.params.toDoId}, (err, newDoc) => {
        res.json(newDoc);
    });
};

exports.postNote = (req, res, io) => {
    db.insert(req.body, (err, newDoc) => {
        io.emit('add', newDoc);
        res.json(newDoc);
    });
};

exports.putNote = (req, res, io) => {
    db.update({_id: req.params.toDoId}, req.body, {new: true}, (err, numReplaced) => {
        io.emit('update', req.body);
        res.json(req.body);
    });
};

exports.deleteNote = (req, res, io) => {
    db.remove({_id: req.params.toDoId}, {}, (err, numRemoved) => {
        io.emit('delete', req.params.toDoId);
        res.end("deleted");
    });
};

