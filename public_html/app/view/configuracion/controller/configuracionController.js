(function () {
    'use strict';
    angular
            .module('app')
            .controller('configuracionController', ['userService', function (userService) {

                    var vm = this;
                    vm.User = {};
                    vm.update = false;

                    vm.put = function () {
                        var pass = "";
                        if (!vm.User.usuario) {
                            toastr['warning']("Ingresar usuario");
                            return 0;
                        }

                        if (!vm.User.telefono) {
                            toastr['warning']("Ingresar telefono");
                            return 0;
                        }

                        if (!vm.User.pass) {
                            toastr['warning']("Ingresar contraseña");
                            return 0;
                        }
                        if (!vm.User.direccion) {
                            toastr['warning']("Ingresar dirección");
                            return 0;
                        }

                        if (!vm.User.email) {
                            toastr['warning']("Ingresar email");
                            return 0;
                        }

                        if (!vm.User.passNueva) {
                            pass = false;
                        } else {
                            pass = vm.User.passNueva;
                        }

                        var object = {
                            id: vm.User.id,
                            usuario: vm.User.usuario,
                            pass: vm.User.pass,
                            passNueva: pass,
                            telefono: vm.User.telefono,
                            direccion: vm.User.direccion,
                            email: vm.User.email
                        }
                        $('#actualizar').attr("disabled", true);
                        var promisePost = userService.put(object);
                        promisePost.then(function (d) {
                            vm.update = false;
                            $('#actualizar').attr("disabled", false);
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



                    vm.getAll = function () {
                        var promisePost = userService.getAll();
                        promisePost.then(function (d) {
                            vm.User = d.data[0];
                        }, function (err) {
                            if (err.status == 402) {
                                toastr["error"](err.data.respuesta);
                            } else {
                                toastr["error"]("Ha ocurrido un problema!");
                            }
                        });
                    };



                }]);

})();






