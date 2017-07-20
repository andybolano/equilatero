(function () {
    'use strict';
    angular
            .module('app')
            .controller('ProjectController', ['ubicacionService', 'projectService', 'tipoProyectoService','tipoPlanoService','$scope', function (ubicacionService, projectService,tipoProyectoService, tipoPlanoService,$scope) {

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
                    vm.proyecto_proccess = {};
                    vm.proyecto_proccess.informacion_basica = 0;
                    vm.proyecto_proccess.banner = 0;
                    vm.proyecto_proccess.galeria = 0;
                    vm.proyecto_proccess.planos = 0;
                    vm.proyecto_proccess.ubicacion_geografica = 0;
                    vm.proyecto_proccess.zonas_comunes = 0;

                    vm.save_plane = function (){
                      /* if (!vm.proyecto_proccess.id) {
                            toastr['warning']("No se encuentra el proyecto cargado");
                            return 0;
                        }*/
                        
                        if(!vm.Plano.image){
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
                        formData.append('tipo', vm.Plano.tipo_plano);
                        formData.append('valor_desde', vm.Plano.desde);
                        formData.append('area_balcon', vm.Plano.area_balcon);
                        formData.append('area_construida', vm.Plano.area_construida);
                        formData.append('area_privada', vm.Plano.area_privada);
                        formData.append('estrato', vm.Plano.estrato);
                        formData.append('idProyecto', 1/*vm.proyecto_proccess.id*/);
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

                            document.getElementById('files_plano').addEventListener('change', archivo, false);
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
                        if(!vm.type_project.nombre)
                        {
                             toastr['warning']("Ingresar nombre de tipo de proyecto");
                             return 0;
                        }
                        var object ={
                            nombre:vm.type_project.nombre
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
                        if(!vm.type_plane.nombre)
                        {
                             toastr['warning']("Ingresar nombre de tipo de plano");
                             return 0;
                        }
                        
                        var object ={
                            nombre:vm.type_plane.nombre
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
                    
                    vm.finish_proccess = function(paso){
                        
                        var object = {
                            idProyecto : vm.proyecto_proccess.id,
                            paso:paso        
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

                    vm.save_banner = function () {
                        if (!vm.proyecto_proccess.id) {
                            toastr['warning']("No se encuentra el proyecto cargado");
                            return 0;
                        }
                        if (!vm.Project.banner) {
                            toastr['warning']("Cargar banner");
                            return 0;
                        }
                        var formData = new FormData();
                        formData.append('banner', vm.Project.banner);
                        formData.append('idProyecto', vm.proyecto_proccess.id);
                        $('#guardar_banner').attr("disabled", true);

                        var promisePost = projectService.post_banner(formData);
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

                    vm.save_information_basic = function () {
                        if (!vm.Project.logo) {
                            toastr['warning']("Cargar logo del proyecto");
                            return 0;
                        }
                        if (!vm.Project.nombre) {
                            toastr['warning']("Ingresar nombre del proyecto");
                            return 0;
                        }
                        if (!vm.Project.tipo_proyecto) {
                            toastr['warning']("Ingresar tipo del proyecto");
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
                        formData.append('logo', vm.Project.logo);
                        formData.append('nombre', vm.Project.nombre);
                        formData.append('tipo', vm.Project.tipo_proyecto);
                        formData.append('direccion', vm.Project.direccion);
                        formData.append('pais', vm.Project.pais);
                        formData.append('departamento', vm.Project.departamento);
                        formData.append('municipio', vm.Project.municipio);
                        formData.append('descripcion', vm.Project.descripcion);
                        formData.append('brochure', vm.Project.brochure);


                        $('#guardar').attr("disabled", true);

                        var promisePost = projectService.post_basic(formData);
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

                    vm.getPaises = function () {
                        ubicacionService.getPaises().then(success, error);
                        function success(d) {
                            vm.paises = d.data;
                            vm.Project.pais = d.data[0].id;
                            vm.getDepartamentos();
                        }
                        function error(error) {
                            toastr.error("Problemas de conexion, por favor recargar pagina");
                        }
                    }

                    vm.getDepartamentos = function () {
                        ubicacionService.getDepartamentos(vm.Project.pais).then(success, error);
                        function success(d) {
                            vm.departamentos = d.data;
                        }
                        function error(error) {
                            toastr.error("Problemas de conexion, por favor recargar pagina");
                        }
                    }

                    vm.getMunicipios = function () {
                        ubicacionService.getMunicipios(vm.Project.departamento).then(success, error);
                        function success(d) {
                            vm.municipios = d.data;
                        }
                        function error(error) {
                            toastr.error("Problemas de conexion, por favor recargar pagina");
                        }
                    }
                    
                   
                    

                    setTimeout(function () {
                        document.getElementById('files').addEventListener('change', archivo, false);
                        document.getElementById('files_banner').addEventListener('change', archivo_banner, false);
                        document.getElementById('files_galeria').addEventListener('change', archivo_galeria, false);
                        document.getElementById('files_plano').addEventListener('change', archivo_plano, false);
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




