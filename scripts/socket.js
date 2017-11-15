'use strict';

class Socket {
    constructor(){
        this.socket = io();//'http://127.0.0.1:3119/', {path: '/socket'});

        this.socket.on('msg', (data) => {
            console.log(data);
        });
        this.socket.on('add', (data) => {
            console.log('add', data);
        });
        this.socket.on('update', (data) => {
            console.log('update', data);
        });
        this.socket.on('delete', (data) => {
            console.log('delete', data);
        });
    }

    send (data) {
        this.socket.emit('send', data);
    }
}