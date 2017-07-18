(function() {
    'use strict';
    angular
        .module('app')
        .controller('MenuController', function($location, $state) {

            var vm = this;
            vm.sitio = {};
            vm.getSitio = getSitio;
            vm.logout = logout;




            vm.isActive = function(viewLocation) {
                return viewLocation === $location.path();
            }
            vm.titulo = function() {
                if ($location.path() === "/canchas") {
                    return "CANCHAS";
                }
                if ($location.path() === "/clientes") {
                    return "MIS CLIENTES";
                }
                if ($location.path() === "/historial") {
                    return "HISTORIAL DE RESERVAS";
                }
                if ($location.path() === "/gestion") {
                    return "GESTIÓN DE RESERVAS";
                }
                if ($location.path() === "/reserve") {
                    return "RESERVAR";
                }
                if ($location.path() === "/configuracion") {
                    return "CONFIGURACIÓN DE SITIO";
                }
                if ($location.path() === "/operadores") {
                    return "GESTIÓN DE OPERADORES";
                }
                if ($location.path() === "/") {
                    return "INICIO";
                }

            }
            vm.hoy = function() {
                var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
                var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
                var f = new Date();
                var hoy = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
                return hoy
            }

            function getSitio() {
                if (sessionStorage.getItem('data') == null) {
                    sitioService.get().then(success, error);

                    function success(d) {
                        vm.sitio = d.data[0];
                        vm.sitio.email = sessionStorage.getItem('email');
                        sessionStorage.setItem('data', JSON.stringify(d.data[0]));

                    }

                    function error(error) {
                        toastr['error']('No autorizado!');
                    }
                } else {
                    vm.sitio = JSON.parse(sessionStorage.getItem('data'));
                    vm.sitio.email = sessionStorage.getItem('email');
                }
            }

            function logout() {
                    localStorage.clear();
                    sessionStorage.clear();
                    toastr['success']("sesión finalizada!");
                    $state.go('auth', {}, { reload: true });
            }

        });

})();