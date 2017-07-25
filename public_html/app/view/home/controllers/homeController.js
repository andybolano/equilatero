(function () {
    'use strict';
    angular
            .module('app')
            .controller('HomeController', [ 'projectService','$location',function (projectService,$location) {

                 var vm = this;
                 vm.projects = [];
         
                 vm.getProjects = function(){
                     var promisePost = projectService.getAll();
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
                 
                 vm.viewProject = function (proyecto){
                     sessionStorage.setItem('proyecto',JSON.stringify(proyecto));
                     $location.path("/project/update");
                 }
                 vm.updateProject = function(param,project,estado){
                  
                     if(param == 'estado'){
                         if(estado == 'ACTIVO'){
                            var valid;
                                valid = ( project.galeria == 0 ) ? toastr['warning']("No se puede activar, Agregar la galeria de imagenes al proyecto.") : true ;
                                if(valid !== true){
                                        return 0;
                                 }
                                valid = ( project.planos == 0 ) ? toastr['warning']("No se puede activa, Agregar planos del proyecto.") : true ;
                                if(valid !== true){
                                        return 0;
                                 }
                                valid = ( project.ubicacion_geografica == 0 ) ? toastr['warning']("No se puede activar, Agregar ubicación geografica al proyecto.") : true ;
                                if(valid !== true){
                                        return 0;
                                 }
                                valid = ( project.zonas_comunes == 0 ) ? toastr['warning']("No se puede activa, Agregar zonas comunes al proyecto.") : true ;
                                if(valid !== true){
                                        return 0;
                                 }
                           
                        }
                         project.estado = estado;
                     }
                     if(param == 'destacado'){
                          if(estado == 1){
                            var valid;
                                valid = ( project.banner == 0 ) ? toastr['warning']("No se puede promocionar en el banner, Agregar imagen de banner al proyecto.") : true ;
                                if(valid !== true){
                                        return 0;
                                 }

                        }
                         project.destacado = estado;
                     }
                     
                  
                     var promisePost = projectService.update(project);
                        promisePost.then(function (d) {
                           toastr['success'](d.data.message);
                           vm.getProjects();
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



