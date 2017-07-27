(function () {
    'use strict';
    angular
            .module('app')
            .controller('NosotrosController', [function () {

                    $("html, body").animate({scrollTop: "0px"});

                    setTimeout(function () {
                        $('.flexslider').flexslider({
                            animation: "slide",
                            start: function (slider) {
                                $('.flex-direction-nav').css({visibility: 'hidden'});
                            }
                        });
                    }, 100)

                }]);

})();