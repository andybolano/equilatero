(function () {
    'use strict';
    angular
            .module('app')
               .controller('HomeController', ['projectService',function (projectService) {
                var vm = this;
               vm.projects = [];
        
                
                
                  vm.leerDestacados = function(){
                     var promisePost = projectService.leerDestacados();
                        promisePost.then(function (d) {
                           vm.projects = d.data;
                           console.log(vm.projects)
                           setTimeout(function(){
                    $('.flexslider').flexslider({
                      animation: "slide",
                       start:function(slider){
                        $('.flex-direction-nav').css({visibility:'hidden'});
                    }
                    });
                },100);
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