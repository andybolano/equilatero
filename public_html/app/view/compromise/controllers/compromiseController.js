(function () {
    'use strict';
    angular
            .module('app')
            .controller('CompromiseController', ['compromiseService', function (compromiseService) {

                    var vm = this;
                    vm.Compromise = {};
                    vm.update = false;
                    vm.compromises = [];

                    vm.show_update = function (compromise) {
                        vm.Compromise = compromise;
                        vm.update = true;

                        setTimeout(function () {
                            document.getElementById('files').addEventListener('change', archivo, false);
                        }, 1000);
                        $("#image").removeClass('animated bounceIn').addClass('animated bounceIn');

                    }
                    
                    vm.abort_update = function () {
                        document.getElementById("image").innerHTML = '<div class="row animated bounceIn">' +
                                '<div class="col-lg-12" style="text-align: center;padding-top:50px;">' +
                                ' <i class="fa fa-image ico-bg"></i>' +
                                '</div>' +
                                '</div>';
                        vm.Compromise = "";
                        vm.update = false;
                        setTimeout(function () {
                            document.getElementById('files').addEventListener('change', archivo, false);
                        }, 1000)
                    }
                    
                    vm.put = function () {
                        if (!vm.Compromise.nombre) {
                            toastr['warning']("Ingresar nombre de la zona común");
                            return 0;
                        }

                        var formData = new FormData();
                        formData.append('id',vm.Compromise.id);
                        formData.append('imagen', vm.Compromise.imagen);
                        formData.append('nombre', vm.Compromise.nombre);
                        formData.append('descripcion', vm.Compromise.descripcion);
                        formData.append('estado', vm.Compromise.estado);
                        $('#actualizar').attr("disabled", true);
                        var promisePost = compromiseService.put(formData);
                        promisePost.then(function (d) {
                            vm.update = false;
                            $('#actualizar').attr("disabled", false);
                            vm.Compromise.nombre = "";
                            vm.Compromise.descripcion = "";
                            vm.Compromise.imagen = "";
                            document.getElementById("image").innerHTML = '<div class="row animated bounceIn">' +
                                    '<div class="col-lg-12" style="text-align: center;padding-top:50px;">' +
                                    ' <i class="fa fa-image ico-bg"></i>' +
                                    '</div>' +
                                    '</div>';
                            setTimeout(function () {
                                document.getElementById('files').addEventListener('change', archivo, false);
                            }, 1000)
                            swal("Buen Trabajo!", d.data.message, "success");
                            vm.getAll();
                        }, function (err) {
                            $('#actualizar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                     vm.putEstado = function (item,estado) {

                        var formData = new FormData();
                        formData.append('id',item.id);
                        formData.append('nombre',item.nombre);
                        formData.append('descripcion', item.descripcion);
                        formData.append('estado', estado);
                        var promisePost = compromiseService.put(formData);
                        promisePost.then(function (d) {
                            toastr['success']('Estado actualizado');
                            vm.getAll();
                        }, function (err) {
                            $('#actualizar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    }
                    
                    
                    
                    vm.save = function () {

                        if (!vm.Compromise.nombre) {
                            toastr['warning']("Ingresar nombre");
                            return 0;
                        }
                        
                        if (!vm.Compromise.descripcion) {
                            toastr['warning']("Ingresar descripcion");
                            return 0;
                        }

                        if (!vm.Compromise.imagen) {
                            toastr['warning']("Cargar imagen");
                            return 0;
                        }


                        var formData = new FormData();
                        formData.append('imagen', vm.Compromise.imagen);
                        formData.append('nombre', vm.Compromise.nombre);
                        formData.append('descripcion', vm.Compromise.descripcion);
                        $('#guardar').attr("disabled", true);
                        var promisePost = compromiseService.post(formData);
                        promisePost.then(function (d) {
                            $('#guardar').attr("disabled", false);
                            vm.Compromise.nombre = "";
                            vm.Compromise.imagen = "";
                             vm.Compromise.descripcion = "";
                            document.getElementById("image").innerHTML = '<div class="row animated bounceIn">' +
                                    '<div class="col-lg-12" style="text-align: center;padding-top:50px;">' +
                                    ' <i class="fa fa-image ico-bg"></i>' +
                                    '</div>' +
                                    '</div>';
                            setTimeout(function () {
                                document.getElementById('files').addEventListener('change', archivo, false);
                            }, 1000)
                            swal("Buen Trabajo!", d.data.message, "success");
                            vm.getAll();
                        }, function (err) {
                            $('#guardar').attr("disabled", false);
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    };

                    vm.getAll = function () {
                        var promisePost = compromiseService.getAll();
                        promisePost.then(function (d) {
                            vm.compromises = d.data;
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    };

                    setTimeout(function () {
                        document.getElementById('files').addEventListener('change', archivo, false);
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
                    document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:70%;margin-left:15%" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    $(':file').change(function () {
        var file = $("#files")[0].files[0];
        var fileName = file.name;
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        var fileSize = file.size;
        var fileType = file.type;
    });
})();




