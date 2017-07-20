(function () {
    'use strict';
    angular
            .module('app')
            .service('projectService', ['$http', '$q', 'API_URL', projectService]);
    /* @ngInject */
    function projectService($http, $q, API_URL) {
        var service = {
            post_basic: post_basic,
            post_banner:post_banner,
            post_galeria:post_galeria,
        };
        return service;
        
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


