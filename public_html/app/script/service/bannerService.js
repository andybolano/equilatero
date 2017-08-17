(function () {
    'use strict';
    angular
            .module('app')
            .service('bannerService', ['$http', '$q', 'API_URL', bannerService]);
    /* @ngInject */
    function bannerService($http, $q, API_URL) {
        var service = {
            post: post,
            getAll:getAll,
            put:put
        };
        return service;
        function post(object) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/banner', object, {transformRequest: angular.identity,
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
            $http.post(API_URL + '/banner/update', object, {transformRequest: angular.identity,
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
            $http.get(API_URL+'/banner').then(success, error);
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

