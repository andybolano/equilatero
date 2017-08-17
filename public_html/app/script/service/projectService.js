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
            post_aviso:post_aviso,
            finish_proccess:finish_proccess,
            update : update,
            update_logo:update_logo,
            update_basic:update_basic,
            get_galeria:get_galeria,
            delete_galeria:delete_galeria,
            get_planos:get_planos,
            update_plano :update_plano,
            deleted:deleted
            
        };
        return service;
        
        function deleted(id){
             var defered = $q.defer();
            var promise = defered.promise;
            $http.delete(API_URL + '/proyectos/'+id).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        function post_aviso(object){
             var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/aviso', object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        function update_plano(object){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/update/plano', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
        function delete_galeria(object){
             var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/delete/galeria',object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            } 
        }
        
        function update_basic(object){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/update/basic', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
        function update_logo(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/proyectos/logo', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        
        function get_planos(idProyecto){
             var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos/planos/'+idProyecto).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            } 
        }
        
        function get_galeria(idProyecto){
             var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos/galeria/'+idProyecto).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            } 
        }
        
        function update(object){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.put(API_URL + '/proyectos/'+object.id, object).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            } 
        }
        
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


