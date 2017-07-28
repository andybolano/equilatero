(function () {
    'use strict';
    angular
            .module('app')
               .controller('VerProyectoController', [function () {
               var vm = this;

               vm.proyecto = {};

              
                $("html, body").animate({scrollTop: "0px"});
                
                 vm.getProyecto = function(){
                    vm.proyecto = JSON.parse(sessionStorage.getItem('proyecto'));
                     setTimeout(function(){
                    $('#carousel').flexslider({
                     animation: "slide",
                     controlNav: false,
                     animationLoop: false,
                     slideshow: false,
                     itemWidth: 200,
                     itemMargin: 5,
                     asNavFor: '#slider'
                   });

                   $('#slider').flexslider({
                     animation: "slide",
                     controlNav: false,
                     animationLoop: false,
                     slideshow: false,
                     sync: "#carousel"
                   });
                   
                    $('.flexslider').flexslider({
                            animation: "slide"
                        });
                        
               },100);
               
                   initMap();
                    
                 }
               vm.construir_imagen = function(url, id){
                     $("#img-"+id).css({
                         "background-image":"url("+url+")",
                         "background-size": "cover",
                         "background-repeat":"no-repeat",
                     });
                 }
                 
      
        
         }]);

})();



