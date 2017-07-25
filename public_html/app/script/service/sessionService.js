(function () {
    'use strict';

    angular
        .module('app')
        .service('sessionService', sessionService);

    /* @ngInject */
    function sessionService() {

        var service = {
            isLoggedIn: isLoggedIn,
            getIdUser: getUser
        };
        return service;

      
        function isLoggedIn(){
          return sessionStorage.getItem('userIsLogin') !== null;  
        };
        

        function getUser(){
           if(sessionStorage.getItem('user') !== null){
                return sessionStorage.getItem('user');
           } 
          
        }
    }
})();



