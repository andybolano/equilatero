(function () {
    'use strict';
    angular
            .module('app')
            .service('zoneService', ['$http', '$q', 'API_URL', zoneService]);
    /* @ngInject */
    function zoneService($http, $q, API_URL) {
        var service = {
            post: post,
            getAll:getAll,
            put:put
        };
        return service;
        function post(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/zone', object, {transformRequest: angular.identity,
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
            $http.post(API_URL + '/zone/update', object, {transformRequest: angular.identity,
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
            $http.get(API_URL+'/zone').then(success, error);
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

