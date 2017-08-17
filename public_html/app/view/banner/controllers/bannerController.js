(function () {
    'use strict';
    angular
            .module('app')
            .controller('BannerController', ['bannerService', function (bannerService) {

                    var vm = this;
                    vm.Banner = {};
                    vm.update = false;
                    vm.banners = [];

                    vm.show_update = function (banner) {
                        vm.Banner = banner;
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
                        vm.Banner = "";
                        vm.update = false;
                        setTimeout(function () {
                            document.getElementById('files').addEventListener('change', archivo, false);
                        }, 1000)
                    }
                    
                    vm.put = function () {
                        if (!vm.Banner.nombre) {
                            toastr['warning']("Ingresar nombre de la zona común");
                            return 0;
                        }

                        var formData = new FormData();
                        formData.append('id',vm.Banner.id);
                        formData.append('imagen', vm.Banner.imagen);
                        formData.append('nombre', vm.Banner.nombre.toUpperCase());
                        $('#actualizar').attr("disabled", true);
                        var promisePost = bannerService.put(formData);
                        promisePost.then(function (d) {
                            vm.update = false;
                            $('#actualizar').attr("disabled", false);
                            vm.Banner.nombre = "";
                            vm.Banner.imagen = "";
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
                    
                    vm.save = function () {

                        if (!vm.Banner.nombre) {
                            toastr['warning']("Ingresar titulo de banner");
                            return 0;
                        }

                        if (!vm.Banner.imagen) {
                            toastr['warning']("Cargar imagen");
                            return 0;
                        }


                        var formData = new FormData();
                        formData.append('imagen', vm.Banner.imagen);
                        formData.append('nombre', vm.Banner.nombre.toUpperCase());
                        $('#guardar').attr("disabled", true);
                        var promisePost = bannerService.post(formData);
                        promisePost.then(function (d) {
                            $('#guardar').attr("disabled", false);
                            vm.Banner.nombre = "";
                            vm.Banner.imagen = "";
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
                        var promisePost = bannerService.getAll();
                        promisePost.then(function (d) {
                            vm.banners = d.data;
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

