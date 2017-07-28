(function () {
    'use strict';
    angular
            .module('app')
               .controller('HomeController', ['projectService','$state',function (projectService,$state) {
               var vm = this;
               vm.projects = [];
               vm.banners = [];
                
                $("html, body").animate({scrollTop: "0px"});
                
                vm.leerBanners = function(){
                     var promisePost = projectService.leerBanners();
                        promisePost.then(function (d) {
                           vm.banners = d.data;
                            vm.leerDestacados();
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
                 
                 vm.leerDestacados = function(){
                     var promisePost = projectService.leerDestacados();
                        promisePost.then(function (d) {
                           vm.projects = d.data;
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                 }
                 
                vm.construir_imagen = function(url, id){
                     $("#img-destacado-"+id).css({
                         "background-image":"url("+url+")",
                         "background-size": "cover",
                         "background-repeat":"no-repeat",
                     });
                 }
                 
                 vm.verProyecto = function(proyecto){
                      $state.go('app.verproyecto');
                      sessionStorage.setItem('proyecto',JSON.stringify(proyecto));
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