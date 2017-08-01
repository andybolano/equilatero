var _position = {};
(function () {
    'use strict';
    angular
            .module('app')
            .controller('updateProjectController', ['ubicacionService', 'projectService', 'tipoProyectoService', 'tipoPlanoService','zoneService', '$scope','$state', 'HOME', function (ubicacionService, projectService, tipoProyectoService, tipoPlanoService, zoneService,$scope,$state, HOME) {

                    var vm = this;
                    vm.paises = [];
                    vm.departamentos = [];
                    vm.municipios = [];
                    vm.tipos_proyectos = [];
                    vm.tipos_planos = [];
                    vm.type_project = {};
                    vm.type_plane = {};
                    vm.Project = {};
                    vm.Plano = {};
                    vm.planos = [];
                    vm.galeria = [];
                    vm.zones = [];
                    vm.updatePlano = false;
                    vm.proyecto_proccess = {};
                   
                    initMap();
                   vm.view_plano = function(plano){
                       vm.updatePlano = true;
                       vm.Plano = plano;
                       vm.Plano.desde = plano.valor_desde;
                       vm.Plano.tipo_plano = {id:plano.tipo};
                     
                       document.getElementById("image_plano").innerHTML = '<img class="animated bounceIn"  src='+vm.Plano.url_plano+' >';
                   } 
                   
                   vm.update_plane = function(){
                      
                        
                         if (!vm.proyecto_proccess.id) {
                            toastr['warning']("No se encuentra el proyecto cargado");
                            return 0;
                        }

                        if (!vm.Plano.titulo) {
                            toastr['warning']("Ingresar titulo del plano");
                            return 0;
                        }
                        if (!vm.Plano.tipo_plano) {
                            toastr['warning']("Ingresar tipo del plano");
                            return 0;
                        }
                        if (!vm.Plano.desde) {
                            toastr['warning']("Ingresar valor desde");
                            return 0;
                        }
                        if (!vm.Plano.area_balcon) {
                            toastr['warning']("Ingresar area del balcon, en caso de no tener balcon ingresar el numero cero (0)");
                            return 0;
                        }
                        if (!vm.Plano.area_construida) {
                            toastr['warning']("Ingresar area construida");
                            return 0;
                        }
                        if (!vm.Plano.area_privada) {
                            toastr['warning']("Ingresar area privada");
                            return 0;
                        }
                        if (!vm.Plano.estrato) {
                            toastr['warning']("Ingresar estrato");
                            return 0;
                        }


                        var formData = new FormData();
                        formData.append('id', vm.Plano.id);
                        formData.append('imagen', vm.Plano.image);
                        formData.append('titulo', vm.Plano.titulo);
                        formData.append('tipo', vm.Plano.tipo_plano.id);
                        formData.append('valor_desde', vm.Plano.desde);
                        formData.append('area_balcon', vm.Plano.area_balcon);
                        formData.append('area_construida', vm.Plano.area_construida);
                        formData.append('area_privada', vm.Plano.area_privada);
                        formData.append('estrato', vm.Plano.estrato);
                        formData.append('idProyecto', vm.proyecto_proccess.id);
                        $('#actualizar_plano').attr("disabled", true);

                        var promisePost = projectService.update_plano(formData);
                        promisePost.then(function (d) {
                            $('#actualizar_plano').attr("disabled", false);
                            vm.Plano = {};
                      
                            vm.planos = d.data.planos;

                           vm.updatePlano = false;
                  
                        
                            document.getElementById("image_plano").innerHTML = '<div class="row animated bounceIn">' +
                                    '<div class="col-lg-12" style="text-align: center;">' +
                                    '  <i class="fa fa-image ico-bg" style="font-size: 100px;margin-top: 80px"></i>' +
                                    '</div>' +
                                    '</div>';
                            setTimeout(function(){
                                document.getElementById('files_plano').addEventListener('change', archivo, false);
                            },1000)
                            
                            
                            toastr['success'](d.data.message);
                        }, function (err) {
                            $('#guardar_plano').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                   }
                   
                   vm.cancelar_update_plane = function(){
                       vm.Plano ={};
                       vm.updatePlano = false;
                       document.getElementById("image_plano").innerHTML = '<div class="row">'+
                                            '<div class="col-lg-12" style="text-align: center;">'+
                                                '<i class="fa fa-image ico-bg" style="font-size: 100px;margin-top: 80px"></i>'+
                                            '</div>'+
                                        '</div>';
                                 setTimeout(function(){
                                document.getElementById('files_plano').addEventListener('change', archivo, false);
                            },1000)
                   }
                   
                   vm.getProject = function(){
                      var project = JSON.parse(sessionStorage.getItem('proyecto'));
                       vm.proyecto_proccess = project.proyecto;
                       vm.Project = project.informacion_basica;
                       vm.Project.anio = parseInt(project.informacion_basica.anio);
                       if(vm.proyecto_proccess.aviso_legal == 1){
                       vm.Project.aviso_legal = project.aviso_legal[0].text;
                       }
                       
                       if(vm.proyecto_proccess.banner == 1){
                       vm.Project.titulo_banner = project.banner.titulo;
                       vm.Project.descripcion_banner = project.banner.descripcion;
                         }
                       vm.Project.tipo_proyecto = {
                           id:project.informacion_basica.tipo
                       }
                       vm.Project.pais = {
                           id:project.informacion_basica.pais
                       }
                       vm.Project.departamento = {
                            iddepartamento:project.informacion_basica.departamento
                             }
                        vm.Project.municipio = {
                            idmunicipio:project.informacion_basica.municipio
                        }
                        
                      
                       document.getElementById("image_logo").innerHTML = '<img class="animated bounceIn"  src='+vm.Project.logo_url+' >';
                       if(vm.proyecto_proccess.banner == 1){
                           document.getElementById("image_banner").innerHTML = '<img class="animated bounceIn"  src='+project.banner.banner_url+' >';
                       }
                       if(project.banner.destacado_url !== ''){
                           document.getElementById("image_destacado").innerHTML = '<img class="animated bounceIn"  src='+project.banner.destacado_url+' >';
                       }
                       if(vm.proyecto_proccess.galeria == 1){
                           vm.getGaleria();
                       }
                       if(vm.proyecto_proccess.planos == 1){
                           vm.getPlanos();
                       }
                       
                       vm.getPaises(); 
                       vm.get_tipos_proyectos(); 
                       vm.get_tipos_planos();
                       vm.getZonasComunes();
                    }
                    
                   vm.save_aviso_legal = function(){
                        if(!vm.Project.aviso_legal){
                            toastr['warning']("Ingresar texto de aviso");
                            return 0;
                        }
                        
                         var object = {
                            aviso:vm.Project.aviso_legal,
                            idProyecto : vm.proyecto_proccess.id
                        }
                        $('#guardar_aviso').attr("disabled", true);
                        var promisePost = projectService.post_aviso(object);
                        promisePost.then(function (d) {
                                $('#guardar_aviso').attr("disabled", false)
                            vm.proyecto_proccess = d.data.request;
                            swal("Buen Trabajo!", d.data.message, "success");
                        }, function (err) {
                            $('#guardar_aviso').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                   vm.getGaleria = function() {
                        var promisePost = projectService.get_galeria(vm.Project.id);
                        promisePost.then(function (d) {
                             vm.galeria = d.data;
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                    })
                }
                
                   vm.getPlanos = function() {
                        var promisePost = projectService.get_planos(vm.Project.id);
                        promisePost.then(function (d) {
                             vm.planos = d.data;
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                    })
                }
                    
                   vm.finish_proccess = function (paso) {
                        var object = {
                            idProyecto: vm.proyecto_proccess.id,
                            paso: paso
                        }
                        var promisePost = projectService.finish_proccess(object);
                        promisePost.then(function (d) {
                            vm.proyecto_proccess = d.data.request;
                            swal("Buen Trabajo!", d.data.message, "success");
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });


                    }
                    
                   vm.update_zonas_comunes = function(){
                        var zonas_add = $('[name="duallistbox_demo1[]"]').val();
                        var object = {
                            zonas:zonas_add,
                            idProyecto:vm.proyecto_proccess.id
                        }
                         $('#guardar_zonas').attr("disabled", true);
                        var promisePost = projectService.post_zonas(object);
                        promisePost.then(function (d) {
                            vm.proyecto_proccess = d.data.request;
                            swal("Buen Trabajo!", d.data.message, "success");
            
                        }, function (err) {
                            $('#guardar_zonas').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                    vm.update_position = function(){
                        if(!_position.lat){
                            toastr['warning']("Ingresar pocisión del proyecto");
                            return 0;
                        }
                        
                        var object = {
                            lat:_position.lat,
                            lng:_position.lng,
                            idProyecto : vm.proyecto_proccess.id
                        }
                        
                      console.log(object);
                        $('#guardar_ubicacion').attr("disabled", true);
                        var promisePost = projectService.post_position(object);
                        promisePost.then(function (d) {
                             $('#guardar_ubicacion').attr("disabled", false);
                            vm.proyecto_proccess = d.data.request;
                            swal("Buen Trabajo!", d.data.message, "success");
                        }, function (err) {
                            $('#guardar_ubicacion').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                        
                    }
                    
                    vm.save_plane = function () {
                        if (!vm.proyecto_proccess.id) {
                            toastr['warning']("No se encuentra el proyecto cargado");
                            return 0;
                        }

                        if (!vm.Plano.image) {
                            toastr['warning']("Cargar imagen del plano");
                            return 0;
                        }
                        if (!vm.Plano.titulo) {
                            toastr['warning']("Ingresar titulo del plano");
                            return 0;
                        }
                        if (!vm.Plano.tipo_plano) {
                            toastr['warning']("Ingresar tipo del plano");
                            return 0;
                        }
                        if (!vm.Plano.desde) {
                            toastr['warning']("Ingresar valor desde");
                            return 0;
                        }
                        if (!vm.Plano.area_balcon) {
                            toastr['warning']("Ingresar area del balcon, en caso de no tener balcon ingresar el numero cero (0)");
                            return 0;
                        }
                        if (!vm.Plano.area_construida) {
                            toastr['warning']("Ingresar area construida");
                            return 0;
                        }
                        if (!vm.Plano.area_privada) {
                            toastr['warning']("Ingresar area privada");
                            return 0;
                        }
                        if (!vm.Plano.estrato) {
                            toastr['warning']("Ingresar estrato");
                            return 0;
                        }


                        var formData = new FormData();
                        formData.append('imagen', vm.Plano.image);
                        formData.append('titulo', vm.Plano.titulo);
                        formData.append('tipo', vm.Plano.tipo_plano.id);
                        formData.append('valor_desde', vm.Plano.desde);
                        formData.append('area_balcon', vm.Plano.area_balcon);
                        formData.append('area_construida', vm.Plano.area_construida);
                        formData.append('area_privada', vm.Plano.area_privada);
                        formData.append('estrato', vm.Plano.estrato);
                        formData.append('idProyecto', vm.proyecto_proccess.id);
                        $('#guardar_plano').attr("disabled", true);

                        var promisePost = projectService.post_planos(formData);
                        promisePost.then(function (d) {
                            $('#guardar_plano').attr("disabled", false);
                            vm.Plano = {};
                            vm.planos = d.data.planos;

                            document.getElementById("image_plano").innerHTML = '<div class="row animated bounceIn">' +
                                    '<div class="col-lg-12" style="text-align: center;">' +
                                    '  <i class="fa fa-image ico-bg" style="font-size: 100px;margin-top: 80px"></i>' +
                                    '</div>' +
                                    '</div>';
                            setTimeout(function(){
                                document.getElementById('files_plano').addEventListener('change', archivo, false);
                            },1000)
                            
                            
                            toastr['success'](d.data.message);
                        }, function (err) {
                            $('#guardar_plano').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }

                    $scope.save_galeria = function (event) {
                        var file = event.target.files[0];

                        if (!vm.proyecto_proccess.id) {
                            toastr['warning']("No se encuentra el proyecto cargado");
                            return 0;
                        }
                        if (!file) {
                            toastr['warning']("Cargar imagen");
                            return 0;
                        }


                        var formData = new FormData();
                        formData.append('galeria', file);
                        formData.append('idProyecto', vm.proyecto_proccess.id);
                        $("#loading").show();


                        var promisePost = projectService.post_galeria(formData);
                        promisePost.then(function (d) {
                            vm.galeria = d.data.galeria;

                            document.getElementById("image_galeria").innerHTML = '<div class="row animated bounceIn">' +
                                    '<div class="col-lg-12" style="text-align: center;">' +
                                    '  <i class="fa fa-image ico-bg" style="font-size: 70px;margin-top: 50px;"></i>' +
                                    '</div>' +
                                    '</div>';

                            document.getElementById('files').addEventListener('change', archivo, false);

                            $("#loading").hide();
                            toastr['success'](d.data.message);
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                    vm.delete_galeria = function (imagen){
                        
                        var object ={
                            idProyecto : vm.proyecto_proccess.id,
                            idImagen : imagen.id,
                            url:imagen.galeria_url
                        }
                        var promisePost = projectService.delete_galeria(object);
                        promisePost.then(function (d) {
                            vm.galeria = d.data.galeria;
                            toastr['success'](d.data.message);
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                    $scope.update_logo = function(event){
                         var file = event.target.files[0];

                        if (!vm.proyecto_proccess.id) {
                            toastr['warning']("No se encuentra el proyecto cargado");
                            return 0;
                        }
                        if (!file) {
                            toastr['warning']("Cargar logo");
                            return 0;
                        }


                        var formData = new FormData();
                        formData.append('logo', file);
                        formData.append('idProyecto',vm.Project.id);
                        $("#loading").show();
                        
                        var promisePost = projectService.update_logo(formData);
                        promisePost.then(function (d) {
                           
                            document.getElementById('files').addEventListener('change', archivo, false);

                            $("#loading").hide();
                            toastr['success'](d.data.message);
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                        
                   }

                    vm.save_banner = function () {
                     
                        if (!vm.proyecto_proccess.id) {
                            toastr['warning']("No se encuentra el proyecto cargado");
                            return 0;
                        }
                        
                        if (!vm.Project.titulo_banner) {
                            toastr['warning']("Ingresar titulo de banner");
                            return 0;
                        }
                        if (!vm.Project.descripcion_banner) {
                            toastr['warning']("Ingresar descripción de banner");
                            return 0;
                        }
                        
                        var project = JSON.parse(sessionStorage.getItem('proyecto'))
                        var formData = new FormData();
                        formData.append('banner', vm.Project.banner);
                        formData.append('destacado', vm.Project.destacado);
                        formData.append('titulo', vm.Project.titulo_banner);
                        formData.append('descripcion', vm.Project.descripcion_banner);
                        formData.append('idProyecto', vm.proyecto_proccess.id);
                        $('#guardar_banner').attr("disabled", true);

                        var promisePost = projectService.post_banner(formData);
                        promisePost.then(function (d) {
                            swal("Buen Trabajo!", d.data.message, "success");
                        }, function (err) {
                             $('#guardar_banner').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }

                    vm.update_information_basic = function () {
                
                        if (!vm.Project.nombre) {
                            toastr['warning']("Ingresar nombre del proyecto");
                            return 0;
                        }
                        if (!vm.Project.tipo_proyecto) {
                            toastr['warning']("Ingresar tipo del proyecto");
                            return 0;
                        }
                        if (!vm.Project.anio) {
                            toastr['warning']("Ingresar año del proyecto");
                            return 0;
                        }
                        if (!vm.Project.direccion) {
                            toastr['warning']("Ingresar dirección del proyecto");
                            return 0;
                        }
                        if (!vm.Project.pais) {
                            toastr['warning']("Ingresar pais del proyecto");
                            return 0;
                        }
                        if (!vm.Project.departamento) {
                            toastr['warning']("Ingresar departamento del proyecto");
                            return 0;
                        }
                        if (!vm.Project.municipio) {
                            toastr['warning']("Ingresar municipio del proyecto");
                            return 0;
                        }
                        if (!vm.Project.descripcion) {
                            toastr['warning']("Ingresar descripcion del proyecto");
                            return 0;
                        }
                        if (!vm.Project.brochure) {
                            toastr['warning']("Cargar brochure del proyecto");
                            return 0;
                        }

                        var formData = new FormData();
                        formData.append('id', vm.Project.id);
                        formData.append('nombre', vm.Project.nombre);
                        formData.append('tipo', vm.Project.tipo_proyecto.id);
                        formData.append('anio', vm.Project.anio);
                        formData.append('direccion', vm.Project.direccion);
                        formData.append('pais', vm.Project.pais.id);
                        formData.append('departamento', vm.Project.departamento.iddepartamento);
                        formData.append('municipio', vm.Project.municipio.idmunicipio);
                        formData.append('descripcion', vm.Project.descripcion);
                        formData.append('brochure', vm.Project.brochure);


                       $('#guardar').attr("disabled", true);
                        var promisePost = projectService.update_basic(formData);
                        promisePost.then(function (d) {
                            $('#guardar').attr("disabled", false);
                            swal("Buen Trabajo!", d.data.message, "success");
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });

                    }

                    vm.getPaises = function () {
                        ubicacionService.getPaises().then(success, error);
                        function success(d) {
                            vm.paises = d.data;
                            vm.getDepartamentos();
                        }
                        function error(error) {
                            toastr.error("Problemas de conexion, por favor recargar pagina");
                        }
                    }

                    vm.getDepartamentos = function () {
                        ubicacionService.getDepartamentos(vm.Project.pais.id).then(success, error);
                        function success(d) {
                            vm.departamentos = d.data;
                            vm.getMunicipios();
                        }
                        function error(error) {
                            toastr.error("Problemas de conexion, por favor recargar pagina");
                        }
                    }

                    vm.getMunicipios = function () {
                        ubicacionService.getMunicipios(vm.Project.departamento.iddepartamento).then(success, error);
                        function success(d) {
                            vm.municipios = d.data;
                        }
                        function error(error) {
                            toastr.error("Problemas de conexion, por favor recargar pagina");
                        }
                    }

                    vm.getZonasComunes = function(){
                        var band = false;
                        var project = JSON.parse(sessionStorage.getItem('proyecto'));
                        
                         var promisePost = zoneService.getAll();
                        promisePost.then(function (d) {
                            vm.zones = d.data;
                          
                            if(project.proyecto.zonas_comunes == 1){
                          
                              for(var i = 0; i < vm.zones.length; i++){
                               for(var y=0; y < project.zonas.length; y++){

                         
                                   if(project.zonas[y].idZona == vm.zones[i].id){
                                       band = true;
                                       break;
                                    }
                                }
                                if(band){
                                   $("#zones").append('<option value='+vm.zones[i].id+' selected>'+vm.zones[i].nombre+'</option>');
                                    band= false;
                                    
                                }else{
                                    $("#zones").append('<option value='+vm.zones[i].id+'>'+vm.zones[i].nombre+'</option>');
                                }
                            }
                           }else{
                               for(var i = 0; i < vm.zones.length; i++){
                                   $("#zones").append('<option value='+vm.zones[i].id+'>'+vm.zones[i].nombre+'</option>');
                               }
                           }
                            setTimeout(function(){
                               $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox();
                            },1000);
                            
                          
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                    vm.get_tipos_proyectos = function () {
                        var promisePost = tipoProyectoService.getAll();
                        promisePost.then(function (d) {
                            vm.tipos_proyectos = d.data;
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }

                    vm.get_tipos_planos = function () {
                        var promisePost = tipoPlanoService.getAll();
                        promisePost.then(function (d) {
                            vm.tipos_planos = d.data;
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                    vm.save_type_project = function () {
                        if (!vm.type_project.nombre)
                        {
                            toastr['warning']("Ingresar nombre de tipo de proyecto");
                            return 0;
                        }
                        var object = {
                            nombre: vm.type_project.nombre
                        }
                        var promisePost = tipoProyectoService.post(object);
                        promisePost.then(function (d) {
                            vm.type_project = {};
                            $('#modal_project').modal('hide');
                            vm.get_tipos_proyectos();
                            toastr['success'](d.data.message);
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });


                    }

                    vm.save_type_plane = function () {
                        if (!vm.type_plane.nombre)
                        {
                            toastr['warning']("Ingresar nombre de tipo de plano");
                            return 0;
                        }

                        var object = {
                            nombre: vm.type_plane.nombre
                        }
                        var promisePost = tipoPlanoService.post(object);
                        promisePost.then(function (d) {
                            vm.type_plane = {};
                            $('#modal_plane').modal('hide');
                            vm.get_tipos_planos();
                            toastr['success'](d.data.message);
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }

                    setTimeout(function () {
                        document.getElementById('files').addEventListener('change', archivo, false);
                        document.getElementById('files_banner').addEventListener('change', archivo_banner, false);
                        document.getElementById('files_galeria').addEventListener('change', archivo_galeria, false);
                        document.getElementById('files_plano').addEventListener('change', archivo_plano, false);
                        document.getElementById('files_destacado').addEventListener('change', archivo_destacado, false);
                    }, 1000);
                }]);

            
    function archivo(evt) {
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_logo").innerHTML = ['<img class="animated bounceIn"  src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }
    function archivo_banner(evt) {
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_banner").innerHTML = ['<img class="animated bounceIn"  src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }
    function archivo_destacado(evt) {
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_destacado").innerHTML = ['<img class="animated bounceIn"  src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }
    function archivo_galeria(evt) {
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_galeria").innerHTML = ['<div id="loading"></div><img class="animated bounceIn"  src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }
    function archivo_plano(evt) {
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_plano").innerHTML = ['<img class="animated bounceIn"  src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

})();








