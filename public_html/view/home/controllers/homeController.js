(function () {
    'use strict';
    angular
            .module('app')
            .controller('HomeController', function () {

                 var vm = this;
         
                 
                 setTimeout(function(){
                   var oTable = $('#editable_projects').DataTable();
                },500);
        });
})();




