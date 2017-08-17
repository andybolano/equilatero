(function () {
    'use strict';
    angular
            .module('app')
               .controller('HomeController', ['projectService','$state',function (projectService,$state) {
               var vm = this;
               vm.projects = [];
               vm.banners = [];
               vm.mobile = false;
               
               if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    vm.mobile = true;
                       setTimeout(function(){
                     $('.flexslider-parrafo').flexslider({
                      animation: "slide",
                       
                            start: function (slider) {
                                $('.flex-direction-nav').css({visibility: 'hidden'});
                            }
                    });
                     },100);
                 } 
                
                $("html, body").animate({scrollTop: "0px"});
                
                vm.centrar = function(){
                    setTimeout(function( ){ 
                    $('.container-banner').css({
                        position:'absolute',
                        'margin-left': ($('#sl').width() - $('.container-banner').outerWidth())/2,
                        'margin-top': ($('#sl').height() - $('.container-banner').outerHeight())/2,
                        'display':'block'
                   });
                    }, 1000);
                }
                vm.leerBanners = function(){
                     var promisePost = projectService.leerBanners();
                        promisePost.then(function (d) {
                           vm.banners = d.data;
                            vm.leerDestacados();
                           setTimeout(function(){
                    $('.flexslider').flexslider({
                      animation: "slide"
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
                                //toastr["error"](err.data.respuesta);
                            } else {
                               // toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                 }
                 
                vm.construir_imagen = function(url, id){
                     $("#img-destacado-"+id).css({
                         "background-image":"url("+url+")",
                         "background-size": "100%",
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