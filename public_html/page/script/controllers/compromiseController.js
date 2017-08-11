(function () {
    'use strict';
    angular
            .module('app')
            .controller('CompromisoController', ['projectService',function (projectService) {
                    var vm = this;
                    $("html, body").animate({scrollTop: "0px"});
                    vm.compromises = [];
                    
                    vm.mobile = false;
               
              
             

               if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    vm.mobile = true;
                 }
                 
                  $(window).scroll(function() {
                 var scrolledY = $(window).scrollTop();
                 if(vm.mobile){
                     $('#image-banner-mobile-compromiso').css('background-position', 'left ' + ((scrolledY)) + 'px');
                 }
                    
              });

                    vm.leerCompromisos = function(){
                          var promisePost = projectService.getCompromisos();
                        promisePost.then(function (d) {
                          vm.compromises = d.data;
                        }, function (err) {
                            if (err.status == 402) {
                                //toastr["error"](err.data.respuesta);
                            } else {
                                //toastr["error"]("Ha ocurrido un problema!");
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
