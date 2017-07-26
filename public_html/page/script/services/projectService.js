(function () {
    'use strict';
    angular
            .module('app')
            .service('projectService', ['$http', '$q', 'API_URL', projectService]);
    /* @ngInject */
    function projectService($http, $q, API_URL) {
        var service = {
            leerDestacados : leerDestacados
            
        };
        return service;
        
       
        
        function leerDestacados(){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + '/proyectos/destacados/show').then(success, error);
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


