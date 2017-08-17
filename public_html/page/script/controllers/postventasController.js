(function () {
    'use strict';
    angular
            .module('app')
            .controller('PostventasController', ['projectService',function (projectService) {
                    var vm = this;
                    $("html, body").animate({scrollTop: "0px"});
                    vm.proyectos = [];
                    vm.mensaje = {};

                    vm.getProyectos = function(){
                        var promisePost = projectService.leerProyectosPostventa();
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
                    
                    vm.enviar = function(){
                        
                        if(!vm.mensaje.proyecto){
                            toastr["warning"]("Elegir proyecto");
                            return 0;
                        }
                        if(!vm.mensaje.nombre){
                            toastr["warning"]("Escribir nombre");
                             return 0;
                        }
                        if(!vm.mensaje.cedula){
                            toastr["warning"]("Escribir cédula");
                             return 0;
                        }
                        if(!vm.mensaje.email){
                            toastr["warning"]("Escribir email");
                             return 0;
                        }
                        if(!vm.mensaje.telefono){
                            toastr["warning"]("Escribir telefono");
                             return 0;
                        }
                        if(!vm.mensaje.tipoInmueble){
                            toastr["warning"]("Elegir tipo de inmueble");
                             return 0;
                        }
                         if(!vm.mensaje.tipoPostventa){
                            toastr["warning"]("Elegir tipo de postventa");
                             return 0;
                        }
                        
                        var promisePost = projectService.enviarPostventa(vm.mensaje);
                        promisePost.then(function (d) {
                         toastr['success'](d.data.message);
                          vm.mensaje ={};
                        }, function (err) {
                            if (err.status == 402) {
                               // toastr["error"](err.data.respuesta);
                            } else {
                               // toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                        
                    }

                }]);

})();