   (function () {
    'use strict';
    angular
            .module('app')
            .service('ubicacionService', ['$http', '$q', 'API_URL', ubicacionService]);
    /* @ngInject */
    function ubicacionService($http, $q, API_URL) {
        var service = {
            getPaises:getPaises,
            getDepartamentos:getDepartamentos,
            getMunicipios:getMunicipios
        };
        return service; 
    
    function getPaises(){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL+'/paises').then(success, error);
            return promise;
             function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error)
            } 
        }
        
        function getDepartamentos(pais){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL+'/departamentos/'+pais).then(success, error);
            return promise;
             function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error)
            } 
        }
        function getMunicipios(departamento){
           var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL+'/municipios/'+departamento).then(success, error);
            return promise;
             function success(p) {
                defered.resolve(p);
            }
            function error(error) {
                defered.reject(error)
            } 
        }

    }
})();