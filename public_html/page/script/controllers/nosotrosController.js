(function () {
    'use strict';
    angular
            .module('app')
            .controller('NosotrosController', [ function () {

        setTimeout(function(){
                    $('.flexslider').flexslider({
                      animation: "slide",
                      start:function(slider){
                        $('.flex-direction-nav').css({visibility:'hidden'});
                    }
                    });
                },100)
        
         }]);

})();