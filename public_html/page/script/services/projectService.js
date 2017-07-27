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
            leerProyectos:leerProyectos
        };
        return service;
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
        
       

    }
})();


