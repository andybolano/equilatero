(function () {
    'use strict';
    angular
            .module('app')
            .service('compromiseService', ['$http', '$q', 'API_URL', compromiseService]);
    /* @ngInject */
    function compromiseService($http, $q, API_URL) {
        var service = {
            post: post,
            getAll:getAll,
            put:put
        };
        return service;
        function post(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/compromise', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
        }
        function put(object){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/compromise/update', object, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(success, error);
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
            $http.get(API_URL+'/compromise').then(success, error);
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

