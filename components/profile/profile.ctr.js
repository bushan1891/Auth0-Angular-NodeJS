/**
 * Created by bushan on 6/5/16.
 */
(function(){
   'use strict';


    angular
        .module('authApp')
        .controller('profileController',profileController);


    function profileController($http,store){
    var vm=this;
// store gives access to the local storage
        vm.message;
        vm.getMessage= getMessage;
        vm.getSecretMessage=getSecretMessage;

        vm.profile=store.get('profile');


        function getMessage(){
            $http.get('http://localhost:3001/api/public',{
                skipAutherization:true
            }).then(function(response){
                vm.message=response.data.message;
            });
        }


        function getSecretMessage(){
            $http.get('http://localhost:3001/api/private').then(function(response){
                vm.message=response.data.message;
            });
        }



    }


})();