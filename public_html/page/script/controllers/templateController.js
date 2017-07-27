(function () {
    'use strict';
    angular
            .module('app')
            .controller('templateController', [ function () {

                     var vm = this;
   
      
            
          vm.to = function(id){
               var posicion = $("#"+id).offset().top;
               $("html, body").animate({scrollTop:posicion+"px"});
            }
        
            vm.active = function(id){
                $('li').removeClass("active");
                $('#'+id).addClass("active");
           }
        
         }]);

})();