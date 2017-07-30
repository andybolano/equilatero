(function () {
    'use strict';
    angular
            .module('app')
            .service('userService', ['$http', '$q', 'API_URL', userService]);
    /* @ngInject */
    function userService($http, $q, API_URL) {
        var service = {
            getAll:getAll,
            put:put
        };
        return service;

        function put(object){
            var defered = $q.defer();
            var promise = defered.promise;
            $http.put(API_URL + '/user/'+object.id ,object).then(success, error);
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
            $http.get(API_URL+'/user').then(success, error);
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
