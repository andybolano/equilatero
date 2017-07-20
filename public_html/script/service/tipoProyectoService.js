(function () {
    'use strict';
    angular
            .module('app')
            .service('tipoProyectoService', ['$http', '$q', 'API_URL', tipoProyectoService]);
    /* @ngInject */
    function tipoProyectoService($http, $q, API_URL) {
        var service = {
            post:post,
            getAll:getAll
        };
        return service;

 function getAll(){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/tipoproyecto').then(success, error);
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
            $http.post(API_URL + '/tipoproyecto', object).then(success, error);
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