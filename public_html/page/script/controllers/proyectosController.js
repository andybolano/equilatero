(function () {
    'use strict';
    angular
            .module('app')
               .controller('ProyectosController', ['projectService','$state',function (projectService,$state) {
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
                         if(d.data == 'NULL'){
                              toastr["warning"]("No hay proyectos como lo estas buscando..");
                              vm.proyectos = {};
                              vm.proyectos.length = 0;
                             return 0;
                         }
                         vm.proyectos = d.data;
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                 }
                 
              
                 vm.verProyecto = function(proyecto){
                      $state.go('app.verproyecto');
                      sessionStorage.setItem('proyecto',JSON.stringify(proyecto));
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