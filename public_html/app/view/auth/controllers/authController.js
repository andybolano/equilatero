(function () {
    'use strict';
    angular
            .module('app')
            .controller('AuthController', ['authService', '$state', 'HOME', function (authService, $state, HOME) {
                    var vm = this;
                    vm.user = {};
                    vm.login = function () {
                        alert()
                        if (vm.user.usuario === undefined || vm.user.usuario === "" || vm.user.password === "" || vm.user.password === undefined) {
                            toastr["error"]("Ingresar Usuario y contraseña");
                        } else {
                            var credentials = {
                                usuario: vm.user.usuario,
                                password: vm.user.password
                            }
                           
                            $('#login').attr("disabled", true);
                            authService.authenticate(credentials).then(success, error);
                            function success(d) {
                                $('#login').attr("disabled", false);
                                if (d.data.respuesta === false) {
                                    toastr["error"](d.data.message);
                                    return false;
                                }
                                if (d.data.user) {
                                    var data = JSON.parse("[" + d.data.user + "]");
                                    sessionStorage.setItem('data', JSON.stringify(data[0]));
                                    sessionStorage.setItem('userIsLogin', true);
                                    $state.go(HOME);
                                }
                            }
                            function error(error) {
                                $('#login').attr("disabled", false);
                                toastr["error"]("Ha ocurrido un problema");
                            }

                        }
                    }

                }]);
})();
      