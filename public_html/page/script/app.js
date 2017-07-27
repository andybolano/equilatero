
 
      (function(){
        'use strict';
        // Add Angular module mdr.file
        angular.module('app', ['ui.router'])
       .constant('HOME', 'app.home')
        .constant('API_URL', 'http://localhost/equilatero/api/public/index.php/api')
       .config(function($stateProvider, $urlRouterProvider,) {

         
            $urlRouterProvider.otherwise('/');

            $stateProvider
            //rutas privadas
                .state('app', {
                    url: '',
                    abstract: true,
                    templateUrl: 'view/template.html'
                })
                .state('app.home', {
                    url: '/',
                    templateUrl: 'view/home.html',
                    controller: 'HomeController as vm'
                })
                .state('app.nosotros', {
                    url: '/nosotros',
                    templateUrl: 'view/nosotros.html',
                    controller: 'NosotrosController as vm'
                })
                .state('app.proyectos', {
                    url: '/proyectos',
                    templateUrl: 'view/proyectos.html',
                    controller: 'ProyectosController as vm'
                })
                .state('app.compromiso', {
                    url: '/compromiso',
                    templateUrl: 'view/compromiso.html',
                    //controller: 'HomeController as vm'
                })
                .state('app.postventas', {
                    url: '/postventas',
                    templateUrl: 'view/postventas.html',
                    //controller: 'HomeController as vm'
                })



        })

})();


  