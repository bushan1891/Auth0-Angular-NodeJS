/**
 * Created by bushan on 6/5/16.
 */
(function(){
   'use strict';


    angular
        .module('authApp')
        .controller('profileController',profileController);


    function profileController($http){
    var vm=this;

        vm.message="hello!";


    }


})();