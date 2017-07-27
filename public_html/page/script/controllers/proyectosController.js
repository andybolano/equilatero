(function () {
    'use strict';
    angular
            .module('app')
               .controller('ProyectosController', ['projectService',function (projectService) {
               var vm = this;
               vm.anios = [];
               vm.ciudad = [];
               vm.tipo = [];
               vm.consulta = {};
               vm.proyectos =[];
        
                $("html, body").animate({scrollTop: "0px"});
                
                vm.leerCondiciones = function(){
                     var promisePost = projectService.leerCondiciones();
                        promisePost.then(function (d) {
                          vm.anios = d.data.anios;
                          vm.ciudad = d.data.ciudad;
                          vm.tipos = d.data.tipos;
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                 }
                 
                 vm.verProyectos = function(tipo){
                     $('.cont-tab').removeClass('active');
                     $('#'+tipo).addClass('active');
                     if(tipo == 'realizados'){
                         vm.getProyectos(1);
                     }else{
                         vm.getProyectos(0);
                     }
                 }
                 
                 vm.getProyectos = function(param){
                     var promisePost = projectService.leerProyectos(param);
                        promisePost.then(function (d) {
                         vm.proyectos = d.data;
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                 }
                 
              
                 
               vm.construir_imagen = function(url, id){
                     $("#img-"+id).css({
                         "background-image":"url("+url+")",
                         "background-size": "cover",
                         "background-repeat":"no-repeat",
                     });
                 }
                 
      
        
         }]);

})();