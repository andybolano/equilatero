
 
      (function(){
        'use strict';
        // Add Angular module mdr.file
        angular.module('app', ['mdr.file','ui.router'])
       .constant('HOME', 'app.home')
       .constant('API_URL', 'http://localhost/equilatero/api/public/index.php/api')
       .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

         
            $urlRouterProvider.otherwise('/');

            $stateProvider
            //rutas privadas
                .state('app', {
                    url: '',
                    abstract: true,
                    templateUrl: 'view/home/home.html'
                })
                .state('app.home', {
                    url: '/',
                    templateUrl: 'view/home/dashboard.html',
                    controller: 'HomeController as vm'
                })
                .state('app.zone', {
                    url: '/zone',
                    templateUrl: 'view/zone/zone.html',
                    controller: 'ZoneController as vm'
                })
                .state('app.new_project', {
                    url: '/projects',
                    templateUrl: 'view/project/new.html',
                    controller: 'ProjectController as vm'
                })
            //rutas publicas  
            .state('auth', {
                    url: '/auth',
                    templateUrl: 'view/auth/auth.html',
                    controller: 'AuthController as auth'
                })


        }).run(function($location, sessionService, $rootScope) {
            var rutasPrivadas = ['/', '/projects'];
            $rootScope.$on('$stateChangeStart', function() {
                if (($.inArray($location.path(), rutasPrivadas) !== -1) && !sessionService.isLoggedIn()) {
                    $location.path('/auth');
                }
                
                if($location.path() == '/auth' && sessionService.isLoggedIn()){
                  $location.path('/');
               }
            });
        });

})();

angular.module('app').directive('uploaderModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs) {
            iElement.on('change', function(e) {
                $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
            });
        }
    };
}]);
  