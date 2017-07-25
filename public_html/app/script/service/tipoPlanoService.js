(function () {
    'use strict';
    angular
            .module('app')
            .service('tipoPlanoService', ['$http', '$q', 'API_URL', tipoPlanoService]);
    /* @ngInject */
    function tipoPlanoService($http, $q, API_URL) {
        var service = {
            post:post,
            getAll:getAll
        };
        return service;

 function getAll(){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/tipoplano').then(success, error);
            return promise;
            function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error);
            }
         }
         
 function post(object){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL + '/tipoplano', object).then(success, error);
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