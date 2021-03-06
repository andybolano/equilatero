(function () {
    'use strict';
    angular
            .module('app')
            .controller('NosotrosController', [function () {
                    var vm = this;
                    $("html, body").animate({scrollTop: "0px"});

            vm.mobile = false;
               
               if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                       vm.mobile = true;
                       setTimeout(function(){
                        $('.flexslider-parrafo').flexslider({
                         animation: "slide"
                       });
                     },1000);
                 } 
                 
             $(window).scroll(function() {
                if(vm.mobile){
                 var scrolledY = $(window).scrollTop();
                   $('#image-banner-mobile-nosotros').css('background-position', 'left ' + ((scrolledY)) + 'px');
                 }
              });
                 
                 
                    setTimeout(function () {
                        $('.slider-nosotros').flexslider({
                            animation: "slide",
                            
                            start: function (slider) {
                                $('.flex-direction-nav').css({visibility: 'hidden'});
                            }
                        });
                    }, 1000)

                }]);

})();