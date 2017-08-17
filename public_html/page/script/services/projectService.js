(function () {
    'use strict';
    angular
            .module('app')
            .service('projectService', ['$http', '$q', 'API_URL', projectService]);
    /* @ngInject */
    function projectService($http, $q, API_URL) {
        var service = {
            leerDestacados : leerDestacados,
            leerBanners : leerBanners,
            leerCondiciones :leerCondiciones,
            leerProyectos:leerProyectos,
            getCompromisos:getCompromisos,
            getUser:getUser,
            postContacto:postContacto,
            enviarPostventa:enviarPostventa,
             enviarCotizacion:enviarCotizacion,
            leerProyectosPostventa:leerProyectosPostventa
        };
        return service;
        function postContacto(object){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/contacto',object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
       }
       function enviarPostventa(object){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/postventa',object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
       }
       function enviarCotizacion(object){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/cotizacion',object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
       }
       
       function leerProyectosPostventa(){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos/page/postventa').then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
       }
        function leerProyectos(param){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos/page/realizados/'+param).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
       }
       function leerCondiciones(){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos/page/condiciones').then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
       }
        
        function leerDestacados(){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos/page/destacados/show').then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            } 
        }
        
         function leerBanners(){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos/page/banners/show').then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            } 
        }
        
        function getCompromisos(){
             var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL+'/compromise/page/activos').then(success, error);
            return promise;
             function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
        function getUser(){
             var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL+'/user').then(success, error);
            return promise;
             function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
       

    }
})();


