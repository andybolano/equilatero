(function () {
    'use strict';
    angular
            .module('app')
            .controller('HomeController', [ 'projectService',function (projectService) {

                 var vm = this;
                 vm.projects = [];
         
                 vm.getProjects = function(){
                     var promisePost = projectService.getAll();
                        promisePost.then(function (d) {
                           vm.projects = d.data;
                           console.log(vm.projects)
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                 }
                 setTimeout(function(){
                   var oTable = $('#editable_projects').DataTable();
                },500);
        }]);
})();




