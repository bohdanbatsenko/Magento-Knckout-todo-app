define([], function() {
    'use strict';

    return {
        generateId() {
            return `${Math.random().toString().substring(2)} ${new Date().getTime()}`;
        }
    };
});
