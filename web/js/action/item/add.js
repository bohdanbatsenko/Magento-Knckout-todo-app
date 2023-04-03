define(['Magento_Theme/js/model/list'], function(todoListModel) {
   'use strict';

    return function (item) {
        const list = todoListModel.get();

        list.push(item);

        return todoListModel.set(list);
    };
});
