(function () {
    'use strict';
    angular
            .module('app')
            .controller('HomeController', [ function () {

        setTimeout(function(){
                    $('.flexslider').flexslider({
                      animation: "slide"
                    });
                },100)
        
         }]);

})();