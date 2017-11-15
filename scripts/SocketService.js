'use strict';

class SocketService {
    constructor() {
        this.socket = io();

        this.socket.on('msg', (data) => {
            console.log(data);
        });

        this.socket.on('add', (data) => {
            BaseController.EntryController.AddResponse(new EntryModel(data));
        });

        this.socket.on('update', (data) => {
            BaseController.EntryController.UpdateResponse(new EntryModel(data));
        });

        this.socket.on('delete', (data) => {
            BaseController.EntryController.DeleteResponse(data);
        });
    }

    send(data) {
        this.socket.emit('send', data);
    }
}