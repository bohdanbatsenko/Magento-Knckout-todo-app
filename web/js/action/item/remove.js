define(['Magento_Theme/js/model/list'], function (todoListModel) {
    'use strict';

    return function(id){

        //return todoListModel.set(todoListModel.get().filter(item => item.id !== id));
        const list = todoListModel.get();

        return todoListModel.set(list.filter(item => item.id !== id));
    }

});
