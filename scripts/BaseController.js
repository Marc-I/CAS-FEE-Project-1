'use strict';

class BaseController {
    constructor() {
        BaseController.EntryController = new EntryController();
        BaseController.Socket = new SocketService();
    }
}

new BaseController();
