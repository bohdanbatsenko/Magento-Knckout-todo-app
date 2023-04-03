define([
    'jquery',
    'knockout',
    'Magento_Ui/js/modal/modal',
    'uiElement',
    'Magento_Theme/js/model/item',
    'Magento_Theme/js/action/item/add'],
       ($, ko, modal, uiElement, todoItemModel, todoItemActionAdd) => {
   'use strict';

   return uiElement.extend({

       defaults: {
           modal: null,
           modalOptions: {
               type: 'popup',
               title: 'Add task',
               //trigger: '[data-trigger=trigger]' - no need since data-bind="click: showModal" is used
               responsive: true,
               buttons: [],
               focus: null // Review fix: reset _setFocus method for the modal widget
           },
           template: 'Magento_Theme/form',
           textInput: '',
           inputFocused: false,
           //textInput: ko.observable('default'), // then we don't need this.observe inside initObservable
           tracks: {
               textInput: true, // object that accepts variable
               inputFocused: true
           },
           //create ko observe var as a entire component
           modules: {
               listComponent: 'todo.list'
           }
       },

       showModal() {
           this.modal.modal('openModal');
           this.inputFocused = true;
       },

       refModal(modal) {
           this.modal = $(modal).modal(this.modalOptions);
       },

       submit() {
           this.inputFocused = false;

           if (!this.textInput) return false;

           this.modal.modal('closeModal');
           this.add();
           this.reset();
       },

       add() {
           const item = {
               id: todoItemModel.generateId(),
               text: this.textInput,
               status: false
           };

           todoItemActionAdd(item);
           this.listComponent().renderItem(item);
       },

       reset() {
           this.textInput = '';
       }

   });
});
