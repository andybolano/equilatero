(function () {
    'use strict';
    angular
            .module('app')
            .controller('templateController', ['projectService', function (projectService) {

                     var vm = this;
                     vm.user = {};
                     vm.contacto = {};
      
             vm.mobile = false;
               
               if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    vm.mobile = true;
                    console.log(vm.mobile)
                  
                 }
          vm.to = function(id){
               var posicion = $("#"+id).offset().top;
               $("html, body").animate({scrollTop:posicion+"px"});
            }
        
            vm.active = function(id){
                $("#navbar").attr("aria-expanded","false");
                $("#navbar").removeClass("in");
                $('li').removeClass("active");
                $('#'+id).addClass("active");
           }
           
           
            vm.leerUser = function(){
                if(!sessionStorage.getItem('user')){
                     var promisePost = projectService.getUser();
                        promisePost.then(function (d) {
                           vm.user = d.data[0];
                           sessionStorage.setItem('user',JSON.stringify(vm.user));
                        }, function (err) {
                            if (err.status == 402) {
                                //toastr["error"](err.data.respuesta);
                            } else {
                               // toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                 }else{
                    vm.user = JSON.parse(sessionStorage.getItem('user'));
                 }
            
            }
            
            vm.contactoPost = function(){
                if(!vm.contacto.email){
                    toastr["warning"]("Por favor ingresar el email");
                    return 0;
                }
                if(!vm.contacto.mensaje){
                    toastr["warning"]("Por favor ingresar el mensaje");
                    return 0;
                }
                
                var object = {
                    email:vm.contacto.email,
                    mensaje:vm.contacto.mensaje
                }
                
                 var promisePost = projectService.postContacto(object);
                        promisePost.then(function (d) {
                            toastr["success"]("Su mensaje ha sido enviado con exito");
                            vm.contacto = {};
                        }, function (err) {
                            if (err.status == 402) {
                               // toastr["error"](err.data.respuesta);
                            } else {
                              //  toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
            }
            
         }]);

})();