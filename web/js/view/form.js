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
               buttons: []
           },
           template: 'Magento_Theme/form',
           textInput: '',
           //textInput: ko.observable('default'), // then we don't need this.observe inside initObservable
           tracks: {
               textInput: true // object that accepts variable
           },
           //create ko observe var as a entire component
           modules: {
               listComponent: 'todo.list'
           }
       },

       showModal() {
           this.modal.modal('openModal');
       },

       refModal(modal) {
           this.modal = $(modal).modal(this.modalOptions);
       },

       submit() {
           if (!this.textInput) return false;

           this.add();
           this.reset();
           this.modal.modal('closeModal');
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
