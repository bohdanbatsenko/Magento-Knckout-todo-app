define(['uiCollection', 'uiLayout', 'Magento_Theme/js/model/list'], (uiCollection, uiLayout, todoListModel) => {
    'use strict';

    return uiCollection.extend({
          defaults: {
              template: 'Magento_Theme/list'
          },

        initialize() {
          this._super();

         this.renderItems();

          return this;
        },

        renderItems() {
            todoListModel.get().map(this.renderItem.bind(this));
        },

        renderItem(item) {
            uiLayout([
                {
                //pass configuration of a new component
                    component: 'Magento_Theme/js/view/item',
                    template: 'Magento_Theme/item',
                    //the most important is to pass a parent
                    parent: this.name,
                    //set unique name for each component
                    name: `item-${item.id}`,
                    item,
                    itemStatus: item.status,
                    textInput: item.text,
                    editState: false

                }
            ]);
        }
  });
});
