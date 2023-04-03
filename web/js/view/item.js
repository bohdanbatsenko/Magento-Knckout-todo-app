define(['uiElement',
    'Magento_Ui/js/modal/modal',
    'Magento_Theme/js/action/item/status',
    'Magento_Theme/js/action/item/text',
    'Magento_Theme/js/action/item/remove'
], (
    uiElement, modal, todoItemActionUpdateStatus,todoItemActionUpdateText, todoItemActionRemove
) => {
    'use strict';

    return uiElement.extend({
        // get parent component in order to remove item from DOM
        defaults: {
            modules: {
                listComponent: 'todo.list'
            },
            modal: null,
            modalOptions: {
                type: 'popup',
                title: 'Edit task',
                buttons: []
            },
            tracks: {
                //'itemStatus editState textInput': true // also could be an option
                itemStatus: true,
                editState: true,
                textInput: true
            },
            listens: {
                itemStatus: 'onStatusUpdated'
            }
        },

        refModal(modal) {
            this.modal = $(modal);
        },

        showModal() {
            this.modal.modal('openModal');
        },

        submit() {
            if (!this.textInput) return false;
            this.onTextUpdated();
            this.modal.modal('closeModal');
        },

        onStatusUpdated(status) {
            todoItemActionUpdateStatus(this.item.id, status);
        },

        onTextUpdated() {
            this.editState = false;
            //ensure we don't pass empty input value
            if (!this.textInput) {
                this.textInput = this.item.text;
            }
            this.item.text = this.textInput;
            todoItemActionUpdateText(this.item.id, this.item.text);
        },

        remove() {
            todoItemActionRemove(this.item.id);
            // call removeChild  method that is standard uiComponent method. "This" point to ui element
            this.listComponent().removeChild(this);
        }
    });

});
