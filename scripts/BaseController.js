'use strict';

class BaseController {
    constructor() {
        BaseController.EntryController = new EntryController();
        BaseController.Socket = new SocketService();

        this.RenderFilterButton_1();
        this.RenderFilterButton_2();
        this.RenderFilterButton_3();
        this.RenderFilterButton_4();
    }

    RenderFilterButton_1() {
        vDom.Render('sortFinishedButton', vDom.CN('button', {
            type: 'button',
            onClick: () => BaseController.EntryController.Get('finished', null),
            forceUpdate: true
        }, ['By finish Date']));
    }

    RenderFilterButton_2() {
        vDom.Render('sortCreatedButton', vDom.CN('button', {
            type: 'button',
            onClick: () => BaseController.EntryController.Get('created', null),
            forceUpdate: true
        }, ['By create Date']));
    }

    RenderFilterButton_3() {
        vDom.Render('sortRatingButton', vDom.CN('button', {
            type: 'button',
            onClick: () => BaseController.EntryController.Get('rating', null),
            forceUpdate: true
        }, ['By importance']));
    }

    RenderFilterButton_4() {
        vDom.Render('filterFinishedButton', vDom.CN('button', {
            type: 'button',
            id: 'filter',
            onClick: () => {
                let button = document.querySelector('main > div').classList;
                if (button.contains('hidefinished'))
                    button.remove('hidefinished');
                else
                    button.add('hidefinished');
            },
            forceUpdate: true
        }, ['Show finished']));
    }
}

new BaseController();
