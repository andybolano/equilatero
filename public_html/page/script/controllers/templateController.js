(function () {
    'use strict';
    angular
            .module('app')
            .controller('templateController', [ function () {

                     var vm = this;
   
            vm.to = function(id){
           alert()
               /* $('html, body').stop().animate({
                    scrollTop: $(id).offset().top - 50
                }, 500);
                event.preventDefault();*/
            }
        
            function active(id){
            for(i=1; i<=5; i++){
                     $('#'+i).removeClass("active");
                     if(i==id){
                         $('#'+i).addClass("active");
                         break;
                     }
                 }

           }
        
         }]);

})();