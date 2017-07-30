(function () {
    'use strict';
    angular
            .module('app')
            .controller('CompromisoController', ['projectService',function (projectService) {
                    var vm = this;
                    $("html, body").animate({scrollTop: "0px"});
                    vm.compromises = [];

                    vm.leerCompromisos = function(){
                          var promisePost = projectService.getCompromisos();
                        promisePost.then(function (d) {
                          vm.compromises = d.data;
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                    vm.impar = function(n){
                     var tipo=(n%2) ? true:false;
		     return tipo;
                 }
                 
                vm.par = function(n){
                     var tipo=(n%2) ? false:true;
		     return tipo;
                 }

                }]);

})();