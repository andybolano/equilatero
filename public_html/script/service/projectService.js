(function () {
    'use strict';
    angular
            .module('app')
            .service('projectService', ['$http', '$q', 'API_URL', projectService]);
    /* @ngInject */
    function projectService($http, $q, API_URL) {
        var service = {
            getAll : getAll,
            post_basic: post_basic,
            post_banner:post_banner,
            post_galeria:post_galeria,
            post_planos:post_planos,
            post_position:post_position,
            post_zonas:post_zonas,
            finish_proccess:finish_proccess
            
        };
        return service;
        function getAll(){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos').then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            } 
        }
        function post_zonas(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/zonas', object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
        
        function post_position(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/position', object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
        function post_planos(object){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/plano', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                
        }
    }

        function finish_proccess(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/finish_proccess', object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
         
         function post_galeria(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/galeria', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
        function post_banner(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/banner', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
        function post_basic(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/basic', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
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


